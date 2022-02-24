import * as express from "express";
import CourseController from "../controllers/CourseController";
import UserController from '../controllers/UserController';

export default function setRoutes(app:any){

    const router = express();
    const courseControl = new CourseController();
    const userControl = new UserController();


    app.use("/api",router);

    //Routes
    
    //Course Routes
    router.route('/courses').post(courseControl.createCourse);
    router.route('/courses').get(courseControl.getAllCourses);
    router.route('/courses/:id').get(courseControl.getCourseById);
    router.route('/courses/:id').put(courseControl.updateCourse);
    router.route('/courses/:id').delete(courseControl.deleteCourse);

    // User routes
    router.route('/users').post(userControl.createUser);
    router.route('/users').get(userControl.getAllUsers);
    router.route('/users/:id').get(userControl.getUserById);
    router.route('/users/:id').put(userControl.updateUser);
    router.route('/users/:id').delete(userControl.deleteUser);
}