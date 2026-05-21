import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      email: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { email } =
      await context.params;

    const user =
      await User.findOne({
        email,
      });

    return Response.json(user);
  } catch (error) {
    return Response.json(
      {
        message:
          "Failed to fetch user",
      },
      { status: 500 }
    );
  }
}