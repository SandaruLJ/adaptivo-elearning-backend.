import {ICategory} from "../../interfaces/ICategory";

export interface ICategoryService{
    createCategory(request:ICategory):Promise<ICategory>;
    getAllCategory():Promise<ICategory[]>;
    getCategoryById(id:string):Promise<ICategory | Object>;
    updateCategory(id:string,product:ICategory):Promise<ICategory | Object>;
    deleteCategory(id:string):Promise<ICategory | Object>;
}
