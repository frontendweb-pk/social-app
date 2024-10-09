import { NotFoundError } from "@/app/api/errors";
import { CustomError } from "@/app/api/errors/custom-error";
import { IPost, IPostDoc, Post } from "@/app/api/models/post";
import { errorHandler } from "@/app/api/utils/error-handler";
import { z } from "zod";
import { PostSchema } from "../route";

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
  try {
    const post = await Post.findById(params.postId);

    if (!post) {
      return new NotFoundError("Post not found");
    }

    return Response.json(post, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Post handler
 * Update post by postId
 * @param req
 * @param params
 * @returns
 */

export async function PUT(req: Request, params: Params) {
  const body = await req.json();

  try {
    const post = await Post.findById(params.postId);

    if (!post) {
      return new NotFoundError("Post not found");
    }

    const data = PostSchema.parse(body);
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Post handler
 * Delete post by postId
 * @param req
 * @param params
 * @returns
 */
export async function DELETE(req: Request, params: Params) {
  try {
    const post = await Post.findById(params.postId);

    if (!post) {
      return new NotFoundError("Post not found");
    }

    (await Post.findByIdAndDelete(params.postId)) as IPostDoc;

    return Response.json({ postId: params.postId }, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
