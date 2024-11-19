import { Router } from "express";
import * as controller from "../controller/controller.js";
import Auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";
const router = Router();


router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/addMentor").post(upload.single("photo"),controller.addMentor);
router.route("/getMentors").get(Auth,controller.getMentors);
router.route("/deleteMentor/:id").post(Auth,controller.deleteMentor); 
router.route("/updateMentor/:id").post(Auth,upload.single("photo"),controller.updateMentor); 
router.route("/addAdmin").post(upload.single("photo"),controller.addAdmin);
router.route("/getAdmins").get(Auth,controller.getAdmins);
router.route("/deleteAdmin/:id").post(Auth,controller.deleteAdmin); 
router.route("/updateAdmin/:id").post(Auth,upload.single("photo"),controller.updateAdmin); 
export default router;
