import express from "express";
import {
  LoginStudypackUser,
  registerStudypackUser,
} from "../controllers/StudyPackUserController";

const router = express.Router();

/* ------------------- SignUp / Create Customer --------------------- */
router.post("/signup", registerStudypackUser);

/* ------------------- Login --------------------- */
router.post("/login", LoginStudypackUser);

export { router as StudyPackUserRoute };
