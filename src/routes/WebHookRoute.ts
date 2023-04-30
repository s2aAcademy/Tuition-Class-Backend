import express, { Request, Response, NextFunction } from "express";

import { verifyHook } from "../controllers";

const router = express.Router();

/* ------------------- verify callback url --------------------- */
router.get("/", verifyHook);

export { router as WebHookRoute };
