// src/pages/HistoryPage.js
import shop from "../images/shopbag.png";
import bill from "../images/bill.png";
import food from "../images/food.png";
import back from "../images/return.png";
import down from "../images/downfall.png";
import transport from "../images/portal.png";
import salary from "../images/salary.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from 'react';

const transactions = [
  {
    id: 1,
    title: "Shopping",
    desc: "Buy some grocery",
    amount: -120,
    time: "10:00 AM",
    date: "today",
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
    date: "today",
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
    date: "today",
    icon: food,
    bgColor: "#FDD5D7",
    textColor: "#FD3C4A",
  },
  {
    id: 4,
    title: "Salary",
    desc: "Salary for July",
    amount: 5000,
    time: "04:30 PM",
    date: "yesterday",
    icon: salary,
    bgColor: "#CFFAEA",
    textColor: "#42AB39",
  },
  {
    id: 5,
    title: "Transportation",
    desc: "Charging Tesla",
    amount: -18,
    time: "08:30 PM",
    date: "yesterday",
    icon: transport,
    bgColor: "#BDDCFF",
    textColor: "#FD3C4A",
  },
];

const HistoryPage = () => {
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const token = localStorage.getItem('token');

  const backSign = (e) => {
    e.preventDefault();
    navigate("/dash");
  };

  const handleItemClick = (id) => {
    const selected = transactions.find((item) => item.id === id);
    setSelectedTransaction(selected);
  };
  
  const renderTransactions = (day) => {
    return transactions
      .filter((item) => item.date === day)
      .map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px]  w-[335px] h-[89px] mx-[20px] mb-[6px] cursor-pointer"
          onClick={() => handleItemClick(item.id)}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center"
              style={{ backgroundColor: item.bgColor }}
            >
              <img src={item.icon} className="w-10 h-10 object-contain" />
            </div>
            <div>
              <p className="font-medium text-[16px] mb-[12px]">{item.title}</p>
              <p className="text-[#91919F] text-[13px]">{item.desc}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className="text-[16px] font-semibold mb-[12px]"
              style={{ color: item.textColor }}
            >
              {item.amount < 0 ? `- $${-item.amount}` : `+ $${item.amount}`}
            </p>
            <p className="text-[#91919F] text-[13px]">{item.time}</p>
          </div>
        </div>
      ));
  };
  useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    }, [token, navigate]);
  
    if (!token) {
      return null; // Render nothing while redirecting
    }
  
  return (
    <div>
      <div className="w-full min-h-[812px]">
        {/* Header */}
        <div className="w-[375px] h-[64px] mt-[44px] flex items-center relative">
          <div className="w-[337px] h-[40px] flex items-center justify-between mx-[20px]">
            <span
              className="absolute left-[20px] flex items-center justify-center"
              onClick={backSign}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center">
                <img src={back} alt="Back" className="w-[24px]" />
              </div>
            </span>
            <span className="flex items-center justify-center w-full">
              <button className="text-[14px] w-[107px] h-[40px] bg-transparent border border-[#F1F1FA] rounded-[40px] font-medium flex items-center justify-center">
                <div className="w-[24px] h-[24px] flex items-center justify-center mt-[1px]">
                  <img src={down} className="mr-[6px] my-2" />
                </div>
                <p>October</p>
              </button>
            </span>
          </div>
        </div>

        {/* Today */}
        <div className="w-full mt-[20px] mx-[20px]">
          <p className="font-semibold text-[18px] mb-[8px]">Today</p>
        </div>
        <div className="flex flex-col">{renderTransactions("today")}</div>

        {/* Yesterday */}
        <div className="w-full mt-[12px] mx-[20px]">
          <p className="font-semibold text-[18px] mb-[8px]">Yesterday</p>
        </div>
        <div className="flex flex-col">{renderTransactions("yesterday")}</div>
      </div>
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-end">
          <div className="w-[375px] h-[650px] bg-[#FCEED4] rounded-t-[32px] relative">
            {/* Header */}
            <div className="w-[375px] h-[64px] mt-[24px] flex items-center relative">
              <div className="w-full flex justify-center items-center relative">
                <p className="font-semibold text-[18px] text-[#292B2D]">
                  Detail
                </p>
                <button
                  className="absolute right-4 text-[24px] font-bold text-[#292B2D]"
                  onClick={() => setSelectedTransaction(null)}
                >
                  ×
                </button>
              </div>
            </div>

            {/* Icon and Title */}
            <div className="flex mt-[14px] ml-[16px] items-center">
              <div
                className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center"
                style={{ backgroundColor: selectedTransaction.bgColor }}
              >
                <img src={selectedTransaction.icon} className="w-10 h-10" />
              </div>
              <p className="ml-[14px] font-semibold text-[24px]">
                {selectedTransaction.title}
              </p>
            </div>

            {/* Amount */}
            <div
              className="mt-[12px] ml-[16px] font-semibold text-[40px]"
              style={{ color: selectedTransaction.textColor }}
            >
              {selectedTransaction.amount < 0
                ? `-Rp ${-selectedTransaction.amount * 1000}`
                : `+Rp ${selectedTransaction.amount * 1000}`}
            </div>

            {/* White Sheet */}
            <div className="absolute bottom-0 z-10 bg-white w-full h-[480px] rounded-t-[32px] flex flex-col">
              <div className="flex w-[343px] h-[74px] border border-[#F1F1FA] rounded-[16px] mt-[23px] mx-auto items-center">
                <div className="ml-[14px] font-[400]">
                  {selectedTransaction.desc}
                </div>
              </div>
              <div className="flex w-[343px] h-[74px] border border-[#F1F1FA] rounded-[16px] mt-[9px] mx-auto items-center">
                <div className="ml-[14px] font-[400]">
                  {selectedTransaction.time}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full mt-auto mb-6 px-4 justify-between">
                <button className="w-[160px] h-[56px] rounded-[16px] bg-[#FCAC12] text-white font-semibold text-[18px]">
                  Edit
                </button>
                <button className="w-[160px] h-[56px] border-2 border-[#FA2F34] text-[#FA2F34] rounded-[16px] font-semibold text-[18px]">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryPage;
