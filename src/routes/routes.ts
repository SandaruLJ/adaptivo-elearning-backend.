import * as express from "express";
import CourseController from "../controllers/CourseController";

export default function setRoutes(app:any){

    const router = express();
    const courseControl = new CourseController();


    app.use("/api",router);

    //Routes
    
    //Course Routes
    router.route('/courses').post(courseControl.createCourse);
    router.route('/courses').get(courseControl.getAllCourses);
    router.route('/courses/:id').get(courseControl.getCourseById);
    router.route('/courses/:id').put(courseControl.updateCourse);
    router.route('/courses/:id').delete(courseControl.deleteCourse);

}