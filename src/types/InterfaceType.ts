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
   tanggalAbsensi: Date | any
   statusAbsensi: StatusAbsensi
   client: string
   jamKerjaMulai: string
   jamKerjaSelesai: string
   overTimeMulai: string
   overTimeSelesai: string
   kegiatan: string
}

export interface IAddress extends Info {
   userId: string
   jalan: string
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
   email: string
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
   address?: IAddress[]
   roleDeveloper: string
   clients: IClient[]
   userPreference?: IUserPreference
   about?: string
}

export interface IUserPreference extends Info {
   useThemeMode?: string
}