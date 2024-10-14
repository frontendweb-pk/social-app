import { CustomError } from "../../errors/custom-error";
import { errorHandler } from "../../utils/error-handler";

import { connectDb } from "@/lib/db";
import { Post } from "../../models/post";
import { PostSchema } from "../../utils/schema";
import { BadRequestError } from "../../errors";

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
    const validData = PostSchema.safeParse(body);
    if (!validData.success) throw new BadRequestError("Field are not valid!");

    const post = new Post(body);
    const result = await post.save();
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
