import {Logger} from "../loaders/logger";
import {CourseService} from "../services/CourseService";
import {ICourse} from "../interfaces/ICourse";
import {ICourseService} from "../services/interfaces/ICourseService";
const autoBind = require('auto-bind');


export default class CourseController{

    private logger:Logger;
    private CourseService:ICourseService;

    constructor(){
        this.logger = Logger.getInstance();
        this.CourseService = CourseService.getInstance();
        autoBind(this);
    }

    public async createCourse(req:any,res:any){
        this.logger.info("CourseController - createCourse()");

        if(req.body){

            const Course:ICourse = JSON.parse(req.body.data);
            await this.CourseService.createCourse(Course)
                .then(data => {
                    res.status(200).send(data);
                })

                .catch(error => {
                    this.logger.error(error.message);
                    res.status(500).send({err:error.message});
                })
        }
    }
    public async getAllCourses(req:any,res:any) {
        this.logger.info("CourseController - getAllCourse()");

        await this.CourseService.getAllCourse()
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
    public async getCourseById(req:any,res:any) {
        this.logger.info("CourseController - getCourseById()");
        const id = req.params.id;
        await this.CourseService.getCourseById(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }

    public async updateCourse(req:any,res:any) {
        this.logger.info("CourseController - updateCourse()");
        const id = req.params.id;

        if(req.body) {

            const Course: ICourse = JSON.parse(req.body.data);

            await this.CourseService.updateCourse(id, Course)
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

    public async deleteCourse(req:any,res:any) {
        this.logger.info("CourseController - deleteCourse()");
        const id = req.params.id;
        await this.CourseService.deleteCourse(id)
            .then(data => {
                res.status(200).send(data);
            })
            .catch(error => {
                this.logger.error(error.message);
                res.status(500).send({err: error.message});
            })
    }
}
