import { Schema } from "mongoose";
import { Status } from "./enums";

export interface Media {
  public_id: string;
  url: Schema.Types.ObjectId;
  resource_type?: string;
  access_mode?: string;
  folder?: string;
  version?: string;
  signature: string;
}

export interface ILike {
  user: Schema.Types.ObjectId;
  active: boolean;
}

export interface IComment {
  _id?: string;
  user: string;
  message: string;
  status: Status;
  createdAt?: Date;
  images?: string[];
}
export interface Friends {
  user: string;
  status: Status;
  createdAt?: Date;
}
export interface IPost {
  id?: string;
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
