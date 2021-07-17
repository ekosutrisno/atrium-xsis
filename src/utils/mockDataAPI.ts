import { IProject, IStatistic, IUser } from "../types/InterfaceType";

export const currentUser: IUser = {
   userId: 'aeaf1efc-31e1-4255-9002-9ffac69a6073',
   eroId: 'fcf634fc-e0c0-4c34-85d4-ea13183b9d02',
   isEro: false,
   nationality: 'Indonesia',
   isActive: false,
   email: 'eko.sutrisno@xsis.co.id',
   username: '@eko_sutrisno',
   fullName: 'Eko Sutrisno',
   telephone: '082211071211',
   photoUrl: 'https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png',
   gender: 'Laki-laki',
   dob: '1996-05-20',
   pob: 'Simpang Tiga',
   hobby: 'Masak, Music',
   joinAt: '2020-11-11',
   religion: 'Islam',
   about: 'Awalnya saya suka Desain Grafis seperti desain poster, banner, standing banner, dan cover buku. Tetapi pada akhir tahun 2019 saya mulai tertarik dengan dunia IT dan dari sanalah saya mulai belajar pemprograman.',
   address: [
      {
         userId: 'aeaf1efc-31e1-4255-9002-9ffac69a6073',
         jalan: 'Jl. Pedurenan Masjid IV',
         kota: 'Jakarta Selatan',
         provinsi: 'DKI Jakarta',
         kodePos: '32173',
         desa: 'Karet Kuningan',
         country: 'Indonesia',
         kabupaten: 'Jakarta Selatan',
         kecamatan: 'Setiabudi',
      }
   ],
   roleDeveloper: 'Fullstack Developer',
   clients: [
      {
         clientId: '27b24c1b-52af-41d1-8ca4-0a84087b376e',
         clientName: 'PT Azec Management Service',
         clientAddress: 'Jl. Gedong Panjang, Bandengan',
         clientKota: 'Jakarta Barat',
         clientProvinsi: 'DKI Jakarta',
         clientCountry: 'Indonesia',
      },
      {
         clientId: 'f7e3fcb6-55ea-4efc-b620-b71d514954cd',
         clientName: 'PT Telkom Indonesia',
         clientAddress: 'Jl. Sudirman City',
         clientKota: 'Jakarta Selatan',
         clientProvinsi: 'DKI Jakarta',
         clientCountry: 'Indonesia',
      },
   ],
   userPreference: {
      useThemeMode: 'dark'
   },
   cretedDate: '2020-11-11',
   lastModifiedDate: '2021-07-17'
}

export const projects: IProject[] = [
   {
      projectId: "68ae85d0-300f-472b-aee1-fe8d5c9f7c73",
      clientName: 'Azec Indonesia Management Service',
      location: 'Gedong Panjang',
      department: 'IT Architect',
      namaUser: 'Alfa Irawan',
      projectName: 'Auth Service',
      startProject: new Date(2020, 10, 23),
      endProject: null,
      role: 'Developer',
      projectPhase: 'Development',
      projectDescription: 'Testing and Create Auth Service for Client using OAuth2 Security Flow',
      projectTechologi: ['Java', 'Spring Boot', 'PostgreSQL', 'Spring Cloud Eureka', 'Microservice'],
      mainTask: 'Create Full auth with user and client dinamic from DB'
   },
   {
      projectId: "41a4a112-b7a1-4621-8ece-e5b3d74ef171",
      clientName: 'Azec Indonesia Management Service',
      location: 'Erajaya Plaza',
      department: 'IT Architect',
      namaUser: 'Christiawan Aprilianto',
      projectName: 'Basic Promotion Service',
      startProject: new Date(2021, 1, 12),
      endProject: new Date(2021, 2, 11),
      role: 'Developer',
      projectPhase: 'Live',
      projectDescription: 'Testing and Create Auth Service for Client using OAuth2 Security Flow',
      projectTechologi: ['Microservices', 'Spring Cloud Eureka'],
      mainTask: 'Create Full auth with user and client dinamic from DB'
   },
   {
      projectId: "96e1884d-ff25-477f-af4a-e14446f0209e",
      clientName: 'Azec Indonesia Management Service',
      location: 'Erajaya Plaza',
      department: 'IT Architect',
      namaUser: 'Christiawan Aprilianto',
      projectName: 'Minio Backend Implementation',
      startProject: new Date(2021, 2, 23),
      endProject: null,
      role: 'FullStack Developer',
      projectPhase: 'Development',
      projectDescription: 'Testing and Create full file action, create, delete, etc.',
      projectTechologi: ['Java', 'Minio Bucket', 'Spring Cloud Eureka'],
      mainTask: 'Create Full Minio Backend implementation'
   },
]

export const statistic: IStatistic = {
   userId: 'aeaf1efc-31e1-4255-9002-9ffac69a6073',
   total: {
      id: 0,
      progress: 43.165,
      title: 'Total Performance',
      to: '#'
   },
   info: [
      {

         id: 1,
         progress: 49.329,
         title: 'Absensi',
         to: '#'
      },
      {
         id: 2,
         progress: 47.030,
         title: 'Placement Productivity',
         to: '#'
      },
      {
         id: 3,
         progress: 33.331,
         title: 'Timesheet Collection',
         to: '#'
      },
      {
         id: 4,
         progress: 27.778,
         title: 'Penilaian User',
         to: '#'
      },
   ]
}
