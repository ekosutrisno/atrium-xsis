import {
  IJobVacancy,
  IProject,
  IStatistic,
  IUser,
} from "../types/InterfaceType";

export const userMock: IUser = {
  userId: '',
  eroId: '',
  isEro: false,
  nationality: "",
  isActive: false,
  email: '',
  username: `@${''?.split('@')[0].replace('.', '_')}`,
  fullName: `${''?.split('@')[0]}`,
  telephone: "",
  photoUrl: "",
  gender: "",
  dob: "",
  pob: "",
  hobby: "",
  joinAt: Date.now(),
  religion: "",
  about: "",
  address: {
    userId: '',
    addressAsli: {
      userId: '',
      isDomisili: false,
      jalan: "",
      kota: "",
      provinsi: "",
      kodePos: "",
      desa: "",
      country: "",
      kabupaten: "",
      kecamatan: "",
      cretedDate: Date.now(),
      lastModifiedDate: Date.now(),
    },
    addressDomisili: {
      userId: '',
      isDomisili: true,
      jalan: "",
      kota: "",
      provinsi: "",
      kodePos: "",
      desa: "",
      country: "",
      kabupaten: "",
      kecamatan: "",
      cretedDate: Date.now(),
      lastModifiedDate: Date.now(),
    },
  },
  roleDeveloper: "Developer",
  clients: [],
  userPreference: {
    useThemeMode: "light",
    pushNotification: 3,
    sendToEmail: {
      candidates: true,
      offers: true,
    },
  },
  cretedDate: Date.now(),
  lastModifiedDate: Date.now(),
};

export const projectMock: IProject = {
  projectId: "new_project",
  userId: '',
  clientName: "",
  location: "",
  department: "",
  namaUser: "",
  projectName: "",
  startProject: null,
  endProject: null,
  role: "Developer",
  projectPhase: "",
  projectDescription:"Your Project Description here",
  projectTechologi: [],
  mainTask: "Your Main Task Description here",
  cretedDate: Date.now(),
  lastModifiedDate: Date.now()
}

export const statistic: IStatistic = {
  userId: '',
  total: {
    id: 0,
    progress: 0,
    title: "Total Performance",
    to: "#",
  },
  info: [
    {
      id: 1,
      progress: 0,
      title: "Absensi",
      to: "#",
    },
    {
      id: 2,
      progress: 0,
      title: "Placement Productivity",
      to: "#",
    },
    {
      id: 3,
      progress: 0,
      title: "Timesheet Collection",
      to: "#",
    },
    {
      id: 4,
      progress: 0,
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
  {
    vacancyId: "4bb356c7-6d50-48e1-9cb6-521ff7568ae4",
    vacancyCode: "ITA-XMU",
    vacancyName: "IT Architect",
    vacancyType: "MGM",
    vacancyRequirements:
      "Must possess at least a Diploma, Bachelor s Degree, Computer Science/ Information Technology, Engineering(Computer / Telecommunication) or equivalent At least 1 year(s) of working experience as Business Analyst(Finance Industry is preferred) Minimum 1 years experience in IT Project Management Experience Required skill(s): documenting user needs, flowchart, basic programming, basic database Detailed understanding of Information System, System Analysis & Programming, Data Processing Have strong analytical and problem solving skill Have good communication, interpersonal skills and high attention to detail",
    vacancyResponsibilities: "Handling Backend WEB and Create Microservice Application",
    isOpen: true,
    minSalaryOffer: 9500,
    maxSalaryOffer: 12000,
    cretedDate: '2021-08-29',
    lastModifiedDate: '2021-08-29',
    offerEndDate: '2021-09-15',
    isFullTimeJob: true,
    isRemoteJob: true
  },
];

