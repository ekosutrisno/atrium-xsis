import { User } from "firebase/auth";
import { Gender, Religion, StatusAbsensi } from "./EnumType";

export interface AnyObject {
   [propName: string]: any | undefined;
}

export interface Info {
   createdDate?: Date | any
   lastModifiedDate?: Date | any
}

export interface IMainRole {
   roleId: number
   roleName: string
   roleDescription: string
   isActive: boolean
}

export interface IRoleDeveloper extends Info {
   roleDeveloperId: number
   roleDeveloperName: string
   roleDeveloperDesc?: string
   roleDeveloperSalary?: string
}

export interface IProject extends Info {
   projectId: string
   userId: string
   clientName: string
   location?: string
   department: string
   namaUser: string
   projectName: string
   startProject: Date | any
   endProject: Date | any
   role?: string
   projectPhase?: string
   projectDescription?: string
   projectTechologi?: string[] | any
   mainTask?: string
}

export interface IStatistic extends Info {
   userId: string
   year: string
   total: IStatisticInfo
   info: IStatisticInfo[]
}

export interface IStatisticInfo extends Info {
   id: number
   progress: number
   title: string
   to?: string
}

export interface ITimesheet extends Info {
   absensiId: string
   jamOTTotal?: number | string
   jamKerjaTotal?: number | string
   tanggalAsDate: Date | any
   statusAbsensi: StatusAbsensi | string
   day: number
   month: number
   year: number
   user?: string | IUser
   placement?: IClient
   jamKerjaMulai?: string
   jamKerjaSelesai?: string
   jamOTMulai?: string
   jamOTSelesai?: string
   kegiatan: string
   isDone: boolean
   template?: boolean
   __v?: number
   edited: boolean
   isWeekend: boolean
}

export interface IStatisticAbsentMeta extends Info {
   month: number | string
   monthName?: string
   year: string
   jumlahHariMasuk: number
   jumlahHariCuti: number
   jumlahHariLibur: number
   performance: number
}

export interface IStatisticPlacementMeta extends Info {
   month: number | string
   monthName?: string
   year: string
   jumlahHariMasuk: number
   jumlahHariCuti: number
   jumlahHariLibur: number
   performance: number
}

export interface IStatisticTImesheetCollectionMeta extends Info {
   month: number | string
   monthName?: string
   year: string
   collectionDate: string | number
   performance: number
}

export interface IStatisticPenilaianUserMeta extends Info {
   month: number | string
   monthName?: string
   year: string
   ski: number
   kompetensiPendukung: number
   kedisiplinan: number
   performance: number
}

export interface IStatisticTotalMeta extends Info {
   month: number | string
   monthName?: string
   year: string
   absensi: number
   placementProductivity: number
   timesheetCollection: number
   penilaianUser: number
   performance: number
}

export interface ITimesheetCollectionMeta extends Info {
   userId: IUser['userId']
}

export interface IAddress extends Info {
   userId: string
   addressId?: string
   jalan: string
   isDomisili: boolean
   kota?: string
   provinsi?: string
   kodePos?: string
   desa?: string
   country?: string
   kabupaten?: string
   kecamatan?: string
}

export interface IOrtu extends Info {
   namaAyah?: string
   dobAyah?: Date | any
   pobAyah?: string
   pekerjaanAyah: string
   namaIbu?: string
   dobIbu?: Date | any
   pobIbu?: string
   pekerjaanIbu: string

}

export interface IClient extends Info {
   clientId: string
   name: string
   email: string
   telephone?: string
   address?: string
   kota?: string
   provinsi?: string
   country?: string
   postalCode?: string
   image?: string
   description?: string
   website?: string
}

export interface IUser extends Info {
   userId: string
   eroId?: string
   isEro?: boolean
   nationality?: string
   isActive: boolean
   email: string
   username: string
   fullName?: string
   telephone?: string
   photoUrl?: string
   gender?: Gender | string
   dob?: Date | any
   pob?: string
   hobby?: string
   joinAt: Date | any
   religion?: Religion | string
   address: UserAddress
   roleDeveloper: IRoleDeveloper
   mainRole: IMainRole
   client: null | IClient
   userPreference: IUserPreference
   about?: string
}

export interface ICurrentEro extends Info {
   eroId: string
   fullName: string
   email: string
   telephone?: string
   asEroAt?: string | any
   eroImageAvatar?: string | any
}

export interface IJobVacancy extends Info {
   vacancyId: string
   vacancyName: string
   vacancyCode: string
   vacancyType: string
   vacancyResponsibilities?: string
   vacancyRequirements?: string
   isOpen: boolean
   isRemoteJob: boolean
   isFullTimeJob: boolean
   minSalaryOffer?: string | number
   maxSalaryOffer?: string | number
   offerEndDate?: string | any
}

export interface IUserPreference extends Info {
   useThemeMode?: string
   pushNotification?: number
   sendToEmail: {
      candidates: boolean
      offers: boolean
   }
}

export type UserAddress = {
   userId: string
   addressAsli: IAddress
   addressDomisili: IAddress
} & Info


export interface FileAttachment extends Info{
   userId: string
   name: string
   size: number
   sizeText: string
   url: string
   uploadedAt: number
   type: string
}

export interface Notification extends Info {
   type: string
   text: string
   timestamp: number
   data: null | any
}