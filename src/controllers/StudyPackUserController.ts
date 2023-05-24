import { plainToClass } from "class-transformer";
import { WatchTime } from "../models/WatchTime";
import { Request, Response, NextFunction } from "express";
import { CreateWatchTimeInput } from "../dto/WatchTime.dto";
import {
  CreateStudPackUserInput,
  LoginStudPackUserInput,
} from "../dto/StudyPackUser.dto";
import { StudyPackUser } from "../models/StudyPackUser";

export const registerStudypackUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studypackInputs = plainToClass(CreateStudPackUserInput, req.body);
    const { email, password } = studypackInputs;
    const studypackUserObj = await StudyPackUser.findOne({
      email: email,
    });
    if (studypackUserObj) {
      return res.status(400).json({ msg: "User already exists" });
    } else {
      const studypackUserObj = new StudyPackUser({
        email,
        password,
      });
      const result = await studypackUserObj.save();
      return res.status(201).json(result);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

export const LoginStudypackUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const studypackInputs = plainToClass(LoginStudPackUserInput, req.body);
    const { email, password } = studypackInputs;
    const studypackUserObj = await StudyPackUser.findOne({
      email: email,
      password: password,
    });
    if (studypackUserObj) {
      return res.status(400).json(studypackUserObj);
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
