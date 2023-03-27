import { create } from "zustand";
import { BaseStoreState } from "types/BaseStore";
import { UsersRecord, UsersResponse } from "types/pocketbase-types";
import { pb } from "lib/database/pocketbase";
import { BaseRecord } from "types/BaseRecord";

type ExpenseData = {
  name: string;
  quantity: number;
  price: number;
  total_price: number;
  user: string;
};

export interface Expense extends BaseRecord {
  name: string;
  quantity: number;
  price: number;
  total_price: number;
  user: string;
}

export interface ExpenseStore extends BaseStoreState {
  expenses: Array<Expense>;
  createExpense: (data: ExpenseData) => Promise<void>;
  getExpenses: () => Promise<void>;
  updateExpense: (id: string, data: ExpenseData) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  error: null,
  isLoading: false,
  success: false,
  createExpense: async (data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("expenses").create(data);

      set({
        error: null,
        success: true,
      });
    } catch (error) {
      set({ error });
    } finally {
      set({
        isLoading: true,
      });
    }
  },
  getExpenses: async () => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      const records = await pb.collection("expenses").getFullList({
        sort: "-created",
      });
      console.log(records);
      set({
        error: null,
        success: true,
      });
    } catch (error) {
      console.log(error);
      set({ error });
    } finally {
      set({
        isLoading: true,
      });
    }
  },
  updateExpense: async (id, data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("expenses").update(id, data);

      set({
        error: null,
        success: true,
      });
    } catch (error) {
      console.log(error);
      set({ error });
    } finally {
      set({
        isLoading: true,
      });
    }
  },
  deleteExpense: async (id: string) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("expenses").delete(id);

      set({
        error: null,
        success: true,
      });
    } catch (error) {
      console.log(error);
      set({ error });
    } finally {
      set({
        isLoading: true,
      });
    }
  },
}));

export default useExpenseStore;
