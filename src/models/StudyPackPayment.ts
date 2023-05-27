import mongoose, { Schema, Document, Model } from "mongoose";

export enum PaymentStatusEnum {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

interface StudyPackPaymentDoc extends Document {
    studyPackUserId: string;
    studyPackId: string;
    status: PaymentStatusEnum;
    slipurl: string;
}

const StudyPackPaymentSchema = new Schema(
  {
    studyPackUserId: { type: Schema.Types.ObjectId, ref: "StudyPackUser" },
    studyPackId: { type: Schema.Types.ObjectId, ref: "StudyPack" },
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

const StudyPackPayment = mongoose.model<StudyPackPaymentDoc>("StudyPackPayment", StudyPackPaymentSchema);

export { StudyPackPayment };
