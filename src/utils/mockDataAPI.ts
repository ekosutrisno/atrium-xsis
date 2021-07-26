import {
  IJobVacancy,
  IProject,
  IStatistic,
  ITimesheet,
  IUser,
} from "../types/InterfaceType";

export const currentUser: IUser = {
  userId: "aeaf1efc-31e1-4255-9002-9ffac69a6073",
  eroId: "fcf634fc-e0c0-4c34-85d4-ea13183b9d02",
  isEro: false,
  nationality: "Indonesia",
  isActive: false,
  email: "eko.sutrisno@xsis.co.id",
  username: "@eko_sutrisno",
  fullName: "Eko Sutrisno",
  telephone: "082211071211",
  photoUrl:
    "https://res.cloudinary.com/ekosutrisno/image/upload/v1625803063/avatars/MyAvatar_taylrm.png",
  gender: "Laki-laki",
  dob: "1996-05-20",
  pob: "Simpang Tiga",
  hobby: "Masak, Music",
  joinAt: "2020-11-11",
  religion: "Islam",
  about:
    "Awalnya saya suka Desain Grafis seperti desain poster, banner, standing banner, dan cover buku. Tetapi pada akhir tahun 2019 saya mulai tertarik dengan dunia IT dan dari sanalah saya mulai belajar pemprograman.",
  address: {
    userId: "aeaf1efc-31e1-4255-9002-9ffac69a6073",
    addressAsli: {
      addressId: "d7b79b48-e776-47e3-84f4-45b1548f3829",
      userId: "aeaf1efc-31e1-4255-9002-9ffac69a6073",
      isDomisili: false,
      jalan: "Jl. Pedurenan Masjid IV",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kodePos: "32173",
      desa: "Karet Kuningan",
      country: "Indonesia",
      kabupaten: "Jakarta Selatan",
      kecamatan: "Setiabudi",
      cretedDate: "2020-12-11",
      lastModifiedDate: "2021-07-12",
    },
    addressDomisili: {
      addressId: "7cab0a93-16bd-45fc-b939-41348542b470",
      userId: "aeaf1efc-31e1-4255-9002-9ffac69a6073",
      isDomisili: true,
      jalan: "Jl. Pedurenan Masjid IV",
      kota: "Jakarta Selatan",
      provinsi: "DKI Jakarta",
      kodePos: "32173",
      desa: "Karet Kuningan",
      country: "Indonesia",
      kabupaten: "Jakarta Selatan",
      kecamatan: "Setiabudi",
      cretedDate: "2020-12-11",
      lastModifiedDate: "2021-07-12",
    },
  },
  roleDeveloper: "Fullstack Developer",
  clients: [
    {
      clientId: "27b24c1b-52af-41d1-8ca4-0a84087b376e",
      clientName: "PT Azec Management Service",
      clientAddress: "Jl. Gedong Panjang, Bandengan",
      clientKota: "Jakarta Barat",
      clientProvinsi: "DKI Jakarta",
      clientCountry: "Indonesia",
    },
    {
      clientId: "f7e3fcb6-55ea-4efc-b620-b71d514954cd",
      clientName: "PT Telkom Indonesia",
      clientAddress: "Jl. Sudirman City",
      clientKota: "Jakarta Selatan",
      clientProvinsi: "DKI Jakarta",
      clientCountry: "Indonesia",
    },
  ],
  userPreference: {
    useThemeMode: "dark",
    pushNotification: 3,
    sendToEmail: {
      candidates: true,
      offers: true,
    },
  },
  cretedDate: "2020-11-11",
  lastModifiedDate: "2021-07-17",
};

export const projects: IProject[] = [
  {
    projectId: "68ae85d0-300f-472b-aee1-fe8d5c9f7c73",
    clientName: "Azec Indonesia Management Service",
    location: "Gedong Panjang",
    department: "IT Architect",
    namaUser: "Alfa Irawan",
    projectName: "Auth Service",
    startProject: '2021-04-11',
    endProject: null,
    role: "Developer",
    projectPhase: "Development",
    projectDescription:
      "Testing and Create Auth Service for Client using OAuth2 Security Flow",
    projectTechologi: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "Spring Cloud Eureka",
      "Microservice",
    ],
    mainTask: "Create Full auth with user and client dinamic from DB",
    cretedDate: '2021-06-12',
    lastModifiedDate: '2021-07-10'
  },
  {
    projectId: "41a4a112-b7a1-4621-8ece-e5b3d74ef171",
    clientName: "Azec Indonesia Management Service",
    location: "Erajaya Plaza",
    department: "IT Architect",
    namaUser: "Christiawan Aprilianto",
    projectName: "Basic Promotion Service",
    startProject: '2021-01-12',
    endProject: '2021-02-11',
    role: "Developer",
    projectPhase: "Live",
    projectDescription:
      "Testing and Create Auth Service for Client using OAuth2 Security Flow",
    projectTechologi: ["Microservices", "Spring Cloud Eureka"],
    mainTask: "Create Full auth with user and client dinamic from DB",
    cretedDate: '2021-01-12',
    lastModifiedDate: '2021-06-10'
  },
  {
    projectId: "96e1884d-ff25-477f-af4a-e14446f0209e",
    clientName: "Azec Indonesia Management Service",
    location: "Erajaya Plaza",
    department: "IT Architect",
    namaUser: "Christiawan Aprilianto",
    projectName: "Minio Backend Implementation",
    startProject: '2021-02-23',
    endProject: null,
    role: "FullStack Developer",
    projectPhase: "Development",
    projectDescription:
      "Testing and Create full file action, create, delete, etc.",
    projectTechologi: ["Java", "Minio Bucket", "Spring Cloud Eureka"],
    mainTask: "Create Full Minio Backend implementation",
    cretedDate: '2020-01-12',
    lastModifiedDate: '2021-06-10'
  },
];

