import { Router } from "express";
const router = Router();
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSummary, getSpendFrequency } from "../controllers/transaction.controller.js";
import validateTransaction from "../middleware/validate.transaction.js";

//Ambil semua transaksi
router.get("/", getTransactions);

//Tambah transaksi baru
router.post("/", validateTransaction, createTransaction);

//Update transaksi 
router.put("/:id", validateTransaction, updateTransaction);

//Hapus transaksi 
router.delete("/:id", deleteTransaction);

//total income, expense, balance
router.get("/summary", getSummary);

// grafik pengeluaran
router.get("/spend-frequency", getSpendFrequency);


export default router;
