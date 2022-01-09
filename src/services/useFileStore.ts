import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, StorageReference, uploadBytesResumable } from 'firebase/storage';
import { defineStore } from 'pinia';
import { useToast } from 'vue-toastification';
import { FileAttachment, IUser } from '../types/InterfaceType';
import { db, storage } from './useFirebaseService';

import { formatBytes } from '../utils/helperFunction';

const toast = useToast();
interface FileStoreState {
    files: FileAttachment[]
    statusUpload: number
    fileUploadStatus: {
        fileName: string
        progress: number
    }[]
}

export const useFileStore = defineStore("useFileStore", {
    state: (): FileStoreState => ({
        files: [],
        statusUpload: 0,
        fileUploadStatus: []
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
        /**
         * @param  {IUser['userId']} userId
         * @param  {FileAttachment['name']} fileName
         */
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
        /**
         * @param  {IUser['userId']} userId
         * @param  {FileAttachment['name']} fileName
         */
        async removeFile(userId: IUser['userId'], fileName: FileAttachment['name']) {
            const desertRef = ref(storage, `attachments/${userId}/${fileName}`);

            // Delete the file
            deleteObject(desertRef).then(() => {
                const storageRef = doc(db, `tbl_attachments`, `${userId}`);
                const collectionFile = collection(storageRef, 'attachments');
                const q = query(collectionFile, where('name', '==', fileName));

                getDocs(q)
                    .then((snapshot) => {
                        if (!snapshot.empty) {
                            deleteDoc(doc(storageRef, "attachments", snapshot.docs[0].id));
                            toast.success(`File ${fileName} has been deleted!`);
                        }
                    })
            }).catch((error) => {
                console.log(error.message);
            });
        },
        /**
         * @param  {IUser["userId"]} userId
         */
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

            const data: { fileName: string, progress: number } = {
                fileName: file.name,
                progress: 0
            }
            this.fileUploadStatus.push(data);

            uploadTask.on('state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.fileUploadStatus
                        .filter(f => f.fileName == snapshot.ref.name)[0].progress = progress;
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
                        const q = query(docRef, where('name', '==', file.name));
                        getDocs(q)
                            .then(async (snapshot) => {
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

                                    await addDoc(docRef, payload);

                                } else {
                                    const data = snapshot.docs[0].data() as FileAttachment;
                                    data.lastModifiedDate = Date.now();
+
                                    updateDoc(doc(docRefParent, "attachments", snapshot.docs[0].id), data as any);
                                    toast.success(`File ${file.name} has been updated!`);
                                }
                            })

                    });
                }
            );
        }
    }
})