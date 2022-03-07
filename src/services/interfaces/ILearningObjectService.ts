import {ILearningObject} from "../../interfaces/ILearningObject";

export interface ILearningObjectService{
    createLearningObject(request:ILearningObject):Promise<ILearningObject>;
    getAllLearningObject():Promise<ILearningObject[]>;
    getLearningObjectById(id:string):Promise<ILearningObject | Object>;
    updateLearningObject(id:string,product:ILearningObject):Promise<ILearningObject | Object>;
    deleteLearningObject(id:string):Promise<ILearningObject | Object>;
}