import {Logger} from "../loaders/logger";
import {LearningObjectService} from "../services/LearningObjectService";
import {ILearningObject} from "../interfaces/ILearningObject";
import {ILearningObjectService} from "../services/interfaces/ILearningObjectService";
const autoBind = require('auto-bind');


export default class LearningObjectController{

    private logger:Logger;
    private LearningObjectService:ILearningObjectService;

    constructor(){
        this.logger = Logger.getInstance();
        this.LearningObjectService = LearningObjectService.getInstance();
        autoBind(this);
    }

    public async createLearningObject(req:any,res:any){
        this.logger.info("LearningObjectController - createLearningObject()");

        if(req.body){

            const LearningObject:ILearningObject = req.body;
            await this.LearningObjectService.createLearningObject(LearningObject)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllLearningObjects(req:any,res:any) {
        this.logger.info("LearningObjectController - getAllLearningObjects()");

        await this.LearningObjectService.getAllLearningObject()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getLearningObjectById(req:any,res:any) {
        this.logger.info("LearningObjectController - getLearningObjectById()");
        const id = req.params.id;
        await this.LearningObjectService.getLearningObjectById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateLearningObject(req:any,res:any) {
        this.logger.info("LearningObjectController - updateLearningObject()");
        const id = req.params.id;

        if(req.body) {

            const LearningObject: ILearningObject = req.body;

            await this.LearningObjectService.updateLearningObject(id, LearningObject)
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

    public async deleteLearningObject(req:any,res:any) {
        this.logger.info("LearningObjectController - deleteLearningObject()");
        const id = req.params.id;
        await this.LearningObjectService.deleteLearningObject(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
