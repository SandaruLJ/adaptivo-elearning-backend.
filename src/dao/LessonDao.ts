import {Logger} from "../loaders/logger";
import {ILesson} from "../interfaces/ILesson";
import Lesson from "../models/Lesson";

export class LessonDao{

    private logger = Logger.getInstance();
    public static instance:LessonDao = null;

    public static getInstance():LessonDao{
        if(this.instance === null){
            this.instance = new LessonDao();
        }
        return this.instance;
    }

    public async save(request:ILesson){
        this.logger.info("LessonDao - save()");
        const lesson = new Lesson(request);
        return lesson.save()
            .then(data=>{
                this.logger.info(`Lesson ${data.title} Added Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting Lesson" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("LessonDao - getAll()");
        return Lesson.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Lesson Retrieved Successfully`);
                }else{
                    this.logger.info(`Lesson Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving Lessons" + error.message);
                throw error;
            })
    }

    public async getById(id:string){
        this.logger.info("LessonDao - getById()");
        return Lesson.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.title} Lesson Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Lesson ${id} Not Found`)
                    return {msg:"Lesson Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Lesson ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:string,lesson:ILesson){
        this.logger.info("LessonDao - update()");
        return Lesson.findByIdAndUpdate(id,{$set:Lesson},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.title} Lesson Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Lesson ${id} Not Found`);
                    return {msg:"Lesson Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Lesson ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:string){
        this.logger.info("LessonDao - delete()");
        return Lesson.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.title} Lesson Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Lesson ${id} Not Found`);
                    return {msg:"Lesson Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Lesson ${id} ${error.message}`);
                throw error;
            })
    }

}