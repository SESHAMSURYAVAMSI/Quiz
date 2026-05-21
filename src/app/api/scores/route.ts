import { connectDB } from "@/lib/mongodb";

import Score from "@/models/Score";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const score = await Score.create(body);

    return Response.json(score, {
      status: 201,
    });
  } catch (error) {
    return Response.json(
      { message: "Failed to save score" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request
) {
  try {
    await connectDB();

    const { searchParams } =
      new URL(req.url);

    const userId =
      searchParams.get("userId");

    let scores;

    if (userId) {
      scores = await Score.find({
        userId,
      }).sort({
        createdAt: -1,
      });
    } else {
      scores = await Score.find()
        .sort({ score: -1 })
        .limit(10);
    }

    return Response.json(scores);
  } catch (error) {
    return Response.json(
      {
        message:
          "Failed to fetch scores",
      },
      { status: 500 }
    );
  }
}