import {Logger} from "../loaders/logger";
import {LearningResourceService} from "../services/LearningResourceService";
import {ILearningResource} from "../interfaces/ILearningResource";
import {ILearningResourceService} from "../services/interfaces/ILearningResourceService";
const autoBind = require('auto-bind');


export default class LearningResourceController{

    private logger:Logger;
    private LearningResourceService:ILearningResourceService;

    constructor(){
        this.logger = Logger.getInstance();
        this.LearningResourceService = LearningResourceService.getInstance();
        autoBind(this);
    }

    public async createLearningResource(req:any,res:any){
        this.logger.info("LearningResourceController - createLearningResource()");

        if(req.body){

            const LearningResource:ILearningResource = JSON.parse(req.body.data);
            await this.LearningResourceService.createLearningResource(LearningResource)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllLearningResources(req:any,res:any) {
        this.logger.info("LearningResourceController - getAllLearningResources()");

        await this.LearningResourceService.getAllLearningResource()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getLearningResourceById(req:any,res:any) {
        this.logger.info("LearningResourceController - getLearningResourceById()");
        const id = req.params.id;
        await this.LearningResourceService.getLearningResourceById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateLearningResource(req:any,res:any) {
        this.logger.info("LearningResourceController - updateLearningResource()");
        const id = req.params.id;

        if(req.body) {

            const LearningResource: ILearningResource = JSON.parse(req.body.data);

            await this.LearningResourceService.updateLearningResource(id, LearningResource)
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

    public async deleteLearningResource(req:any,res:any) {
        this.logger.info("LearningResourceController - deleteLearningResource()");
        const id = req.params.id;
        await this.LearningResourceService.deleteLearningResource(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
