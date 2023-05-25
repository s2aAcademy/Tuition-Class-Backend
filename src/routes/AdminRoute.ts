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
  DeleteVideo,
  Counter,
  ResetCounter,
  AddPdf,
  GetAllPdf,
  GetPdfById,
  DeletePdf,
  AddPaper,
  AddStudypack,
} from "../controllers";
import { Authenticate } from "../middleware";
import {
  DeleteLesson,
  createLesson,
  getAllLessons,
} from "../controllers/LessonController";

const router = express.Router();

/*-------------------- Get Counter  ----*/

router.get("/counter", Counter);

/*-------------------- Get Video by Id ----*/

router.get("/reset-counter", ResetCounter);

/* ------------------- Login --------------------- */
router.post("/login", AdminLogin);

/*-------------------- Add Paper  ----*/
router.post("/add-paper", AddPaper);

/*-------------------- Add Paper  ----*/
router.post("/add-studypack", AddStudypack);

/*-------------------- Add Pdf ----*/

router.post("/add-pdf", AddPdf);

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

router.get("/get-videos", GetVideos);

/*-------------------- Get  Video by title----*/

router.get("/get-video/:title", GetVideoByTitle);

/*-------------------- Get Video by Id ----*/

router.get("/get-video/:id", GetVideoById);

/*-------------------- Delete Video by Id ----*/

router.delete("/delete-video/:id", DeleteVideo);

/*-------------------- create lesson ----*/
router.post("/create-lesson", createLesson);

/*-------------------- create lesson ----*/
router.get("/get-lessons", getAllLessons);

/*-------------------- Delete Lesson by Id ----*/

router.delete("/delete-lesson/:id", DeleteLesson);



/*-------------------- Get All Pdf ----*/

router.get("/get-all-pdf", GetAllPdf);

/*-------------------- Get Pdf by Id ----*/

router.get("/get-pdf/:id", GetPdfById);

/*-------------------- Delete Pdf by Id ----*/

router.delete("/delete-Pdf/:id", DeletePdf);



export { router as AdminRoute };
