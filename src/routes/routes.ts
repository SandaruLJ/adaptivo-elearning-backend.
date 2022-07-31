import express from "express";
import CourseController from "../controllers/CourseController.js";
import UserController from "../controllers/UserController.js";
import HealthController from "../controllers/HealthController.js";
import InstructorController from "../controllers/InstructorController.js";
import LessonController from "../controllers/LessonController.js";
import ConceptController from "../controllers/ConceptController.js";
import LearningResourceController from "../controllers/LearningResourceController.js";
import LearningObjectController from "../controllers/LearningObjectController.js";
import CategoryController from "../controllers/CategoryController.js";
import QuizContoller from "../controllers/QuizController.js";
import validateAuth from "../middleware/auth.js";
import QandAController from "../controllers/QandAController.js";
import DrmController from "../controllers/DrmController.js";
import UserActivityController from "../controllers/UserActivityController.js";
import LearningPathController from "../controllers/learningPathController.js";
import PreferenceController from "../controllers/PreferenceController.js";
import LearningStyleController from "../controllers/LearningStyleController.js";
import UserCourseController from "../controllers/UserCourseController.js";

export default function setRoutes(app: any) {
  const router = express();
  const courseControl = new CourseController();
  const userControl = new UserController();
  const categoryControl = new CategoryController();
  const healthControl = new HealthController();
  const instructorControl = new InstructorController();
  const lessonControl = new LessonController();
  const conceptControl = new ConceptController();
  const learningResourceControl = new LearningResourceController();
  const learningObjectControl = new LearningObjectController();
  const quizControl = new QuizContoller();
  const qandaControl = new QandAController();
  const drmcontrol = new DrmController();
  const UserActivityControl = new UserActivityController();
  const learningPathControl = new LearningPathController();
  const preferenceControl = new PreferenceController();
  const learningStyleControl = new LearningStyleController();
  const userCourseControl = new UserCourseController();

  app.use("/api", router);

  //Routes

  //Course Routes
  router.route("/courses").post(courseControl.createCourse);
  router.route("/courses").get(courseControl.getAllCourses);
  router.route("/courses/url/thumbnail/:fileName").get(courseControl.getThumbnailSignedUrl);
  router.route("/courses/url/trailer/:fileName").get(courseControl.getTrailerSignedUrl);
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
  // User routes
  router.route("/users").post(validateAuth, userControl.createUser);
  router.route("/users").get(validateAuth, userControl.getAllUsers);
  router.route("/users/:id").get(userControl.getUserById);
  router.route("/users/:id").put(userControl.updateUser);
  router.route("/users/:id").delete(userControl.deleteUser);

  //Concept Routes
  router.route("/concepts").post(conceptControl.createConcept);
  router.route("/concepts").get(conceptControl.getAllConcepts);
  router.route("/concepts/url/video/:fileName").get(conceptControl.getVideoSignedUrl);
  router.route("/concepts/url/audio/:fileName").get(conceptControl.getAudioSignedUrl);

  router.route("/concepts/:id").get(conceptControl.getConceptById);
  router.route("/concepts/:id").put(conceptControl.updateConcept);
  router.route("/concepts/:id").delete(conceptControl.deleteConcept);

  //Learning Resource Routes
  router.route("/learningResources").post(learningResourceControl.createLearningResource);
  router.route("/learningResources").get(learningResourceControl.getAllLearningResources);
  router.route("/learningResources/url/video/:fileName").get(learningResourceControl.getVideoSignedUrl);
  router.route("/learningResources/url/audio/:fileName").get(learningResourceControl.getAudioSignedUrl);
  router.route("/learningResources/:id").get(learningResourceControl.getLearningResourceById);
  router.route("/learningResources/:id").put(learningResourceControl.updateLearningResource);
  router.route("/learningResources/:id").delete(learningResourceControl.deleteLearningResource);

  //Learning Object Routes
  router.route("/learningObjects").post(learningObjectControl.createLearningObject);
  router.route("/learningObjects").get(learningObjectControl.getAllLearningObjects);
  router.route("/learningObjects/:id").get(learningObjectControl.getLearningObjectById);
  router.route("/learningObjects/:id").put(learningObjectControl.updateLearningObject);
  router.route("/learningObjects/:id").delete(learningObjectControl.deleteLearningObject);

  //Quiz Routes
  router.route("/quizes").post(quizControl.createQuiz);
  router.route("/quizes").get(quizControl.getAllQuiz);
  router.route("/quizes/:id").get(quizControl.getQuizById);
  router.route("/quizes/:id").put(quizControl.updateQuiz);
  router.route("/quizes/:id").delete(quizControl.deleteQuiz);

  //QandA Routes
  router.route("/qanda").post(qandaControl.createQandA);
  router.route("/qanda").get(qandaControl.getAllQandA);
  router.route("/qanda/:id").get(qandaControl.getQandAById);
  router.route("/qanda/:id").put(qandaControl.updateQandA);
  router.route("/qanda/:id").delete(qandaControl.deleteQandA);

  //Drm Routes
  router.route("/drm").post(drmcontrol.generateLicenseToken);

  //Instructor Routes
  router.route("/instructors").post(instructorControl.createInstructor);
  router.route("/instructors").get(instructorControl.getAllInstructors);
  router.route("/instructors/:id").get(instructorControl.getInstructorById);
  router.route("/instructors/:id").put(instructorControl.updateInstructor);
  router.route("/instructors/:id").delete(instructorControl.deleteInstructor);

  //Category Routes
  router.route("/categories").post(categoryControl.createCategory);
  router.route("/categories").get(categoryControl.getAllCategory);
  router.route("/categories/:id").get(categoryControl.getCategoryById);
  router.route("/categories/:id").put(categoryControl.updateCategory);
  router.route("/categories/:id").delete(categoryControl.deleteCategory);
  //Quiz Routes
  router.route("/quizes").post(quizControl.createQuiz);
  router.route("/quizes").get(quizControl.getAllQuiz);
  router.route("/quizes/:id").get(quizControl.getQuizById);
  router.route("/quizes/:id").put(quizControl.updateQuiz);
  router.route("/quizes/:id").delete(quizControl.deleteQuiz);

  //Use Routes
  router.route("/activity").post(UserActivityControl.createUserActivity);
  router.route("/activity").get(UserActivityControl.getAllUserActivity);

  // Learning Path Routes
  router.route("/learning-path/recommendations/:user").post(learningPathControl.generateRecommendations);
  router.route("/learning-path/:user/:target").get(learningPathControl.generateLearningPath);

  //Preference Routes
  router.route("/preferences").post(preferenceControl.createPreference);
  router.route("/preferences").get(preferenceControl.getAllPreference);
  router.route("/preferences/:id").get(preferenceControl.getPreferenceById);
  router.route("/preferences/:id").put(preferenceControl.updatePreference);
  router.route("/preferences/:id").delete(preferenceControl.deletePreference);

  //Learning Style Routes
  router.route("/learningstyles").post(learningStyleControl.createLearningStyle);
  router.route("/learningstyles/onboarding").post(learningStyleControl.analyzeInitialUserPreference);
  router.route("/learningstyles").get(learningStyleControl.getAllLearningStyle);
  router.route("/learningstyles/:id").get(learningStyleControl.getLearningStyleById);
  router.route("/learningstyles/:id").put(learningStyleControl.updateLearningStyle);
  router.route("/learningstyles/:id").delete(learningStyleControl.deleteLearningStyle);

  //UserCourse Routes
  router.route("/usercourse").post(userCourseControl.createUserCourse);
  router.route("/usercourse").get(userCourseControl.getAllUserCourse);
  router.route("/usercourse/:id").get(userCourseControl.getUserCourseById);
  router.route("/usercourse/:id").put(userCourseControl.updateUserCourse);
  router.route("/usercourse/:id").delete(userCourseControl.deleteUserCourse);
}
