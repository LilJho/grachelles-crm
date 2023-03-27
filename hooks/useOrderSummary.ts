import { useEffect, useState } from "react";
import { ExpensesResponse, OrdersResponse } from "types/pocketbase-types";

const useOrderSummary = (
  orders: OrdersResponse[],
  expenses: ExpensesResponse[]
) => {
  const [totalDrinks, setTotalDrinks] = useState(0);
  const [totalFood, setTotalFood] = useState(0);
  const [totalDrinksAndFood, setTotalDrinksAndFood] = useState(0);
  const [totalDeliveryFee, setTotalDeliveryFee] = useState(0);
  const [totalGiveaways, setTotalGiveaways] = useState(0);
  const [totalCashOnline, setTotalCashOnline] = useState(0);
  const [totalCashFoodPanda, setTotalCashFoodPanda] = useState(0);
  const [totalCashOnHand, setTotalCashOnHand] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    let drinks = 0;
    let food = 0;
    let drinksAndFood = 0;
    let deliveryFee = 0;
    let giveaways = 0;
    let cashOnline = 0;
    let cashFoodPanda = 0;
    let cashOnHand = 0;
    let sales = 0;
    let income = 0;
    let totalExpense = 0;

    orders?.forEach((order: any) => {
      drinks += order.total_drinks_count;
      food += order.total_food_count;
      drinksAndFood += order.total_drinks_count + order.total_food_count;
      deliveryFee += order.delivery_fee;
      giveaways += order.payment_method === "giveaway" ? 1 : 0;
      cashOnline += order.payment_method === "online" ? order.total_amount : 0;
      cashFoodPanda +=
        order.payment_method === "food panda" ? order.total_amount : 0;
      cashOnHand += order.payment_method === "cash" ? order.total_amount : 0;
      sales += order.total_amount;
      income += order.total_amount - order.delivery_fee;
    });

    expenses?.forEach((expense) => {
      totalExpense += expense.total_price;
    });

    setTotalDrinks(drinks);
    setTotalFood(food);
    setTotalDrinksAndFood(drinksAndFood);
    setTotalDeliveryFee(deliveryFee);
    setTotalGiveaways(giveaways);
    setTotalCashOnline(cashOnline);
    setTotalCashFoodPanda(cashFoodPanda);
    setTotalCashOnHand(cashOnHand);
    setTotalSales(sales);
    setTotalIncome(income - totalExpense);
    setTotalExpenses(totalExpense);
  }, [expenses, orders]);

  return {
    totalDrinks,
    totalFood,
    totalDrinksAndFood,
    totalDeliveryFee,
    totalGiveaways,
    totalCashOnline,
    totalCashFoodPanda,
    totalCashOnHand,
    totalSales,
    totalIncome,
    totalExpenses,
  };
};

export default useOrderSummary;
