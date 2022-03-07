import {ICourse} from "../interfaces/ICourse";
import {Logger} from "../loaders/logger";
import {ICourseService} from "./interfaces/ICourseService";
import {CourseDao} from "../dao/CourseDao";

export class CourseService implements ICourseService{
    private logger = Logger.getInstance();
    public static instance:CourseService = null;
    private CourseDao = CourseDao.getInstance();
    public static getInstance():CourseService{
        if(this.instance === null){
            this.instance = new CourseService();
        }
        return this.instance;
    }

    public async createCourse(request:ICourse):Promise<ICourse>{
        this.logger.info("CourseService - createCourse()");

        return  this.CourseDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllCourse():Promise<ICourse[]>{
        this.logger.info("CourseService - getAllCourse()");
        return  this.CourseDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getCourseById(id:string):Promise<ICourse | Object>{
        this.logger.info("CourseService - getCourseById()");
        return  this.CourseDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }



    public async updateCourse(id:string,Course:ICourse):Promise<ICourse | Object>{
        this.logger.info("CourseService - updateCourse()");
        return  this.CourseDao.update(id,Course)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteCourse(id:string):Promise<ICourse | Object>{
        this.logger.info("CourseService - deleteCourse()");
        return  this.CourseDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}