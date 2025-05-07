import back from "../images/return.png";
import down from "../images/downfall.png";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useEffect } from "react";
import { categoryMapping } from "../components/Dropdown";

const History = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const token = localStorage.getItem("token");
  const [showEditModal, setShowEditModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchTransactions();
    }
  }, [token, navigate]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  };
  const handleDelete = async () => {
    if (!selectedTransaction) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/transactions/${selectedTransaction.transaction_id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        // Remove the deleted transaction from the state
        setTransactions((prev) =>
          prev.filter(
            (tx) => tx.transaction_id !== selectedTransaction.transaction_id
          )
        );
        setSelectedTransaction(null); // Close the modal
      } else {
        console.error("Failed to delete transaction");
      }
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };
  const handleEdit = async (updatedFields) => {
    if (!selectedTransaction) return;

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
        const updatedTx = await res.json();

        setTransactions((prev) =>
          prev.map((tx) =>
            tx.transaction_id === updatedTx.transaction_id ? updatedTx : tx
          )
        );

        setSelectedTransaction(null);
      } else {
        console.error("Failed to edit transaction");
      }
    } catch (error) {
      console.error("Error editing transaction:", error);
    }
  };

  const backSign = (e) => {
    e.preventDefault();
    navigate("/dash");
  };

  const handleItemClick = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const getDateLabel = (dateStr) => {
    const today = new Date();
    const date = new Date(dateStr);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const todayStr = today.toDateString();
    const yesterdayStr = yesterday.toDateString();
    const txStr = date.toDateString();

    if (txStr === todayStr) return "Today";
    if (txStr === yesterdayStr) return "Yesterday";
    return "Past";
  };

  const renderTransactionsByDay = (label) => {
    const filtered = transactions.filter((t) => getDateLabel(t.date) === label);

    return filtered.map((item) => {
      const map = categoryMapping[item.category.toLowerCase()];
      const icon = map?.icon;
      const bgColor = map?.bgColor;
      const textColor = item.type === "income" ? "#42AB39" : "#FD3C4A";

      return (
        <div
          key={item.transaction_id}
          className="flex items-center justify-between bg-[#FCFCFC] p-4 rounded-[24px] w-[335px] h-[89px] mx-[20px] mb-[6px] cursor-pointer"
          onClick={() => handleItemClick({ ...item, icon, bgColor, textColor })}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-[60px] h-[60px] rounded-[16px] flex items-center justify-center"
              style={{ backgroundColor: bgColor }}
            >
              <img
                src={icon}
                className="w-10 h-10 object-contain"
                alt={item.category}
              />
            </div>
            <div>
              <p className="font-medium text-[16px] mb-[12px]">
                {map?.label || item.category}
              </p>
              <p className="text-[#91919F] text-[13px]">{item.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className="text-[16px] font-semibold mb-[12px]"
              style={{ color: textColor }}
            >
              {item.type === "income"
                ? `+ Rp ${item.amount.toLocaleString("id-ID")}`
                : `- Rp ${item.amount.toLocaleString("id-ID")}`}
            </p>
            <p className="text-[#91919F] text-[13px]">
              {new Date(item.date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        </div>
      );
    });
  };

  if (!token) return null;

  return (
    <div className="w-[100vw] min-h-[812px]">
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
                <img src={down} className="mr-[6px] my-2" alt="Month" />
              </div>
              <p>October</p>
            </button>
          </span>
        </div>
      </div>

      {/* Sections */}
      {["Today", "Yesterday", "Past"].map((label) => (
        <React.Fragment key={label}>
          <div className="w-full mt-[20px] mx-[20px]">
            <p className="font-semibold text-[18px] mb-[8px]">{label}</p>
          </div>
          <div className="flex flex-col">{renderTransactionsByDay(label)}</div>
        </React.Fragment>
      ))}

      {/* Transaction Detail Modal */}
      {selectedTransaction && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-end">
          <div
            className="w-[375px] h-[650px] rounded-t-[32px] relative"
            style={{ backgroundColor: selectedTransaction.bgColor }}
          >
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
                <img
                  src={selectedTransaction.icon}
                  className="w-10 h-10"
                  alt="Category"
                />
              </div>
              <p className="ml-[14px] font-semibold text-[24px]">
                {selectedTransaction.category}
              </p>
            </div>

            {/* Amount */}
            <div
              className="mt-[12px] ml-[16px] font-semibold text-[40px]"
              style={{ color: selectedTransaction.textColor }}
            >
              {selectedTransaction.type === "income"
                ? `+Rp ${selectedTransaction.amount * 1000}`
                : `-Rp ${selectedTransaction.amount * 1000}`}
            </div>

            {/* White Sheet */}
            <div className="absolute bottom-0 z-10 bg-white w-full h-[480px] rounded-t-[32px] flex flex-col">
              <div className="flex w-[343px] h-[74px] border border-[#F1F1FA] rounded-[16px] mt-[23px] mx-auto items-center">
                <div className="ml-[14px] font-[400]">
                  {selectedTransaction.description}
                </div>
              </div>
              <div className="flex w-[343px] h-[74px] border border-[#F1F1FA] rounded-[16px] mt-[9px] mx-auto items-center">
                <div className="ml-[14px] font-[400]">
                  {new Date(selectedTransaction.date).toLocaleString()}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex w-full mt-auto mb-6 px-4 justify-between">
                <button
                  className="w-[160px] h-[56px] rounded-[16px] bg-[#FCAC12] text-white font-semibold text-[18px]"
                  onClick={() => {
                    setFormData({
                      amount: selectedTransaction.amount,
                      description: selectedTransaction.description,
                      date: selectedTransaction.date.slice(0, 10),
                      category: selectedTransaction.category,
                    });
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="w-[160px] h-[56px] border-2 border-[#FA2F34] text-[#FA2F34] rounded-[16px] font-semibold text-[18px]"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-[375px]">
            <h2 className="text-xl font-semibold mb-4">Edit Transaction</h2>
            {/* <label>
              Amount
              <input
                type="number"
                placeholder="Rp ..."
                value={formData.amount}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, amount: e.target.value }))
                }
                className="w-full border rounded p-2 mb-3"
              />
            </label> */}
            <label>
              Amount
              <input
                type="text"
                placeholder="Rp ..."
                value={
                  formData.amount
                    ? `Rp ${Number(formData.amount).toLocaleString("id-ID")}`
                    : ""
                }
                onChange={(e) => {
                  const raw = e.target.value.replace(/[^\d]/g, ""); // Remove non-digit characters
                  setFormData((f) => ({
                    ...f,
                    amount: raw ? parseInt(raw, 10) : "",
                  }));
                }}
                className="w-full border rounded p-2 mb-3"
              />
            </label>
            <label>
              Description
              <input
                type="text"
                value={formData.description}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, description: e.target.value }))
                }
                className="w-full border rounded p-2 mb-3"
              />
            </label>
            <label>
              Date
              <input
                type="date"
                value={formData.date}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, date: e.target.value }))
                }
                className="w-full border rounded p-2 mb-3"
              />
            </label>
            <label>
              Category
              <select
                value={formData.category}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, category: e.target.value }))
                }
                className="w-full border rounded p-2 mb-3"
              >
                <option value="">-- Select Category --</option>

                {selectedTransaction?.type === "expense" ? (
                  <>
                    <option value="shopping">Shopping</option>
                    <option value="food">Food</option>
                    <option value="subscription">Subscription</option>
                    <option value="transportation">Transportation</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="other">Other</option>
                  </>
                ) : (
                  <>
                    <option value="salary">Salary</option>
                    <option value="pocket money">Pocket Money</option>
                    <option value="other">Other</option>
                  </>
                )}
              </select>
            </label>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => {
                  const numericAmount = parseInt(
                    String(formData.amount).replace(/\./g, ""),
                    10
                  );
                  handleEdit({
                    ...formData,
                    amount: numericAmount,
                  });
                  setShowEditModal(false);
                }}
                className="px-4 py-2 w-24 bg-[#42AB39] text-white rounded"
              >
                Save
              </button>

              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 w-24 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default History;
