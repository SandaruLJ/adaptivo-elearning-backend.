import {Logger} from "../loaders/logger";
import {IQuiz} from "../interfaces/IQuiz";
import Quiz from "../models/Quiz";

export class QuizDao{

    private logger = Logger.getInstance();
    public static instance:QuizDao = null;

    public static getInstance():QuizDao{
        if(this.instance === null){
            this.instance = new QuizDao();
        }
        return this.instance;
    }

    public async save(request:IQuiz){
        this.logger.info("QuizDao - save()");
        const quiz = new Quiz(request);
        return await quiz.save()
            .then(data=>{
                this.logger.info(`Quiz ${data.id} Inserted Successfully`)
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in inserting quiz" + error.message);
                throw error;
            })
    }
    public async getAll(){
        this.logger.info("QuizDao - getAll()");
        return await Quiz.find({})
            .then(data=>{
                if(data.length>0){
                    this.logger.info(`Quizes Retrieved Successfully`);
                }else{
                    this.logger.info(`Quizes Not Found`);
                }
                return data;
            })
            .catch(error=>{
                this.logger.error("Error in retrieving quizes" + error.message);
                throw error;
            })
    }

    public async getById(id:String){
        this.logger.info("QuizDao - getById()");
        return await Quiz.findById(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.id} Quiz Retrieved Successfully`)
                    return data;
                }else{
                    this.logger.info(`Quiz ${id} Not Found`)

                }
            })
            .catch(error=>{
                this.logger.error(`Error in retrieving Quiz ${id} ${error.message}`);
                throw error;
            })
    }

    public async update(id:String,quiz:IQuiz){
        this.logger.info("QuizDao - update()");
        return await Quiz.findByIdAndUpdate(id,{$set:quiz},{new:true})
            .then(data=>{
                if(data){
                    this.logger.info(`${data.id} Quiz
                     Updated Successfully`);
                    return data;
                }else{
                    this.logger.info(`Quiz ${id} Not Found`);
                    return {msg:"Quiz Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in updating Quiz ${id} ${error.message}`);
                throw error;
            })
    }

    public async delete(id:String){
        this.logger.info("QuizDao - delete()");
        return await Quiz.findByIdAndDelete(id)
            .then(data=>{
                if(data){
                    this.logger.info(`${data.id} Quiz Deleted Successfully`);
                    return data;
                }else{
                    this.logger.info(`Quiz ${id} Not Found`);
                    return {msg:"Quiz Not Found"};
                }
            })
            .catch(error=>{
                this.logger.error(`Error in deleting Quiz ${id} ${error.message}`);
                throw error;
            })
    }
}