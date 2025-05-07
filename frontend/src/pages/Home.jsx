import React, { useState, useEffect } from "react";
import graph from "../images/graph.png";
import pp from "../images/pp.png";
import inc from "../images/income.png";
import exp from "../images/expense.png";
import shop from "../images/shopbag.png";
import down from "../images/downhome.png";
import { useNavigate } from "react-router-dom";
import { categoryMapping } from "../components/Dropdown";

const DashboardPage = () => {
  const navigate = useNavigate();

  const handleExpense = (e) => {
    e.preventDefault();
    navigate("/expinput");
  };

  const handleIncome = (e) => {
    e.preventDefault();
    navigate("/incinput");
  };

  const handleHistory = (e) => {
    e.preventDefault();
    navigate("/history");
  };
  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/logout");
  }

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/transactions");
        if (!res.ok) {
          throw new Error("Failed to fetch transactions");
        }
        const data = await res.json();
        setTransactions(data);

        // Calculate totals
        let income = 0;
        let expense = 0;
        data.forEach((tx) => {
          if (tx.type === "income") {
            income += tx.amount;
          } else if (tx.type === "expense") {
            expense += tx.amount;
          }
        });

        setTotalIncome(income);
        setTotalExpense(expense);
        setBalance(income - expense);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <div className="w-full min-h-[1023px]">
        {/* Header */}
        <div className="w-[375px] h-[64px]  mt-[44px] flex justify-center items-center">
          <div className="w-[337px] h-[40px] flex items-center justify-between">
            <div className="w-[38px] h-[38px] bg-gray-300 rounded-full" onClick={handleProfile}>
              <img src={pp} alt="profile" />
            </div>
            <button className="text-[14px] w-[107px] h-[40px] bg-transparent border border-[#42AB39] rounded-[40px] font-medium flex items-center justify-center">
              <div className="w-[24px] h-[24px] flex items-center justify-center mt-[1px]">
                <img src={down} className="mr-[6px] my-2" alt="down" />
              </div>
              <p>October</p>
            </button>
          </div>
        </div>

        {/* Remaining Money */}
        <div className="text-center mb-6">
          <p className="text-gray-500">Your Remaining Money</p>
          <h1 className="text-[40px] font-semibold mt-[9px]">
            {" "}
            Rp {balance.toLocaleString("id-ID")}
          </h1>
        </div>

        {/* Income & Expenses */}
        <div className="flex flex-col">
          <div
            className="w-[335px] h-[80px] bg-[#00C153] rounded-[28px] flex items-center mx-[20px]"
            onClick={handleIncome}
          >
            <div className="flex mx-[17px]">
              <div className="w-[48px] h-[48px] bg-white rounded-[16px] grid justify-center items-center">
                <img src={inc} alt="income" />
              </div>
            </div>
            <div className="flex flex-col ml-[10px]">
              <p className="text-[#FCFCFC] text-[14px] font-medium">Income</p>
              <p className="text-[#FCFCFC] text-[22px] font-semibold">
                Rp {totalIncome.toLocaleString("id-ID")}
              </p>
            </div>
          </div>

          <div
            className="w-[335px] h-[80px] bg-[#FA2F34] mt-[12px] rounded-[28px] flex items-center mx-[20px]"
            onClick={handleExpense}
          >
            <div className="flex mx-[17px]">
              <div className="w-[48px] h-[48px] bg-white rounded-[16px] grid justify-center items-center">
                <img src={exp} alt="expense" />
              </div>
            </div>
            <div className="flex flex-col ml-[10px]">
              <p className="text-[#FCFCFC] text-[14px] font-medium">Expenses</p>
              <p className="text-[#FCFCFC] text-[22px] font-semibold">
                Rp {totalExpense.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>

        {/* Spend Frequency */}
        <div className="w-[375px] h-[48px] items-center flex mt-[24px]">
          <p className="pl-[20px] font-semibold text-[18px] leading-[100%]">
            Spend Frequency
          </p>
        </div>
        <div className="mb-[28px] mt-[10px] flex items-center justify-center">
          <img src={graph} alt="graph" />
        </div>

        {/* Recent Transaction Header */}
        <div className="w-[375px] h-[48px] items-center flex mt-[24px] mb-3">
          <p className="pl-[20px] font-semibold text-[18px] leading-[100%]">
            Recent Transaction
          </p>
          <button
            className="ml-[95px] bg-[#CCFFC8] text-[#42AB39] text-sm font-semibold w-[78px] h-[32px] rounded-[40px] flex items-center justify-center"
            onClick={handleHistory}
          >
            See All
          </button>
        </div>

        {/* Transaction List */}
        <div className="flex flex-col gap-[6px]">
          {loading && <p className="text-center">Loading transactions...</p>}
          {error && <p className="text-center text-red-500">{error}</p>}
          {!loading && !error && transactions.length === 0 && (
            <p className="text-center">No transactions found.</p>
          )}
          {!loading &&
            !error &&
            transactions
              .filter((tx) => {
                if (!tx.date) return false;

                const txDate = new Date(tx.date);
                const today = new Date();
              
                return (
                  txDate.getFullYear() === today.getFullYear() &&
                  txDate.getMonth() === today.getMonth() &&
                  txDate.getDate() === today.getDate()
                );
              })
              .map((tx) => {
                const categoryKey = tx.category?.toLowerCase?.() || "";
                const map = categoryMapping[categoryKey] || {};
                const icon = map.icon || shop;
                const bgColor = map.bgColor || "#EEE";
                const textColor = tx.type === "income" ? "#42AB39" : "#FD3C4A";
                const formattedAmount = tx.amount.toLocaleString("id-ID");

                return (
                  <div
                    key={tx.transaction_id}
                    className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px] w-[335px] h-[89px] mx-[20px]"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center"
                        style={{ backgroundColor: bgColor }}
                      >
                        <img
                          src={icon}
                          className="w-10 h-10 object-contain"
                          alt={tx.category}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-[16px] mb-[12px]">
                          {map.label || tx.category}
                        </p>
                        <p className="text-[#91919F] text-[13px] break-words max-w-[150px]">
                          {tx.description || "No Description"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className="text-[16px] font-semibold mb-[12px]"
                        style={{ color: textColor }}
                      >
                        {tx.type === "income"
                          ? `+Rp ${formattedAmount}`
                          : `-Rp ${formattedAmount}`}
                      </p>
                      <p className="text-[#91919F] text-[13px]">
                        {new Date(tx.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
