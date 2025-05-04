import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const transactionSchema = new Schema(
  {
    transaction_id: {
      type: String,
      default: uuidv4,
      unique: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    }
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

export default model("Transaction", transactionSchema);
