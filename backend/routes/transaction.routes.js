import { Router } from "express";
const router = Router();
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSummary } from "../controllers/transaction.controller.js";
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


export default router;
