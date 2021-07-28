import { Gender, Religion, StatusAbsensi } from "./EnumType";

export interface AnyObject {
   [propName: string]: any;
}
export interface Info {
   cretedDate?: Date | any
   lastModifiedDate?: Date | any
}
export interface IProject extends Info {
   projectId: string
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
   statusAbsensi?: StatusAbsensi | string
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

export interface IRoleDeveloper extends Info {
   roleDeveloperId: string
   roleDeveloperName: string
   roleDeveloperDesc?: string
   roleDeveloperSalary?: string
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
   clientName: string
   clientAddress?: string
   clientKota?: string
   clientProvinsi?: string
   clientCountry?: string
}

export interface IUser extends Info {
   userId: string
   eroId?: string
   isEro?: boolean
   nationality?: string
   isActive: boolean
   email: string | null
   username?: string
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
   roleDeveloper: string
   clients: IClient[]
   userPreference?: IUserPreference
   about?: string
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