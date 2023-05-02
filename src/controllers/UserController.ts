import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";
import {
  CreateCustomerInput,
  EditCustomerProfileInput,
  UserLoginInput,
} from "../dto";
import { User, Counters } from "../models";

import {
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  ValidatePassword,
} from "../utility";
import { Role } from "../utility/constants";
//import { sendMail } from "../services/MailService";
import { Video } from "../models/Video";
const mongoose = require("mongoose");

export const UserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const session = await mongoose.startSession();

  try {
    const customerInputs = plainToClass(CreateCustomerInput, req.body);

    const validationError = await validate(customerInputs, {
      validationError: { target: true },
    });

    if (validationError.length > 0) {
      return res.status(400).json(validationError);
    }

    const {
      firstName,
      lastName,
      phone,
      password,
      classId,
      slip,
      role,
      email,
      state,
      classType,
    } = customerInputs;

    session.startTransaction();

    const itemIds = await Counters.find().session(session);

    let class_id: string;

    if (state === "nonRegistered") {
      if (classType === "chemistry") {
        class_id = "c" + "23_" + itemIds[0].c;
      }
      if (classType === "physics") {
        class_id = "p" + "23_" + itemIds[0].p;
      }
      if (classType === "both") {
        class_id = "cp" + "23_" + itemIds[0].cp;
      }
    } else {
      class_id = classId;
    }

    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt);

    const existingUser = await User.findOne({ phone: phone }).session(session);

    if (existingUser !== null) {
      return res.status(400).json({ message: "User already exist!" });
    }

    const user = new User({
      email: email,
      password: userPassword,
      phone: phone,
      salt: salt,
      firstName: firstName,
      lastName: lastName,
      classId: class_id,
      slip: slip,
      role: role,
    });

    const result = await user.save({ session });

    if (classType === "chemistry") {
      await Counters.findByIdAndUpdate(
        itemIds[0]._id,
        {
          $inc: {
            c: 1,
          },
        },
        { new: true, session }
      );
    }

    if (classType === "physics") {
      await Counters.findByIdAndUpdate(
        itemIds[0]._id,
        {
          $inc: {
            p: 1,
          },
        },
        { new: true, session }
      );
    }

    if (classType === "both") {
      await Counters.findByIdAndUpdate(
        itemIds[0]._id,
        {
          $inc: {
            cp: 1,
          },
        },
        { new: true, session }
      );
    }

    //Generate the Signature
    const signature = await GenerateSignature({
      _id: result._id,
      phone: result.phone,
      role: result.role,
    });
    // Send the result
    await session.commitTransaction();
    session.endSession();
    //await sendMail();
    return res.status(201).json({ signature, phone: result.phone });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};

export const UserLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customerInputs = plainToClass(UserLoginInput, req.body);

  const validationError = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (validationError.length > 0) {
    return res.status(400).json(validationError);
  }

  const { email, password } = customerInputs;

  const student = await User.findOne({ email });
  if (student && student?.role === Role.Student) {
    // await sendMail();

    const validation = await ValidatePassword(
      password,
      student.password,
      student.salt
    );

    if (validation) {
      const signature = await GenerateSignature({
        _id: student._id,
        phone: student.phone,
        role: student.role,
      });

      return res.status(200).json({
        signature,
        student: {
          role: student.role,
          paid: student.paid,
          classId: student.classId,
          firstName: student.firstName,
          lastName: student.lastName,
        },
      });
    }
  }

  return res.json({ msg: "Error With SignIn" });
};

export const GetCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  if (customer) {
    const profile = await User.findById(customer._id);

    if (profile) {
      return res.status(201).json(profile);
    }
  }
  return res.status(400).json({ msg: "Error while Fetching Profile" });
};

export const EditCustomerProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const customer = req.user;

  const customerInputs = plainToClass(EditCustomerProfileInput, req.body);

  const validationError = await validate(customerInputs, {
    validationError: { target: true },
  });

  if (validationError.length > 0) {
    return res.status(400).json(validationError);
  }

  const { firstName, lastName, address } = customerInputs;

  if (customer) {
    const profile = await User.findById(customer._id);

    if (profile) {
      profile.firstName = firstName;
      profile.lastName = lastName;
      profile.address = address;
      const result = await profile.save();

      return res.status(201).json(result);
    }
  }
  return res.status(400).json({ msg: "Error while Updating Profile" });
};

// Get  Video By LessonId
export const GetVideosByLessonId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const lessonId = req.params.lessonId;

  if (lessonId) {
    const videos = await Video.find({ lessonId });
    return res.status(200).json(videos);
  }
  return res.status(400).json({ msg: "Error while Fetching Video" });
};
