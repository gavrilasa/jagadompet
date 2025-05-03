import Transaction, { find, findByIdAndUpdate, findByIdAndDelete, aggregate } from "../models/transaction.model";

export async function createTransaction(req, res) {
  try {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to create transaction." });
  }
}

export async function getTransactions(req, res) {
  try {
    const transactions = await find().sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
}

export async function updateTransaction(req, res) {
  try {
    const transaction = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Failed to update transaction." });
  }
}

export async function deleteTransaction(req, res) {
  try {
    await findByIdAndDelete(req.params.id);
    res.json({ message: "Transaction deleted." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete transaction." });
  }
}

export async function getSummary(req, res) {
  try {
    const user_id = req.query.user_id; // atau ambil dari token/session
    const [income] = await aggregate([
      { $match: { user_id, type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);
    const [expense] = await aggregate([
      { $match: { user_id, type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } }
    ]);

    res.json({
      totalIncome: income?.total || 0,
      totalExpense: expense?.total || 0,
      balance: (income?.total || 0) - (expense?.total || 0)
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch summary." });
  }
}

export async function getChartData(req, res) {
  try {
    const user_id = req.query.user_id;
    const data = await aggregate([
      { $match: { user_id, type: "expense" } },
      { $group: { _id: "$category", total: { $sum: "$amount" } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chart data." });
  }
}
