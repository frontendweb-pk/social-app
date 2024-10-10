import { CustomError } from "@/app/api/errors/custom-error";
import { Post } from "@/app/api/models/post";
import { errorHandler } from "@/app/api/utils/error-handler";
import { connectDb } from "@/lib/db";

interface Params {
  postId: string;
}

/**
 * Post handler
 * Fetch post by postId
 * @param req
 * @param param1
 * @returns
 */
export async function GET(req: Request, params: Params) {
  await connectDb();
  try {
    const post = await Post.findById(params.postId);

    return Response.json(post, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
