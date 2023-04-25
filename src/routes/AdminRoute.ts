import express from "express";
import {
  AdminLogin,
  GetStudentProfile,
  GetStudentProfiles,
  ApproveStudent,
  CheckSlip,
  DeleteUser,
  AddVideo,
  GetVideos,
  GetVideoByTitle,
  GetVideoById,
} from "../controllers";
import { Authenticate } from "../middleware";

const router = express.Router();

/* ------------------- Login --------------------- */
router.post("/login", AdminLogin);

/* ------------------- Authentication --------------------- */
router.use(Authenticate);

/*-------------------- Get All Student details ----*/

router.get("/students", GetStudentProfiles);

/*-------------------- Get  Student details ----*/

router.get("/student/:id", GetStudentProfile);

/*-------------------- Approve slip ----*/

router.put("/approve", ApproveStudent);

/*-------------------- check slip ----*/

router.put("/check", CheckSlip);

/*-------------------- Delete slip ----*/

router.delete("/delete-slip/:id", DeleteUser);

/*-------------------- Add Video ----*/

router.post("/add-video", AddVideo);

/*-------------------- Get All Videos ----*/

router.post("/get-videos", GetVideos);

/*-------------------- Get  Video by title----*/

router.post("/get-video/:title", GetVideoByTitle);

/*-------------------- Get Video by Id ----*/

router.post("/get-video/:id", GetVideoById);

export { router as AdminRoute };
