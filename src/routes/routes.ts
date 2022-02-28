import * as express from "express";
import CategoryController from "../controllers/categoryController";
import Category from "../models/Category";
import CourseController from "../controllers/CourseController";

export default function setRoutes(app:any){

    const router = express();
    const courseControl = new CourseController();
    const categoryControl = new CategoryController();


    app.use("/api",router);

    //Routes
    
    //Course Routes
    router.route('/courses').post(courseControl.createCourse);
    router.route('/courses').get(courseControl.getAllCourses);
    router.route('/courses/:id').get(courseControl.getCourseById);
    router.route('/courses/:id').put(courseControl.updateCourse);
    router.route('/courses/:id').delete(courseControl.deleteCourse);


    //Category Routes
    router.route('/categories').post(categoryControl.createCategory);
    router.route('/categories').get(categoryControl.getAllCategory);
    router.route('/categories/:id').get(categoryControl.getCategoryById);
    router.route('/categories/:id').put(categoryControl.updateCategory);
    router.route('/categories/:id').delete(categoryControl.deleteCategory);

}
