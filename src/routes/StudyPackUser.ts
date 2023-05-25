import express from "express";
import {
  LoginStudypackUser,
  getStudyPacks,
  registerStudypackUser,
} from "../controllers/StudyPackUserController";

const router = express.Router();

/* ------------------- SignUp / Create Customer --------------------- */
router.post("/signup", registerStudypackUser);

/* ------------------- Login --------------------- */
router.post("/login", LoginStudypackUser);

/* ------------------- get study Packs --------------------- */
router.get("/get-study-packs", getStudyPacks);

export { router as StudyPackUserRoute };
