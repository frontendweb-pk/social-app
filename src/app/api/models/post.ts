import mongoose, { Schema, Document } from "mongoose";
import { USER_TABLE } from "./user";

export const POST_TABLE = "Post";
export interface ILike {
  user: string;
  active: boolean;
}
export enum Status {
  Approved = "approved",
  Rejected = "rejected",
  Pending = "pending",
}
export enum PostStatus {
  Public = "public",
  Private = "private",
  Friends = "friends",
}

export interface IComment {
  _id?: string;
  user: Schema.Types.ObjectId;
  message: string;
  status: Status;
  createdAt?: Date;
  images?: string[];
}
export interface Friends {
  user: Schema.Types.ObjectId;
  status: Status;
  createdAt?: Date;
}
export interface IPost {
  user: string;
  content: string;
  images: Media[];
  code?: string;
  videoUrl?: Media;
  active: boolean;
  comments: IComment[];
  likes: ILike[];
  tags: string[];
  status: string;
  friendRequests: Friends[];
  postStatus: string;
}
export interface IPostDoc extends Document<IPost>, IPost {}

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
