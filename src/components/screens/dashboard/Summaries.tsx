import React from "react";
import Card from "./Card";

interface ISummaryProps {
  data: {
    totalDrinks: number;
    totalFood: number;
    totalDrinksAndFood: number;
    totalDeliveryFee: number;
    totalGiveaways: number;
    totalCashOnline: number;
    totalCashFoodPanda: number;
    totalCashOnHand: number;
    totalSales: number;
    totalIncome: number;
    totalExpenses: number;
  };
}

const Summaries = ({ data }: ISummaryProps) => {
  console.log({ data });
  return (
    <div className="flex gap-4 flex-wrap">
      <Card
        title="Drinks"
        description="Total Drinks Sale"
        total={data.totalDrinks}
        name="totalDrinks"
      />
      <Card
        title="Food"
        description="Total Food Sale"
        total={data.totalFood}
        name="totalFood"
      />
      <Card
        title="Drinks and Food"
        description="Total Drinks and Food Sale"
        total={data.totalDrinksAndFood}
        name="totalDrinksAndFood"
      />
      <Card
        title="Delivery Fee"
        description="Total Delivery Fee"
        total={`₱ ${data.totalDeliveryFee.toFixed(2)}`}
        name="totalDeliveryFee"
      />
      <Card
        title="Giveaways"
        description="Total Giveaways"
        total={data.totalGiveaways}
        name="totalGiveaways"
      />
      <Card
        title="Online"
        description="Total Online Payment"
        total={`₱ ${data.totalCashOnline.toFixed(2)}`}
        name="totalCashOnline"
      />
      <Card
        title="FoodPanda"
        description="Total Food Panda Payment"
        total={`₱ ${data.totalCashFoodPanda.toFixed(2)}`}
        name="totalCashFoodPanda"
      />
      <Card
        title="Cash On Hand"
        description="Total Cash On Hand"
        total={`₱ ${data.totalCashOnHand.toFixed(2)}`}
        name="totalCashOnHand"
      />
      <Card
        title="Total Sales"
        description="Total Sales"
        total={`₱ ${data.totalSales.toFixed(2)}`}
        name="totalSales"
      />
      <Card
        title="Total Expenses"
        description="Total Expenses"
        total={`₱ ${data.totalExpenses.toFixed(2)}`}
        name="totalExpenses"
      />
      <Card
        title="Total Income"
        description="Total Income"
        total={`₱ ${data.totalIncome.toFixed(2)}`}
        name="totalIncome"
      />
    </div>
  );
};

export default Summaries;
