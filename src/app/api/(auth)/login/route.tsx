import { AuthenticationError, ValidationError } from "@/lib/errors";
import { errorHandler } from "@/lib/helpers/error-handler";
import { Jwt } from "@/lib/jwt";
import { Role, User } from "@/lib/models";
import { Password } from "@/lib/password";
import { NextResponse } from "next/server";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(req: Request) {
  try {
    // Validate request body
    const { email, password } = await req.json();

    // Parse request body
    const parse = loginSchema.safeParse({ email, password });

    if (!parse.success) {
      throw new ValidationError(parse.error.errors);
    }

    // Check if user exists
    const user = await User.findOne({
      where: { email },
      attributes: { exclude: ["created_at", "updated_at"] },
      include: [
        {
          model: Role,
          as: "role",
          attributes: ["role_id", "role_name"],
        },
      ],
    });
    if (!user) {
      throw new AuthenticationError("Invalid credentials");
    }

    // Check if password is correct
    const isValid = await Password.compare(password, user.password);
    if (!isValid) {
      throw new AuthenticationError("Invalid password");
    }

    // Generate JWT
    const token = Jwt.sign({ user_id: user.user_id, email: user.email });
    user.access_token = token;
    await user.save({ fields: ["access_token"] });

    console.log("User", user);
    return NextResponse.json({
      user: {
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
        active: user.active,
        email_verified: user.email_verified,
        access_token: user.access_token,
        role_id: user.role_id,
        role_name: user.role.dataValues.role_name,
      },
    });
  } catch (error) {
    return errorHandler(error as Error);
  }
}
