import {IQuiz} from "../interfaces/IQuiz";
import {Logger} from "../loaders/logger";
import {IQuizService} from "./interfaces/IQuizService";
import {QuizDao} from "../dao/QuizDao";

export class QuizService implements IQuizService{
    private logger = Logger.getInstance();
    public static instance:QuizService = null;
    private QuizDao = QuizDao.getInstance();
    public static getInstance():QuizService{
        if(this.instance === null){
            this.instance = new QuizService();
        }
        return this.instance;
    }

    public async createQuiz(request:IQuiz):Promise<IQuiz>{
        this.logger.info("Quiz Services - createQuiz()");

        return await this.QuizDao.save(request)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getAllQuiz():Promise<IQuiz[]>{
        this.logger.info("Quiz Services - getAllQuiz()");
        return await this.QuizDao.getAll()
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async getQuizById(id:String):Promise<IQuiz | Object>{
        this.logger.info("Quiz Services - getQuizById()");
        return await this.QuizDao.getById(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }

    public async updateQuiz(id:String,quiz:IQuiz):Promise<IQuiz | Object>{
        this.logger.info("Quiz Services - updateQuiz()");
        return await this.QuizDao.update(id,quiz)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
    public async deleteQuiz(id:String):Promise<IQuiz | Object>{
        this.logger.info("Quiz Services - deleteQuiz()");
        return await this.QuizDao.delete(id)
            .then(data=>{
                return data;
            })
            .catch(error=>{
                this.logger.error(error.message);
                throw error;
            })
    }
}