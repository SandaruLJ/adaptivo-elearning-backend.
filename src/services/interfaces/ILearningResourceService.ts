import {ILearningResource} from "../../interfaces/ILearningResource";

export interface ILearningResourceService{
    createLearningResource(request:ILearningResource):Promise<ILearningResource>;
    getAllLearningResource():Promise<ILearningResource[]>;
    getLearningResourceById(id:string):Promise<ILearningResource | Object>;
    updateLearningResource(id:string,product:ILearningResource):Promise<ILearningResource | Object>;
    deleteLearningResource(id:string):Promise<ILearningResource | Object>;
}