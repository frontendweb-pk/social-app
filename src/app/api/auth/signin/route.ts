import { regex } from "@/utils/regex";
import { z } from "zod";
import { errorHandler } from "../../utils/error-handler";
import { CustomError } from "../../errors/custom-error";
import { IUserDoc, User } from "../../models/user";
import { AuthError, NotFoundError } from "../../errors";
import { Password } from "../../utils/password";
import { Jwt } from "../../utils/jwt";
import { connectDb } from "@/lib/db";

const Schema = z.object({
  email: z.string().email("Invalid email!"),
  password: z.string().regex(regex.password),
});

export async function POST(req: Request) {
  // database connection
  await connectDb();

  const body = await req.json();

  try {
    const data = Schema.parse(body);

    const user = (await User.findOne({ email: data.email })) as IUserDoc;

    if (!user) {
      throw new NotFoundError("Email not found, please register with us!");
    }

    const verify = Password.compare(data.password, user.password);
    if (!verify) {
      throw new AuthError("Invalid password");
    }

    user.accessToken = Jwt.genToken({
      userId: user.id,
      email: user.email,
    });

    const today = new Date();
    today.setHours(today.getHours() + 1);
    user.expireAccessToken = today.toLocaleString();
    await user.save();
    return Response.json(user, { status: 200 });
  } catch (error) {
    return errorHandler(error as CustomError);
  }
}
