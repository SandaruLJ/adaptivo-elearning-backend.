import {ILesson} from "../../interfaces/ILesson";

export interface ILessonService{
    createLesson(request:ILesson):Promise<ILesson>;
    getAllLesson():Promise<ILesson[]>;
    getLessonById(id:string):Promise<ILesson | Object>;
    updateLesson(id:string,product:ILesson):Promise<ILesson | Object>;
    deleteLesson(id:string):Promise<ILesson | Object>;
}