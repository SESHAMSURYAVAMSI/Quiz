import { connectDB } from "@/lib/mongodb";

import Quiz from "@/models/Quiz";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await connectDB();

    const quiz = await Quiz.create(body);

    return Response.json(quiz, {
      status: 201,
    });
  } catch (error) {
    return Response.json(
      { message: "Failed to create quiz" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const quizzes = await Quiz.find();

    return Response.json(quizzes);
  } catch (error) {
    return Response.json(
      { message: "Failed to fetch quizzes" },
      { status: 500 }
    );
  }
}