export const statistic: IStatistic = {
  userId: "aeaf1efc-31e1-4255-9002-9ffac69a6073",
  total: {
    id: 0,
    progress: 55.165,
    title: "Total Performance",
    to: "#",
  },
  info: [
    {
      id: 1,
      progress: 49.329,
      title: "Absensi",
      to: "#",
    },
    {
      id: 2,
      progress: 47.03,
      title: "Placement Productivity",
      to: "#",
    },
    {
      id: 3,
      progress: 33.331,
      title: "Timesheet Collection",
      to: "#",
    },
    {
      id: 4,
      progress: 27.778,
      title: "Penilaian User",
      to: "#",
    },
  ],
};

export const vacancies: IJobVacancy[] = [
  {
    vacancyId: "8758206e-6444-4a50-b7ab-eeb2f0218f31",
    vacancyCode: "BA-XMU",
    vacancyName: "Business Analyst",
    vacancyType: "MGM",
    vacancyRequirements:
      "Must possess at least a Diploma, Bachelor s Degree, Computer Science/ Information Technology, Engineering(Computer / Telecommunication) or equivalent At least 1 year(s) of working experience as Business Analyst(Finance Industry is preferred) Minimum 1 years experience in IT Project Management Experience Required skill(s): documenting user needs, flowchart, basic programming, basic database Detailed understanding of Information System, System Analysis & Programming, Data Processing Have strong analytical and problem solving skill Have good communication, interpersonal skills and high attention to detail",
    vacancyResponsibilities: "Handling Backend WEB",
    isOpen: true,
    minSalaryOffer: 4500,
    maxSalaryOffer: 7000,
    cretedDate: '2021-04-11',
    lastModifiedDate: '2021-06-25',
    offerEndDate: '2021-08-30',
    isFullTimeJob: true,
    isRemoteJob: false
  },
  {
    vacancyId: "ce2d1682-ddf5-457b-90b3-ef456fc6cc39",
    vacancyCode: "JSE-XMU",
    vacancyName: "Java Software Enginer",
    vacancyType: "MGM",
    vacancyRequirements:
      "Must possess at least a Diploma, Bachelor s Degree, Computer Science/ Information Technology, Engineering(Computer / Telecommunication) or equivalent At least 1 year(s) of working experience as Business Analyst(Finance Industry is preferred) Minimum 1 years experience in IT Project Management Experience Required skill(s): documenting user needs, flowchart, basic programming, basic database Detailed understanding of Information System, System Analysis & Programming, Data Processing Have strong analytical and problem solving skill Have good communication, interpersonal skills and high attention to detail",
    vacancyResponsibilities: "Handling Backend WEB and Create Microservice Application",
    isOpen: true,
    minSalaryOffer: 7000,
    maxSalaryOffer: 9500,
    cretedDate: '2021-07-11',
    lastModifiedDate: '2021-07-25',
    offerEndDate: '2021-07-30',
    isFullTimeJob: true,
    isRemoteJob: true
  },
];

export const timehseets: ITimesheet[] = [
  {
    absensiId: "60dd35ca919525101736daf1",
    jamOTTotal: "",
    jamKerjaTotal: "8:0",
    tanggalAsDate: "2021-06-30T17:00:00.000Z",
    day: 1,
    month: 6,
    year: 2021,
    user: "5f17c5de47d7b3c011fa5991",
    kegiatan:
      "[Article Master Service] #0.1.30 #fix: Merge from UAT, Research and Improve performance, and enable filter by articleCode, articleDescription and eanCode in one field (Finish) @bff54ca3",
    statusAbsensi: "Masuk",
    __v: 0,
    jamKerjaMulai: "08:00",
    jamKerjaSelesai: "17:00",
    jamOTMulai: "",
    jamOTSelesai: "",
    placement: {
      clientId: "27b24c1b-52af-41d1-8ca4-0a84087b376e",
      clientName: "PT Azec Management Service",
      clientAddress: "Jl. Gedong Panjang, Bandengan",
      clientKota: "Jakarta Barat",
      clientProvinsi: "DKI Jakarta",
      clientCountry: "Indonesia",
    },
    template: true,
    isDone: false,
    lastModifiedDate: '2021-07-24 12:11:00'
  },
  {
    absensiId: "60dd35ca919525101736daf2",
    jamOTTotal: "",
    jamKerjaTotal: "8:0",
    tanggalAsDate: "2021-07-01T17:00:00.000Z",
    day: 2,
    month: 6,
    year: 2021,
    user: "5f17c5de47d7b3c011fa5991",
    kegiatan:
      "[Article Master Service] #0.1.31 #rollback: Rollback and Cancel Merge code from SIT Env @2ed67c16 and [Customer Service] #add Model, repo, and new Response",
    statusAbsensi: "Masuk",
    __v: 0,
    jamKerjaMulai: "08:00",
    jamKerjaSelesai: "17:00",
    jamOTMulai: "",
    jamOTSelesai: "",
    placement: {
      clientId: "27b24c1b-52af-41d1-8ca4-0a84087b376e",
      clientName: "PT Azec Management Service",
      clientAddress: "Jl. Gedong Panjang, Bandengan",
      clientKota: "Jakarta Barat",
      clientProvinsi: "DKI Jakarta",
      clientCountry: "Indonesia",
    },
    template: true,
    isDone: false,
    lastModifiedDate: '2021-07-22 10:11:00'
  }
];
