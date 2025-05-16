import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import salary from "../images/category.png";
import pocket from "../images/category2.png";
import other from "../images/category3.png";
import shopping from "../images/shopcat.png";
import food from "../images/foodcat.png";
import bills from "../images/billscat.png";
import transport from "../images/transportcat.png";
import game from "../images/entcat.png";
import Calendar from "react-calendar";
import downgray from "../images/greyarrow.png";
import "react-calendar/dist/Calendar.css";
import calendar from "../images/calender.png";

const EXPENSE_CATEGORIES = [
  { value: "shopping", label: "Shopping", icon: shopping, bg: "#FCEED4" },
  { value: "food", label: "Food", icon: food, bg: "#FDD5D7" },
  {
    value: "subscription",
    label: "Subscription",
    icon: bills,
    bg: "#EEE5FF",
  },
  {
    value: "transportation",
    label: "Transportation",
    icon: transport,
    bg: "#D9EBFF",
  },
  {
    value: "entertainment",
    label: "Entertainment",
    icon: game,
    bg: "#FFE0CB",
  },
  { value: "other", label: "Other", icon: other, bg: "#E8E8E8" },
];

const INCOME_CATEGORIES = [
  { value: "salary", label: "Salary", icon: salary, bg: "#CFFAEA" },
  {
    value: "pocketmoney",
    label: "Pocket Money",
    icon: pocket,
    bg: "#FFF8D8",
  },
  { value: "other", label: "Other", icon: other, bg: "#E8E8E8" },
];

