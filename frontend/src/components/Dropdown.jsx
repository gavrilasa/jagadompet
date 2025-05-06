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
  shopping: { icon: shop, bgColor: "#FCEED4" },
  subscription: { icon: bill, bgColor: "#EEE5FF" },
  food: { label:"Food & Beverages", icon: food, bgColor: "#FDD5D7" },
  salary: { icon: salary, bgColor: "#CFFAEA" },
  transportation: { icon: transport, bgColor: "#BDDCFF" },
  entertainment: { icon: game, bgColor: "#FFE0CB" },
  pocketmoney: { label: "Pocket Money", icon: pocket, bgColor: "#FFF8D8"},
  other: { icon: other, bgColor: "#E8E8E8" },
};
