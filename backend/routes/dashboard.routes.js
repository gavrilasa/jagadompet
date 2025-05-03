import { Router } from "express";
const router = Router();
import Transaction from "../models/transaction.model";

router.get("/stats", async (req, res) => {
  try {
    const stats = await Transaction.aggregate([
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        }
      }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ error: "Failed to generate statistics." });
  }
});

export default router;
