import {ICategory} from "../interfaces/ICategory";
import {Logger} from "../loaders/logger";
import {ICategoryService} from "./interfaces/ICategoryService";
import {CategoryDao} from "../dao/CategoryDao";

export class CategoryService implements ICategoryService{
    private logger = Logger.getInstance();
    public static instance:CategoryService = null;
    private CategoryDao = CategoryDao.getInstance();
    public static getInstance():CategoryService{
        if(this.instance === null){
            this.instance = new CategoryService();
        }
        return this.instance;
    }

    public async createCategory(request:ICategory):Promise<ICategory>{
        this.logger.info("CategoryService - createCategory()");

        return  this.CategoryDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllCategory():Promise<ICategory[]>{
        this.logger.info("CategoryService - getAllCategory()");
        return  this.CategoryDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getCategoryById(id:string):Promise<ICategory | Object>{
        this.logger.info("CategoryService - getCategoryById()");
        return  this.CategoryDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }



    public async updateCategory(id:string,Course:ICategory):Promise<ICategory | Object>{
        this.logger.info("Customer Services - updateCustomer()");
        return  this.CategoryDao.update(id,Course)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteCategory(id:string):Promise<ICategory | Object>{
        this.logger.info("CategoryService - deleteCategory()");
        return  this.CategoryDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}
