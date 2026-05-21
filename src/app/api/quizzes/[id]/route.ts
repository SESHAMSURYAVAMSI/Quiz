import { connectDB } from "@/lib/mongodb";

import Quiz from "@/models/Quiz";

export async function GET(
  req: Request,
  context: {
    params: Promise<{
      id: string;
    }>;
  }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    const quiz = await Quiz.findById(id);

    if (!quiz) {
      return Response.json(
        { message: "Quiz not found" },
        { status: 404 }
      );
    }

    return Response.json(quiz);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch quiz" },
      { status: 500 }
    );
  }
}