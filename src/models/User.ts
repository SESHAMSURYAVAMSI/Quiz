import mongoose, {
  Schema,
  models,
} from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    xp: {
      type: Number,
      default: 0,
    },

    level: {
      type: String,
      default: "Beginner",
    },

    badges: {
      type: [String],
      default: [],
    },

    streak: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const User =
  models.User ||
  mongoose.model("User", UserSchema);

export default User;