import React from "react";

type Props = {
  title: string;
  description: string;
  total: any;
  name: string;
};

const Card = ({ title, description, total, name }: Props) => {
  const Colors: any = {
    totalDrinks: "bg-[#FF5733]", // Orange red
    totalFood: "bg-[#FF8C00]", // Dark orange
    totalDrinksAndFood: "bg-[#E25822]", // Dark tangerine
    totalDeliveryFee: "bg-[#1976D2]", // Blue
    totalGiveaways: "bg-[#4CAF50]", // Green
    totalCashOnline: "bg-[#9C27B0]", // Purple
    totalCashFoodPanda: "bg-[#FFC107]", // Amber
    totalCashOnHand: "bg-[#795548]", // Brown
    totalSales: "bg-[#00C853]", // Green
    totalIncome: "bg-[#FF5722]", // Deep orange
    totalExpenses: "bg-[#2f97d2]",
    // totalIncome: "bg-[#2f97d2]",
  };

  return (
    <div
      className={`inline-flex flex-col px-4 py-5 lg:px-6 lg:py-8 rounded-lg w-full lg:w-72 ${Colors[name]} text-white`}
    >
      <h2 className="text-lg lg:text-xl font-medium lg:font-bold">{title}</h2>
      <span className="text-xs lg:text-sm mb-3 lg:mb-0">{description}</span>
      <h1 className="text-xl lg:text-2xl font-semibold lg:font-bold mt-auto lg:mt-4">
        {total}
      </h1>
    </div>
  );
};

export default Card;
