import { BadRequestError, NotFoundError } from "@/app/api/errors";
import { CustomError } from "@/app/api/errors/custom-error";
import { IPostDoc, Post } from "@/app/api/models/post";
import { errorHandler } from "@/app/api/utils/error-handler";
import { PostSchema } from "@/app/api/utils/schema";
import { connectDb } from "@/lib/db";

interface Params {
  params: {
    postId: string;
  };
}

/**
 * Post handler
 * Fetch post by postId
 * @param req
 * @param param1
 * @returns
 */
export async function GET(req: Request, { params }: Params) {
  await connectDb();
  try {
    const post = await Post.findById(params.postId);

    if (!post) throw new NotFoundError("Post not found by " + params.postId);

    return Response.json(post, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 *
 * @param req
 * @param param1
 */
export async function PUT(req: Request, { params }: Params) {
  await connectDb();
  const body = await req.json();

  try {
    const validData = PostSchema.safeParse(body);
    if (!validData.success) throw new BadRequestError("Field are not valid!");

    const post = (await Post.findByIdAndUpdate(
      params.postId,
      {
        $set: body,
      },
      { new: true }
    )) as IPostDoc;

    return Response.json(post, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}

/**
 * Delete post handler
 * @param req
 * @param param1
 * @returns
 */
export async function DELETE(req: Request, { params }: Params) {
  await connectDb();
  try {
    const post = await Post.findById(params.postId);

    if (!post) throw new NotFoundError("Post not found by " + params.postId);

    await Post.findByIdAndDelete(params.postId);
    return Response.json({ postId: params.postId }, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
