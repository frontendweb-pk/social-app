import { z } from "zod";
import { User } from "../../models/user";
import { BadRequestError } from "../../errors";
import { CustomError } from "../../errors/custom-error";
import { connectDb } from "@/lib/db";
import { errorHandler } from "../../utils/error-handler";

// Schema
const SignupSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be min 8 char long." })
    .max(16, { message: "Password must be 16 char long." }),
  mobile: z
    .string()
    .min(10, { message: "Mobile must be min 10 digit long." })
    .max(10, { message: "Mobile number must be max 10 digt long." }),
  role: z.string().default("user"),
  avatar: z.string().default(""),
  verifyEmail: z.boolean().default(false),
  accessToken: z.string().default(""),
  expireAccessToken: z.string().default(""),
  active: z.boolean().default(true),
});

/**
 * User registration route handle
 * @param req
 * @returns
 */
export async function POST(req: Request) {
  // database connection
  await connectDb();

  // request body
  const body = await req.json();
  try {
    const hasUser = await User.findOne({ email: body.email });
    if (hasUser) {
      throw new BadRequestError(
        "User already existed, Please use another email"
      );
    }

    // validate request body
    const data = SignupSchema.parse(body);

    // save into database
    const user = await new User(data);
    const result = await user.save();

    // response
    return Response.json(result, { status: 201 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
