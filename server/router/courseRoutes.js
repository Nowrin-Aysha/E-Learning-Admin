import { Router } from "express";
import * as CourseController from "../controller/courseController.js";
import Auth from "../middleware/auth.js";

const courseRouter = Router();


courseRouter.route("/addNewCourse").post(Auth, CourseController.addNewCourse);
courseRouter.route("/getAllCourses").post(Auth, CourseController.getAllCourses);
courseRouter.route("/getCourseDetailsByID/:id").post(Auth, CourseController.getCourseDetailsByID);
courseRouter.route("/updateCourseByID/:id").post(Auth, CourseController.updateCourseByID);

export default courseRouter;
