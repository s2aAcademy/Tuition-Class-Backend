import mongoose, { Schema, Document, Model } from "mongoose";

interface UserDoc extends Document {
  password: string;
  salt: string;
  firstName: string;
  lastName: string;
  phone: string;
  paid: boolean;
  classId: String;
  slip: String;
  role: String;
  email: String;
}

const UserSchema = new Schema(
  {
    password: { type: String, required: true },
    salt: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    classId: { type: String, required: true, unique: true },
    checked: { type: Boolean, default: false },
    email: { type: String, required: true },
    slip: { type: String, required: true },
    role: {
      type: String,
      enum: ["Admin", "Student"],
      default: "Student",
    },
    phone: { type: String, required: true, unique: true },
    paid: { type: Boolean, default: false },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.salt;
        delete ret.__v;
        delete ret.createdAt;
        delete ret.updatedAt;
      },
    },
    timestamps: true,
  }
);

const User = mongoose.model<UserDoc>("user", UserSchema);

export { User };
