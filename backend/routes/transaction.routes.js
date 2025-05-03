import { Router } from "express";
const router = Router();
import { getTransactions, createTransaction, updateTransaction, deleteTransaction, getSummary, getChartData } from "../controllers/transactionController";
import validateTransaction from "../middlewares/validateTransaction";

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

//Data chart pengeluaran per kategori
router.get("/chart", getChartData);

export default router;
