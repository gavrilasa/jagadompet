import React from "react";
import back from "../images/return.png";
import shop from "../images/shopbag.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransactionDetailPage = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteClick = () => {
    setShowPopup(true);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handleConfirmDelete = (e) => {
    // Aksi logout beneran taruh di sini
    e.preventDefault();
    navigate("/");
  };

  const navigate = useNavigate();
  const backSign = (e) => {
    e.preventDefault();
    navigate("/history");
  };

  return (
    <div className="w-full h-full absolute bg-[#FCEED4]">
      {/* Header with Back Button */}
      <div className="w-[375px] h-[64px] mt-[44px] flex items-center relative">
        <div className="w-[337px] h-[40px] flex items-center justify-between mx-[20px]">
          {/* Back button */}
          <span className="absolute left-[20px] flex items-center justify-center" onClick={backSign}>
            <div className="w-[32px] h-[32px] flex items-center justify-center">
              <img src={back} alt="Back" className="w-[24px]  object-contain" />
            </div>
          </span>

          {/* October Button */}
          <span className="flex items-center justify-center w-full">
            <p className="font-semibold text-[18px] text-[#292B2D]">Detail</p>
          </span>
        </div>
      </div>
      <div className="flex mt-[14px] ml-[16px]">
        <img src={shop} />
        <p className="flex ml-[14px] items-center font-semibold text-[24px]">
          Shopping
        </p>
      </div>
      <div className="mt-[12px] ml-[16px] font-semibold text-[40px] text-[#FD3C4A]">
        -Rp 12.000
      </div>
      <div className="absolute z-10 flex bg-white w-[375px] h-[564px] mt-[23px] rounded-t-[32px] flex-col">
        <div className="flex w-[343px] h-[74px] border-[1px] border-[#F1F1FA] rounded-[16px] mt-[23px] mx-[16px] items-center">
          <div className="flex ml-[14px] font-[400]">Sabun Mandi</div>
        </div>
        <div className="flex w-[343px] h-[74px] border-[1px] border-[#F1F1FA] rounded-[16px] mt-[9px] mx-[16px] items-center">
          <div className="flex ml-[14px] font-[400]">12 August 2004</div>
        </div>

        <div className="flex w-full h-[74px]  mt-[263px] items-center">
          <div className="flex w-[160px] h-[56px]  ml-[16px] rounded-[16px] bg-[#FCAC12] items-center justify-center text-[18px] text-[#FCFCFC] font-semibold">
            Edit
          </div>
          <div
            className="flex w-[160px] h-[56px] border-[#FA2F34] border-2 ml-[23px] rounded-[16px] items-center justify-center text-[18px] text-[#FA2F34] font-semibold"
            onClick={handleDeleteClick}
          >
            {" "}
            Delete{" "}
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-50">
          <div className="bg-white rounded-[21.7px] w-[340px] h-[174.21px] text-center">
            <div className="m-[13px]">
              <div className="flex flex-col h-[80px]">
                <div className="text-[21.7px] font-semibold mb-2 mt-[13px]">
                  Delete This Transaction?
                </div>
                <p className="text-[14.47px] text-[#91919F] font-medium mb-6 ">
                  Are you sure you want to delete this?
                </p>
              </div>
              <div className="flex justify-between mt-[12px]">
                <button
                  onClick={handleCancel}
                  className="bg-red-100 text-red-500 font-semibold rounded-[15px] w-[148px] h-[50px]"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-500 text-white font-semibold rounded-[15px] w-[148px] h-[50px]"
                >
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

export default TransactionDetailPage;
