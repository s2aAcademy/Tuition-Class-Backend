import mongoose, { Schema, Document, Model } from "mongoose";

export interface PaperDoc extends Document {
  paperUrl: string;
  title: string;
  description: string;
  lessonId: string;
}

const PaperSchema = new Schema(
  {
    paperUrl: String,
    title: String,
    description: String,
    lessonId: { type: Schema.Types.ObjectId, ref: "lesson" },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Paper = mongoose.model<PaperDoc>("Paper", PaperSchema);

export { Paper };
