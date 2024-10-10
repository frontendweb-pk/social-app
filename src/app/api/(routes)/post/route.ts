import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../utils/error-handler";

import { connectDb } from "@/lib/db";
import { Post } from "../../models/post";
import { z } from "zod";
import { BadRequestError } from "../../errors";

const PostSchema = z.object({
  user: z.string().min(1, { message: "User is required!" }),
  content: z.string().default(""),
  code: z.string().nullable().default(null),
  images: z
    .array(
      z.object({
        public_id: z.string().optional(),
        url: z.string().optional(),
        resource_type: z.string().optional(),
        access_mode: z.string().optional(),
        folder: z.string().optional(),
        version: z.string().optional(),
        signature: z.string().optional(),
      })
    )
    .default([]),
  videoUrl: z
    .object({
      public_id: z.string().optional(),
      url: z.string().optional(),
      resource_type: z.string().optional(),
      access_mode: z.string().optional(),
      folder: z.string().optional(),
      version: z.string().optional(),
      signature: z.string().optional(),
    })
    .nullable()
    .default(null),
  active: z.boolean().default(true),
  tags: z.string().array().default([]),
  status: z.string().default("approved"),
  postStatus: z.string().default("public"),
  comments: z
    .object({
      user: z.string(),
      message: z.string(),
      images: z.string(),
      status: z.string(),
      createdAt: z.date(),
    })
    .array()
    .default([]),
  likes: z
    .object({
      user: z.string(),
      active: z.boolean().default(true),
    })
    .array()
    .default([]),
  friendRequests: z
    .object({
      user: z.string(),
      active: z.boolean().default(true),
      createdAt: z.date(),
    })
    .array()
    .default([]),
});

/**
 * Post handler
 * @returns
 */
export async function GET() {
  await connectDb();
  try {
    const posts = await Post.find();
    return Response.json(posts, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Post request handler
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  await connectDb();
  const body = await req.json();
  try {
    const validate = PostSchema.safeParse(body);
    if (!validate.success) {
      throw new BadRequestError("Validation failed!");
    }
    const post = new Post(body);
    const result = await post.save();
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
