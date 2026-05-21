import { connectDB } from "@/lib/mongodb";

import User from "@/models/User";

import {
  calculateLevel,
  getBadges,
} from "@/utils/xpSystem";

export async function POST(
  req: Request
) {
  try {
    const {
      email,
      earnedXP,
    } = await req.json();

    await connectDB();

    const user =
      await User.findOne({
        email,
      });

    if (!user) {
      return Response.json(
        {
          message:
            "User not found",
        },
        { status: 404 }
      );
    }

    user.xp += earnedXP;

    user.level =
      calculateLevel(user.xp);

    user.badges =
      getBadges(user.xp);

    await user.save();

    return Response.json(user);
  } catch (error) {
    return Response.json(
      {
        message:
          "Failed to update XP",
      },
      { status: 500 }
    );
  }
}