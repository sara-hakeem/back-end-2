import { UserModel } from "./UserModel";


export interface UserFileModel{
    
        id: string,
        fileName: string,
        filePath:string ,
        user: UserModel,
        date: string,
        status: string
     
}