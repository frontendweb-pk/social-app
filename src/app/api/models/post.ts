import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";
import { IPost } from "@/types/index";
import { PostStatus, Status } from "@/types/enums";

export const POST_TABLE = "Post";

export interface IPostDoc
  extends Document<Omit<IPost, "id">>,
    Omit<IPost, "id"> {}

const schema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: USER_TABLE },
    content: { type: String, default: "" },
    code: { type: String, default: "" },
    images: [
      {
        public_id: { type: String, default: null },
        url: { type: String, default: "" },
        resource_type: { type: String, default: "" },
        access_mode: { type: String, default: "" },
        folder: { type: String, default: "" },
        signature: { type: String, default: "" },
        version: { type: String, default: "" },
      },
    ],
    videoUrl: {
      public_id: { type: String, default: null },
      url: { type: String, default: "" },
      resource_type: { type: String, default: "" },
      access_mode: { type: String, default: "" },
      folder: { type: String, default: "" },
      signature: { type: String, default: "" },
      version: { type: String, default: "" },
    },
    active: { type: Boolean, default: true },
    tags: { type: [String], default: [] },
    status: { type: String, default: Status.Approved, enum: Status },
    postStatus: { type: String, default: PostStatus.Public, enum: PostStatus },
    comments: [
      {
        user: { type: Schema.Types.ObjectId, ref: USER_TABLE },
        message: { type: String, default: "" },
        images: { type: [String], default: [] },
        status: { type: String, default: Status.Pending, enum: Status },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    likes: [
      {
        user: { type: Schema.Types.ObjectId, ref: USER_TABLE },
        active: { type: Boolean, default: false },
      },
    ],
    friendRequests: [
      {
        user: { type: Schema.Types.ObjectId, ref: USER_TABLE },
        status: { type: String, default: Status.Pending, enum: Status },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

export const Post =
  mongoose.models[POST_TABLE] || mongoose.model<IPostDoc>(POST_TABLE, schema);
