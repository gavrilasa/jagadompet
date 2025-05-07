// src/utils/categoryStyles.js
import shop from "../images/shopbag.png";
import bill from "../images/bill.png";
import food from "../images/food.png";
import transport from "../images/portal.png";
import salary from "../images/salary.png";
import game from "../images/entcat.png";
import other from "../images/category3.png";
import pocket from "../images/category2.png";



export const categoryMapping = {
  shopping: { label: "Shopping", icon: shop, bgColor: "#FCEED4" },
  subscription: { label: "Subscription", icon: bill, bgColor: "#EEE5FF" },
  food: { label: "Food", icon: food, bgColor: "#FDD5D7" },
  salary: { label: "Salary", icon: salary, bgColor: "#CFFAEA" },
  transportation: { label: "Transportation", icon: transport, bgColor: "#BDDCFF" },
  entertainment: { label: "Entertainment", icon: game, bgColor: "#FFE0CB" },
  pocketmoney: { label: "Pocket Money", icon: pocket, bgColor: "#FFF8D8" },
  other: { label: "Other", icon: other, bgColor: "#E8E8E8" },
};

