import mongoose, { Schema, Document } from "mongoose";
import { Password } from "../utils/password";

export const USER_TABLE = "User";
export interface IUser {
  name: string;
  email: string;
  password: string;
  mobile: string;
  avatar?: string;
  verifyEmail?: boolean;
  accessToken?: string;
  expireAccessToken?: string;
  active: boolean;
}

export interface IUserDoc extends Document<IUser>, IUser {}

const schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, trim: true },
    mobile: { type: String, required: true, min: 10, max: 10, unique: true },
    role: { type: String, default: "user", enum: ["user", "admin"] },
    avatar: { type: String, default: "" },
    verifyEmail: { type: Boolean, default: false },
    accessToken: { type: String, default: "" },
    expireAccessToken: { type: String, default: "" },
    active: { type: String, default: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
  }
);

schema.pre("save", function cb(done) {
  const pwd = this.get("password");
  if (this.isModified("password")) {
    this.set("password", Password.hash(pwd));
  }
  if (this.get("role") === "admin") {
    this.set("verifyEmail", true);
  }

  done();
});

export const User =
  mongoose.models[USER_TABLE] || mongoose.model<IUserDoc>(USER_TABLE, schema);
