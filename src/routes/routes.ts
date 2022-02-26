import * as express from "express";
import CourseController from "../controllers/CourseController";
import HealthController from  "../controllers/HealthController";
import LessonController from "../controllers/LessonController";

export default function setRoutes(app:any){

    const router = express();
    const courseControl = new CourseController();
    const healthControl = new HealthController();
    const lessonControl = new LessonController();


    app.use("/api",router);
    app.use("/health",healthControl.displayHealth);

    //Routes
    
    //Course Routes
    router.route('/courses').post(courseControl.createCourse);
    router.route('/courses').get(courseControl.getAllCourses);
    router.route('/courses/:id').get(courseControl.getCourseById);
    router.route('/courses/:id').put(courseControl.updateCourse);
    router.route('/courses/:id').delete(courseControl.deleteCourse);

    router.route('/lessons').post(lessonControl.createLesson);
    router.route('/lessons').get(lessonControl.getAllLessons);
    router.route('/lessons/:id').get(lessonControl.getLessonById);
    router.route('/lessons/:id').put(lessonControl.updateLesson);
    router.route('/lessons/:id').delete(lessonControl.deleteLesson);

}