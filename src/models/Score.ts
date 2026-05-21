import mongoose, {
  Schema,
  models,
} from "mongoose";

const ScoreSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
    },

    quizTitle: {
      type: String,
      required: true,
    },

    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Score =
  models.Score ||
  mongoose.model("Score", ScoreSchema);

export default Score;