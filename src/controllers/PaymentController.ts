import { Request, Response } from "express";
import { Payment } from "../models/Payment";
import { plainToClass } from "class-transformer";
import { PaymentInputDto } from "../dto/Payment.dto";

export const addPayment = async (req: Request, res: Response) => {
  try {
    const paymentInput = plainToClass(PaymentInputDto, req.body);
    const { userId, classType, month, year, slipurl, status } = paymentInput;
    const payment = new Payment({
      userId,
      classType,
      month,
      year,
      slipurl,
      status,
    });
    await payment.save();
    return res.status(201).json({ payment });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
};
