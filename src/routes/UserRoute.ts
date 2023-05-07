import express, { Request, Response, NextFunction } from "express";
import { UserSignUp, UserLogin, GetVideosByLessonId, sendEmailFunc } from "../controllers/UserController";
import { Authenticate } from "../middleware";
import { getChemistryLessons, getPhysicsLessons } from "../controllers/LessonController";
import { createOrupdateWatchTime, getWatchTimeByVideoId } from "../controllers/WatchTimeController";
import { addPayment } from "../controllers/PaymentController";

const router = express.Router();

/* ------------------- SignUp / Create Customer --------------------- */
router.post("/signup", UserSignUp);

/* ------------------- Login --------------------- */
router.post("/login", UserLogin);

/* ------------------- get chemistry lessons --------------------- */
 router.get("/chemistry-lessons", getChemistryLessons);

/* ------------------- get physics lessons --------------------- */
 router.get("/physics-lessons", getPhysicsLessons);

 /* ------------------- get vedios by lesson id --------------------- */
router.get("/get-vedios/:lessonId", GetVideosByLessonId);

/* ------------------- create or update watch time --------------------- */
router.post("/create-or-update-watch-time",createOrupdateWatchTime)

/* ------------------- get watch time by video id --------------------- */
router.get("/get-watch-time/:videoId/:userId",getWatchTimeByVideoId)

/* -----------------send email --------------------- */
router.post("/send-email", sendEmailFunc);

/* ------------------- add payment --------------------- */
 router.post("/add-payment", addPayment);

export { router as UserRoute };


