import { defineStore } from 'pinia';

export const useProjectStore = defineStore({
   id: 'useProjectStore',
   state: () => ({
      projects: [
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
            startProject: new Date(2021,2,23),
            endProject: null,
            role: 'FullStack Developer',
            projectPhase: 'Development',
            projectDescription: 'Testing and Create full file action, create, delete, etc.',
            projectTechologi: ['Java','Minio Bucket', 'Spring Cloud Eureka'],
            mainTask: 'Create Full Minio Backend implementation'
         },
      ]
   }),
   getters:{
      projectTotal(state){
         return state.projects.length
      }
   }
   
})