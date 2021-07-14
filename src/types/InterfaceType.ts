export interface IProject {
   projectId: string,
   clientName: string,
   location: string,
   department: string,
   namaUser: string,
   projectName: string,
   startProject: Date,
   endProject: Date,
   role: string,
   projectPhase: string,
   projectDescription: string,
   projectTechologi: string[],
   mainTask: string
}

export interface IStatistic {
   id: number,
   progress: number,
   title: string,
   to: string
}