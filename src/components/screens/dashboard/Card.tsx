import React from "react";

type Props = {
  title: string;
  description: string;
  total: any;
  name: string;
};

const Card = ({ title, description, total, name }: Props) => {
  const Colors: any = {
    drinks: "bg-[#D0924B]",
    food: "bg-[#DCC9D0]",
    drinkANDfood: "bg-[#9F555C]",
    delivery: "bg-[#3F5871]",
    claims: "bg-[#554D60]",
    giveaways: "bg-[#5B6B6E]",
    totalGiveaways: "bg-[#533C5E]",
    totalExpenses: "bg-[#E39679]",
    onlinePayment: "bg-[#F7B844]",
    cash: "bg-[#f47c2c]",
    totalSales: "bg-[#2eba30]",
    totalIncome: "bg-[#2f97d2]",
  };

  return (
    <div
      className={`inline-flex flex-col px-4 py-5 lg:px-6 lg:py-8 rounded-lg w-full lg:w-72 ${Colors[name]} text-white`}
    >
      <h2 className="text-lg lg:text-xl font-medium lg:font-bold">{title}</h2>
      <span className="text-xs lg:text-sm mb-3 lg:mb-0">{description}</span>
      <h1 className="text-xl lg:text-2xl font-semibold lg:font-bold mt-auto lg:mt-4">
        {total[name]}
      </h1>
    </div>
  );
};

export default Card;
