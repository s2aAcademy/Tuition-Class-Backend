import { plainToClass } from "class-transformer";
import { CreateLessonInput, SubjectEnum } from "../dto";
import { Request, Response, NextFunction } from "express";
import { Lesson } from "../models/Lesson";

export const createLesson = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lessonInputs = plainToClass(CreateLessonInput, req.body);

  const { lessonDescription, lessonName, subject } = lessonInputs;

  const lesson = new Lesson({
    lessonDescription,
    lessonName,
    subject,
  });

  const result = await lesson.save();

  return res.status(201).json(result);
};

export const getChemistryLessons = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lessons = await Lesson.find({ subject: SubjectEnum.CHEMISTRY });
  return res.status(200).json(lessons);
};

export const getPhysicsLessons = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
    const lessons = await Lesson.find({ subject: SubjectEnum.PHYSICS });
    return res.status(200).json(lessons);
    };

    