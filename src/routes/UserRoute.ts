import express, { Request, Response, NextFunction } from "express";
import { UserSignUp, UserLogin } from "../controllers/UserController";
import { Authenticate } from "../middleware";

const router = express.Router();

/* ------------------- SignUp / Create Customer --------------------- */
router.post("/signup", UserSignUp);

/* ------------------- Login --------------------- */
router.post("/login", UserLogin);

export { router as UserRoute };
