import { Router } from "express";
import * as controller from "../controller/controller.js";
import Auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router = Router();


router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/addMentor").post(upload.single("photo"),controller.addMentor);
router.route("/getMentors").get(Auth,controller.getMentors);
router.route("/addAdmin").post(Auth,controller.addAdmin);
router.route("/getAdmins").get(Auth,controller.getAdmins);
export default router;
