import * as express from "express";
import CourseController from "../controllers/CourseController";
import HealthController from  "../controllers/HealthController";
export default function setRoutes(app:any){

    const router = express();
    const courseControl = new CourseController();
    const healthControl = new HealthController();


    app.use("/api",router);
    app.use("/health",healthControl.displayHealth);

    //Routes
    
    //Course Routes
    router.route('/courses').post(courseControl.createCourse);
    router.route('/courses').get(courseControl.getAllCourses);
    router.route('/courses/:id').get(courseControl.getCourseById);
    router.route('/courses/:id').put(courseControl.updateCourse);
    router.route('/courses/:id').delete(courseControl.deleteCourse);

}