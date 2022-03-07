import {ICourse} from "../../interfaces/ICourse";

export interface ICourseService{
    createCourse(request:ICourse):Promise<ICourse>;
    getAllCourse():Promise<ICourse[]>;
    getCourseById(id:string):Promise<ICourse | Object>;
    updateCourse(id:string,product:ICourse):Promise<ICourse | Object>;
    deleteCourse(id:string):Promise<ICourse | Object>;
}