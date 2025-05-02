import React from "react";
import shop from "../images/shopbag.png";
import bill from "../images/bill.png";
import food from "../images/food.png";
import back from "../images/return.png";
import down from "../images/downfall.png";
import transport from "../images/portal.png";
import salary from "../images/salary.png";
import { useNavigate } from "react-router-dom";

const HistoryPage = () => {
  const navigate = useNavigate();
  const backSign = (e) => {
    e.preventDefault();
    navigate("/dash");
  };
  const handleShopping = (e) => {
    e.preventDefault();
    navigate("/edit");
  };
  return (
    <div>
      <div className="w-full min-h-[812px]">
        {/* Header */}
        <div className="w-[375px] h-[64px] mt-[44px] flex items-center relative">
          <div className="w-[337px] h-[40px] flex items-center justify-between mx-[20px]">
            {/* Back button */}
            <span
              className="absolute left-[20px] flex items-center justify-center"
              onClick={backSign}
            >
              <div className="w-[32px] h-[32px] flex items-center justify-center">
                <img
                  src={back}
                  alt="Back"
                  className="w-[24px]  object-contain"
                />
              </div>
            </span>

            {/* October Button */}
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

        {/* Labels for Today and Yesterday */}
        <div className="w-full mt-[20px] mx-[20px]">
          <p className="font-semibold text-[18px] mb-[8px]">Today</p>
        </div>

        {/* List Transactions */}
        <div className="flex flex-col gap-[6px]">
          {/* Transaction 1 */}
          <div
            className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px]  w-[335px] h-[89px] mx-[20px]"
            onClick={handleShopping}
          >
            <div className="flex items-center gap-3">
              <div className="w-[60px] h-[60px] bg-[#FCEED4] rounded-[16px] flex items-center justify-center">
                <img src={shop} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-[12px]">Shopping</p>
                <p className="text-[#91919F] text-[13px]">Buy some grocery</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#FD3C4A] text-[16px] font-semibold mb-[12px]">
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

        {/* Label for Yesterday */}
        <div className="w-full mt-[12px] mx-[20px]">
          <p className="font-semibold text-[18px] mb-[8px]">Yesterday</p>
        </div>

        {/* List Transactions for Yesterday */}
        <div className="flex flex-col gap-[6px]">
          {/* Transaction 4 (Salary) */}
          <div className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px]  w-[335px] h-[89px] mx-[20px]">
            <div className="flex items-center gap-3">
              {/* No image for Salary */}
              <div className="w-[60px] h-[60px] bg-[#CFFAEA] rounded-[16px] flex items-center justify-center">
                <img src={salary} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-[12px]">Salary</p>
                <p className="text-[#91919F] text-[13px]">Salary for July</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#42AB39] text-[16px] font-semibold mb-[12px]">
                + $5000
              </p>
              <p className="text-[#91919F] text-[13px]">04:30 PM</p>
            </div>
          </div>

          {/* Transaction 5 (Transportation) */}
          <div className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px]  w-[335px] h-[89px] mx-[20px]">
            <div className="flex items-center gap-3">
              {/* No image for Transportation */}
              <div className="w-[60px] h-[60px] bg-[#BDDCFF] rounded-[16px] flex items-center justify-center">
                <img src={transport} className="w-10 h-10 object-contain" />
              </div>
              <div>
                <p className="font-medium text-[16px] mb-[12px]">
                  Transportation
                </p>
                <p className="text-[#91919F] text-[13px]">Charging Tesla</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[#FD3C4A] text-[16px] font-semibold mb-[12px]">
                - $18
              </p>
              <p className="text-[#91919F] text-[13px]">08:30 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
