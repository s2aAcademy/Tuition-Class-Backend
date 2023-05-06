import mongoose, { Schema, Document, Model } from "mongoose";
import { Refer } from "twilio/lib/twiml/VoiceResponse";

export enum MonthEnum {
  JANUARY = "january",
  FEBRUARY = "february",
  MARCH = "march",
  APRIL = "april",
  MAY = "may",
  JUNE = "june",
  JULY = "july",
  AUGUST = "august",
  SEPTEMBER = "september",
  OCTOBER = "october",
  NOVEMBER = "november",
  DECEMBER = "december",
}

export enum PaymentStatusEnum {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}
export enum PaymentSubjectEnum {
  PHYSICS = "physics",
  CHEMISTRY = "chemistry",
  BOTH = "both",
}

interface PaymentDoc extends Document {
  userId: string;
  classType: PaymentSubjectEnum;
  videoId: string;
  amount: number;
  month: MonthEnum;
  year: number;
  status: PaymentStatusEnum;
  slipurl: string;
}

const PaymentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "user" },
    classType: { type: PaymentSubjectEnum, default: null },
    videoId: { type: String, default: null },
    amount: { type: Number, default: 0 },
    month: { type: MonthEnum, default: null },
    year: { type: Number, default: 0 },
    status: { type: PaymentStatusEnum, default: PaymentStatusEnum.PENDING },
    slipurl: { type: String, default: null },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Payment = mongoose.model<PaymentDoc>("payment", PaymentSchema);

export { Payment };
