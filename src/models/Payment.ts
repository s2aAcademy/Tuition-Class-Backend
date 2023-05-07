import mongoose, { Schema, Document, Model } from "mongoose";
import { Refer } from "twilio/lib/twiml/VoiceResponse";

export enum MonthEnum {
  JANUARY = 1,
  FEBRUARY = 2,
  MARCH = 3,
  APRIL = 4,
  MAY = 5,
  JUNE = 6,
  JULY = 7,
  AUGUST = 8,
  SEPTEMBER = 9,
  OCTOBER = 10,
  NOVEMBER = 11,
  DECEMBER = 12,
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
