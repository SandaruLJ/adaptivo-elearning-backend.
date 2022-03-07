import {Logger} from "../loaders/logger";
import {ILearningObject} from "../interfaces/ILearningObject";
import LearningObject from "../models/LearningObject";

export class LearningObjectDao{

    private logger = Logger.getInstance();
    public static instance:LearningObjectDao = null;

    public static getInstance():LearningObjectDao{
        if(this.instance === null){
            this.instance = new LearningObjectDao();
        }
        return this.instance;
    }

    public async save(request:ILearningObject){
        this.logger.info("LearningObjectDao - save()");
        const learningObject = new LearningObject(request);
        return learningObject.save()
            .then(data=>{
                this.logger.info(`LearningObject ${data.title} Added Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting LearningObject" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("LearningObjectDao - getAll()");
        return LearningObject.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`LearningObject Retrieved Successfully`);
                }else{
                    this.logger.info(`LearningObject Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving LearningObjects" + error.message);
                throw error;
            })
    }

    public async getById(id:string){
        this.logger.info("LearningObjectDao - getById()");
        return LearningObject.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.title} LearningObject Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`LearningObject ${id} Not Found`)
                    return {msg:"LearningObject Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving LearningObject ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:string,learningObject:ILearningObject){
        this.logger.info("LearningObjectDao - update()");
        return LearningObject.findByIdAndUpdate(id,{$set:learningObject},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.title} LearningObject Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`LearningObject ${id} Not Found`);
                    return {msg:"LearningObject Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating LearningObject ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:string){
        this.logger.info("LearningObjectDao - delete()");
        return LearningObject.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.title} LearningObject Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`LearningObject ${id} Not Found`);
                    return {msg:"LearningObject Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting LearningObject ${id} ${error.message}`);
                throw error;
            })
    }

}