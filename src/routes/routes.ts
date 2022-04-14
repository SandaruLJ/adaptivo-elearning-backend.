import * as express from "express";
import CourseController from "../controllers/CourseController";
import UserController from "../controllers/UserController";
import HealthController from "../controllers/HealthController";
import LessonController from "../controllers/LessonController";
import ConceptController from "../controllers/ConceptController";
import LearningResourceController from "../controllers/LearningResourceController";
import LearningObjectController from "../controllers/LearningObjectController";
import CategoryController from "../controllers/CategoryController";

export default function setRoutes(app: any) {
  const router = express();
  const courseControl = new CourseController();
  const userControl = new UserController();
  const categoryControl = new CategoryController();
  const healthControl = new HealthController();
  const lessonControl = new LessonController();
  const conceptControl = new ConceptController();
  const learningResourceControl = new LearningResourceController();
  const learningObjectControl = new LearningObjectController();

  app.use("/api", router);
  app.use("/health", healthControl.displayHealth);

  //Routes

  //Course Routes
  router.route("/courses").post(courseControl.createCourse);
  router.route("/courses").get(courseControl.getAllCourses);
  router.route("/courses/:id").get(courseControl.getCourseById);
  router.route("/courses/:id").put(courseControl.updateCourse);
  router.route("/courses/:id").delete(courseControl.deleteCourse);

  // User routes
  router.route("/users").post(userControl.createUser);
  router.route("/users").get(userControl.getAllUsers);
  router.route("/users/:id").get(userControl.getUserById);
  router.route("/users/:id").put(userControl.updateUser);
  router.route("/users/:id").delete(userControl.deleteUser);

  //Lesson Routes
  router.route("/lessons").post(lessonControl.createLesson);
  router.route("/lessons").get(lessonControl.getAllLessons);
  router.route("/lessons/:id").get(lessonControl.getLessonById);
  router.route("/lessons/:id").put(lessonControl.updateLesson);
  router.route("/lessons/:id").delete(lessonControl.deleteLesson);

  //Concept Routes
  router.route("/concepts").post(conceptControl.createConcept);
  router.route("/concepts").get(conceptControl.getAllConcepts);
  router.route("/concepts/url").get(conceptControl.getSignedUrl);
  router.route("/concepts/:id").get(conceptControl.getConceptById);
  router.route("/concepts/:id").put(conceptControl.updateConcept);
  router.route("/concepts/:id").delete(conceptControl.deleteConcept);

  //Learning Resource Routes
  router.route("/learningResources").post(learningResourceControl.createLearningResource);
  router.route("/learningResources").get(learningResourceControl.getAllLearningResources);
  router.route("/learningResources/:id").get(learningResourceControl.getLearningResourceById);
  router.route("/learningResources/:id").put(learningResourceControl.updateLearningResource);
  router.route("/learningResources/:id").delete(learningResourceControl.deleteLearningResource);

  //Learning Object Routes
  router.route("/learningObjects").post(learningObjectControl.createLearningObject);
  router.route("/learningObjects").get(learningObjectControl.getAllLearningObjects);
  router.route("/learningObjects/:id").get(learningObjectControl.getLearningObjectById);
  router.route("/learningObjects/:id").put(learningObjectControl.updateLearningObject);
  router.route("/learningObjects/:id").delete(learningObjectControl.deleteLearningObject);

  //Category Routes
  router.route("/categories").post(categoryControl.createCategory);
  router.route("/categories").get(categoryControl.getAllCategory);
  router.route("/categories/:id").get(categoryControl.getCategoryById);
  router.route("/categories/:id").put(categoryControl.updateCategory);
  router.route("/categories/:id").delete(categoryControl.deleteCategory);
}
