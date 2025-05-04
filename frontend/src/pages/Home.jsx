import React, { useState } from "react";
import graph from "../images/graph.png";
import pp from "../images/pp.png";
import inc from "../images/income.png";
import exp from "../images/expense.png";
import shop from "../images/shopbag.png";
import bill from "../images/bill.png";
import food from "../images/food.png";
import down from "../images/downhome.png";
import { useNavigate } from "react-router-dom";

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

  const [transactions] = useState([
    {
      id: 1,
      title: "Shopping",
      desc: "Buy some grocery",
      amount: -120,
      time: "10:00 AM",
      icon: shop,
      bgColor: "#FCEED4",
      textColor: "#FD3C4A",
    },
    {
      id: 2,
      title: "Subscription",
      desc: "Disney+ Annual...",
      amount: -80,
      time: "03:30 PM",
      icon: bill,
      bgColor: "#EEE5FF",
      textColor: "#FD3C4A",
    },
    {
      id: 3,
      title: "Food",
      desc: "Buy a ramen",
      amount: -32,
      time: "07:30 PM",
      icon: food,
      bgColor: "#FDD5D7",
      textColor: "#FD3C4A",
    },
  ]);

  return (
    <div>
      <div className="w-full min-h-[1023px]">
        {/* Header */}
        <div className="w-[375px] h-[64px]  mt-[44px] flex justify-center items-center">
          <div className="w-[337px] h-[40px] flex items-center justify-between">
            <div className="w-[38px] h-[38px] bg-gray-300 rounded-full">
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
          <h1 className="text-[40px] font-semibold mt-[9px]">Rp 1.000.000</h1>
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
                Rp 1.500.000
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
                Rp 500.000
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
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px] w-[335px] h-[89px] mx-[20px]"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center"
                  style={{ backgroundColor: tx.bgColor }}
                >
                  <img src={tx.icon} className="w-10 h-10 object-contain" alt={tx.title} />
                </div>
                <div>
                  <p className="font-medium text-[16px] mb-[12px]">{tx.title}</p>
                  <p className="text-[#91919F] text-[13px]">{tx.desc}</p>
                </div>
              </div>
              <div className="text-right">
                <p
                  className="text-[16px] font-semibold mb-[12px]"
                  style={{ color: tx.textColor }}
                >
                  {tx.amount < 0 ? `- $${-tx.amount}` : `+ $${tx.amount}`}
                </p>
                <p className="text-[#91919F] text-[13px]">{tx.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
