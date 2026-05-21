import mongoose, {
  Schema,
  models,
} from "mongoose";

const QuestionSchema = new Schema({
  question: String,

  options: [String],

  correctAnswer: String,
});

const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    difficulty: {
      type: String,
      required: true,
    },

    questions: [QuestionSchema],
  },
  {
    timestamps: true,
  }
);

const Quiz =
  models.Quiz ||
  mongoose.model("Quiz", QuizSchema);

export default Quiz;