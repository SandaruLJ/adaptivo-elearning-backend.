import {Logger} from "../loaders/logger";
import {LessonService} from "../services/LessonService";
import {ILesson} from "../interfaces/ILesson";
import {ILessonService} from "../services/interfaces/ILessonService";
const autoBind = require('auto-bind');


export default class LessonController{

    private logger:Logger;
    private LessonService:ILessonService;

    constructor(){
        this.logger = Logger.getInstance();
        this.LessonService = LessonService.getInstance();
        autoBind(this);
    }

    public async createLesson(req:any,res:any){
        this.logger.info("LessonController - createLesson()");

        if(req.body){

            const Lesson:ILesson = req.body;
            await this.LessonService.createLesson(Lesson)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllLessons(req:any,res:any) {
        this.logger.info("LessonController - getAllLesson()");

        await this.LessonService.getAllLesson()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getLessonById(req:any,res:any) {
        this.logger.info("LessonController - getLessonById()");
        const id = req.params.id;
        await this.LessonService.getLessonById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateLesson(req:any,res:any) {
        this.logger.info("LessonController - updateLesson()");
        const id = req.params.id;

        if(req.body) {

            const Lesson: ILesson = req.body;

            await this.LessonService.updateLesson(id, Lesson)
                .then(data => {
                    res.status(200).send(data);
                })
                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err: error.message});
                })
        }else {
            res.status(404);
        }
    }

    public async deleteLesson(req:any,res:any) {
        this.logger.info("LessonController - deleteLesson()");
        const id = req.params.id;
        await this.LessonService.deleteLesson(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
