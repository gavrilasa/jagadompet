import React from "react";
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
    e.preventDefault(); // mencegah reload halaman
    navigate("/expinput");
  };

  const handleIncome = (e) => {
    e.preventDefault(); // mencegah reload halaman
    navigate("/incinput");
  };

  const handleHistory = (e) => {
    e.preventDefault(); // mencegah reload halaman
    navigate("/history");
  };

  return (
    <div>
      <div className="w-full min-h-[1023px]">
        {/* Header */}
        <div className="w-[375px] h-[64px]  mt-[44px] flex justify-center items-center ">
          <div className="w-[337px] h-[40px] flex items-center justify-between">
            <div className="w-[38px] h-[38px] bg-gray-300 rounded-full">
              <img src={pp} />
            </div>
            <button className="text-[14px] w-[107px] h-[40px] bg-transparent border border-[#42AB39] rounded-[40px] font-medium flex items-center justify-center">
              <div className="w-[24px] h-[24px] flex items-center justify-center mt-[1px]">
                <img src={down} className="mr-[6px] my-2" />
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
          {/* Income */}
          <div
            className="w-[335px] h-[80px] bg-[#00C153] rounded-[28px] flex items-center mx-[20px] "
            onClick={handleIncome}
          >
            <div className="flex mx-[17px]">
              <div className="w-[48px] h-[48px] bg-white rounded-[16px] grid justify-center items-center">
                <img src={inc} />
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
                <img src={exp} />
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
        <div className="w-[375px] h-[48px] items-center flex mt-[24px]">
          <p className="pl-[20px] gap-[10px] font-semibold text-[18px] leading-[100%]">
            Spend Frequency
          </p>
        </div>

        <div className="mb-[28px] mt-[10px]">
          <div className=" flex items-center justify-center">
            <img src={graph} />
          </div>
        </div>

        {/* Recent Transaction */}
        <div className="w-[375px] h-[48px] items-center flex mt-[24px] mb-3">
          <p className="pl-[20px] gap-[10px] font-semibold text-[18px] leading-[100%]">
            Recent Transaction
          </p>
          <button
            className="ml-[95px] bg-[#CCFFC8] text-[#42AB39] text-sm font-semibold w-[78px] h-[32px] rounded-[40px] flex items-center justify-center"
            onClick={handleHistory}
          >
            See All
          </button>
        </div>

        {/* List Transactions */}
        <div className="flex flex-col gap-[6px]">
          {/* Transaction 1 */}
          <div className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px]  w-[335px] h-[89px] mx-[20px]">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] bg-[#FCEED4] rounded-[16px] flex items-center justify-center">
                <img src={shop} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-[12px]">Shopping</p>
                <p className="text-[#91919F] text-[13px] ">Buy some grocery</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#FD3C4A] text-[16px] font-semibold mb-[12px] ">
                - $120
              </p>
              <p className="text-[#91919F] text-[13px]">10:00 AM</p>
            </div>
          </div>

          {/* Transaction 2 */}
          <div className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px]  w-[335px] h-[89px] mx-[20px]">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] bg-[#EEE5FF] rounded-[16px] flex items-center justify-center">
                <img src={bill} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-[12px]">
                  Subscription
                </p>
                <p className="text-[#91919F] text-[13px]">Disney+ Annual...</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#FD3C4A] text-[16px] font-semibold mb-[12px]">
                - $80
              </p>
              <p className="text-[#91919F] text-[13px]">03:30 PM</p>
            </div>
          </div>

          {/* Transaction 3 */}
          <div className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px] w-[335px] h-[89px] mx-[20px]">
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] bg-[#FDD5D7] rounded-[16px] flex items-center justify-center">
                <img src={food} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-[12px]">Food</p>
                <p className="text-[#91919F] text-[13px]">Buy a ramen</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#FD3C4A] text-[16px] font-semibold mb-[12px]">
                - $32
              </p>
              <p className="text-[#91919F] text-[13px]">07:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
