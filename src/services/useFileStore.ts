import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { getDownloadURL, ref, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { FileAttachment, IUser } from '../types/InterfaceType';
import { db, storage } from './useFirebaseService';

import { formatBytes } from '../utils/helperFunction';

const toast = useToast();
interface FileStoreState {
    files: FileAttachment[],
    statusUpload: number
}

export const useFileStore = defineStore("useFileStore", {
    state: (): FileStoreState => ({
        files: [],
        statusUpload: 0
    }),
    actions: {
        /**
         * @param  {FileList} files
         * @param  {IUser['userId']} userId
         */
        async uploadFile(files: FileList, userId: IUser['userId']) {
            if (files.length) {
                const docRefParent = doc(db, "tbl_attachments", `${userId}`);

                const checkIfExist = await getDoc(docRefParent);
                if (!checkIfExist.exists())
                    await setDoc(docRefParent, { userId: userId })

                for (let idx = 0; idx < files.length; idx++) {
                    const file: File = files.item(idx) as File;

                    const storageRef = ref(storage, `attachments/${userId}/${file.name}`);
                    await this.onUpload(storageRef, file, userId);
                }

            }
        },

        async downloadFile(userId: IUser['userId'], fileName: FileAttachment['name']) {
            const storageRef = ref(storage, `attachments/${userId}/${fileName}`);

            getDownloadURL(storageRef)
                .then(url => {
                    var xhr = new XMLHttpRequest();
                    xhr.responseType = 'blob';
                    xhr.onload = () => {
                        var blob = xhr.response;
                        var fileURL = window.URL.createObjectURL(new Blob([blob]));
                        var fileLink = document.createElement("a");

                        fileLink.href = fileURL;
                        fileLink.setAttribute("download", fileName);
                        document.body.appendChild(fileLink);

                        fileLink.click();
                    };
                    xhr.open('GET', url);
                    xhr.send();
                })
        },

        removeFile() { },

        async getFile(userId: IUser["userId"]) {
            const storageRef = doc(db, `tbl_attachments`, `${userId}`);
            const collectionFile = collection(storageRef, 'attachments');

            onSnapshot(collectionFile, (snapshot) => {
                const fileTemp: FileAttachment[] = [];
                snapshot.forEach(file => {
                    fileTemp.push(file.data() as FileAttachment)
                })

                this.files = fileTemp;
            });
        },

        /**
         * @param  {StorageReference} storageRef
         * @param  {File} file
         * @param  {IUser["userId"]} userId
         */
        async onUpload(storageRef: StorageReference, file: File, userId: IUser["userId"]) {
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.statusUpload = progress;
                },
                (error) => {
                    switch (error.code) {
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect error.serverResponse
                            break;
                    }
                },
                () => {
                    // Upload completed successfully, now we can get the download URL

                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        const docRefParent = doc(db, "tbl_attachments", `${userId}`);

                        // Add into collection child
                        const docRef = collection(docRefParent, "attachments");

                        // Query to check if data already exist with the same name
                        const q = query(docRef, where('userId', '==', userId), where('name', '==', file.name));
                        getDocs(q)
                            .then((snapshot) => {
                                if (snapshot.empty) {
                                    const payload: FileAttachment = {
                                        name: file.name,
                                        size: file.size,
                                        sizeText: formatBytes(file.size),
                                        userId: userId,
                                        uploadedAt: Date.now(),
                                        createdDate: Date.now(),
                                        lastModifiedDate: Date.now(),
                                        url: downloadURL,
                                        type: file.type
                                    };

                                    addDoc(docRef, payload).then(() => {
                                        toast.info(`Your attachment has been uploaded.`);
                                    });
                                } else {
                                    const data = snapshot.docs[0].data() as FileAttachment;
                                    data.lastModifiedDate = Date.now();
                                    
                                    // TODO update the lastModifiedDate
                                    console.log(data);
                                }
                            })

                    });
                }
            );
        }
    }
})