const CategoryDropdown = ({ value, onChange, options }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  const selected = options.find((o) => o.value === value) || options[0];

  return (
    <div
      className="relative w-[343px] flex h-[74px] border-[1px] text-[#91919F] border-[#F1F1FA] rounded-[16px]  items-center cursor-pointer"
      ref={ref}
    >
      <div
        className={`flex items-center justify-between h-full w-full rounded-[16px] cursor-pointer`}
        style={{ backgroundColor: selected.bg }}
        onClick={() => setOpen((o) => !o)}
      >
        <div className={`flex items-center ${selected.bg}`}>
          <img
            src={selected.icon}
            alt=""
            className="w-10 h-10 mr-2 ml-[14px]"
          />
          <span className="font-[400] text-[#91919F]">{selected.label}</span>
        </div>
        <img src={downgray} alt="" className="w-[32px] h-[32px] mr-[14px]" />
      </div>
      {open && (
        <div className="absolute z-20 mt-1 w-full bg-white border border-[#F1F1FA] rounded-[16px] shadow-lg max-h-60 overflow-auto">
          {options.map((opt) => (
            <div
              key={opt.value}
              className="flex items-center p-4 cursor-pointer hover:bg-gray-100"
              style={{ backgroundColor: opt.bg }}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              <img src={opt.icon} alt="" className="w-6 h-6 mr-2" />
              <span className="font-[400] text-black">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const EditTransactionPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { transaction: selectedTransaction } = location.state || {};
  const token = localStorage.getItem("token");
  const [showCalendar, setShowCalendar] = useState(false);

  const formatToLocalDate = (dateString) => {
    const d = new Date(dateString);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    amount: selectedTransaction?.amount || 0,
    description: selectedTransaction?.description || "",
    category: selectedTransaction?.category?.toLowerCase() || "",
    date: selectedTransaction?.date
      ? formatToLocalDate(selectedTransaction.date)
      : "",
    type: selectedTransaction?.type || "expense",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [amount, setAmount] = useState("");

  useEffect(
    () => {
      if (!token) {
        navigate("/login");
      }
      setAmount(
        formData.amount ? Number(formData.amount).toLocaleString("id-ID") : ""
      );
    },
    [(token, navigate)],
    [formData.amount]
  );

  if (!token) {
    return null;
  }

  const handleAmountClick = () => {
    setIsEditing(true);
    const formatted = Number(formData.amount || 0).toLocaleString("id-ID");
    setAmount(formatted);
  };

  const handleAmountChange = (e) => {
    let value = e.target.value.replace(/[^\d]/g, "");
    let formattedValue = value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setAmount(formattedValue);
  };

  const handleAmountBlur = () => {
    setIsEditing(false);
    const numeric = parseInt(amount.replace(/\./g, ""), 10) || 0;
    setFormData((f) => ({ ...f, amount: numeric }));
  };

  const handleEdit = async () => {
    if (!selectedTransaction) return;

    const updatedFields = {
      ...formData,
      amount: parseInt(amount.replace(/\./g, ""), 10),
    };

    const fullUpdate = {
      ...selectedTransaction,
      ...updatedFields,
    };

    try {
      const res = await fetch(
        `http://localhost:5000/api/transactions/${selectedTransaction.transaction_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(fullUpdate),
        }
      );

      if (res.ok) {
        console.log("Transaction updated");
        navigate(-1); // go back after saving
      } else {
        console.error("Failed to update transaction");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  const options =
    formData.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleDateClick = () => setShowCalendar((prev) => !prev);
  const handleDateChange = (date) => {
    if (date > new Date()) {
      setSelectedDate(new Date());
    } else {
      setFormData((f) => ({ ...f, date: formatToLocalDate(date) }));
    }

    setShowCalendar(false);
  };

  return (
    <div
      className={`w-full min-h-screen  flex flex-col relative overflow-hidden ${
        formData.type === "income" ? "bg-[#00C153]" : "bg-red-500"
      }`}
    >
      {/* Header */}
      <div className="w-full h-[64px] mt-[44px] flex items-center justify-center relative">
        <p className="font-semibold text-[18px] text-white">Edit</p>
      </div>
      <div className="flex flex-col mt-[40px] px-[26px]">
        <p className="font-semibold text-[18px] leading-[100%] text-white/80">
          How much?
        </p>
        <div
          className="text-4xl text-white font-bold cursor-pointer mt-3"
          onClick={handleAmountClick}
        >
          {isEditing ? (
            <input
              placeholder="Rp ..."
              type="text"
              value={amount}
              onChange={handleAmountChange}
              onBlur={handleAmountBlur}
              autoFocus
              className="bg-transparent border-none  text-white outline-none w-full"
            />
          ) : (
            `Rp ${amount || "0"}`
          )}
        </div>
      </div>

      {/* Form */}
      <div
        className={`absolute w-full bg-white rounded-t-[32px] mt-[250px] flex flex-col items-center transition-all duration-300 h-[562px]
        }`}
      >
        {/* Category */}

        <label className="block mb-4 mt-8">
          <span className="text-xl font-medium block mb-2">Category</span>
          <CategoryDropdown
            value={formData.category}
            onChange={(val) => setFormData((f) => ({ ...f, category: val }))}
            options={options}
          />
        </label>

        {/* Description */}
        <label className="block mb-4">
          <span className="text-xl mt-2 block">Description</span>
          <div className="flex w-[343px]  h-[74px] border  text-[#91919F]/200  border-[#F1F1FA] rounded-[16px] items-center">
            <input
              type="text"
              value={formData.description}
              onChange={(e) =>
                setFormData((f) => ({ ...f, description: e.target.value }))
              }
              className="flex ml-[14px] font-[400] border-none outline-none"
            />
          </div>
        </label>

        {/* Date */}
        <label className="block mb-6 relative">
          <span className="text-xl mt-2 font-medium block">Date</span>
          <div
            onClick={handleDateClick}
            className="w-[343px] flex h-[74px] border border-[#F1F1FA] rounded-[16px] text-[#91919F] items-center cursor-pointer"
          >
            <div className="flex ml-[14px] font-[400]">
              {formData.date || "Select date"}
            </div>
            <div className="flex w-[32px] h-[32px] ml-auto mr-[14px] items-center justify-center">
              <img src={calendar} alt="" />
            </div>
          </div>

          {showCalendar && (
            <div className="absolute z-10 mt-[-360px] ml-[-4px]">
              <Calendar
                onChange={handleDateChange}
                value={
                  formData.date
                    ? new Date(formData.date + "T00:00:00")
                    : new Date()
                }
                activeStartDate={new Date()}
                className="shadow-lg rounded-lg overflow-hidden"
              />
            </div>
          )}
        </label>

        {/* Buttons */}
        <div className="flex mt-7">
          <button
            onClick={handleEdit}
            className={`w-38 mr-8 h-14 py-2 rounded-lg text-white font-medium ${
              formData.type === "income" ? "bg-[#00C153]" : "bg-red-500"
            }`}
          >
            Save Changes
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-38 bg-gray-200 text-black py-2 rounded-lg font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionPage;
