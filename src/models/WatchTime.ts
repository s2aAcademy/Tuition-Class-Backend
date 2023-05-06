import mongoose, { Schema, Document, Model } from "mongoose";

interface WatchTimeDoc extends Document {
    videoId: string;
    userId: string;
    watchCount: number;
    watchMap: [string];
}

const WatchTimeSchema = new Schema(
  {
    videoId: { type: String },
    userId: { type: String },
    watchCount: { type: Number },
    watchMap: { type:[String]},
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

const WatchTime = mongoose.model<WatchTimeDoc>("watchTime", WatchTimeSchema);

export {   WatchTime };
