import mongoose, { Schema, Document } from "mongoose";

interface StudyPackUserDoc extends Document {
  password: string;
  email: String;
}

const StudyPackUserSchema = new Schema(
  {
    password: { type: String },
    email: { type: String },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const StudyPackUser = mongoose.model<StudyPackUserDoc>(
  "StudyPackUser",
  StudyPackUserSchema
);

export { StudyPackUser };
