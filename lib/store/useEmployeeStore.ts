import { create } from "zustand";
import { BaseStoreState } from "types/BaseStore";
import { UsersRecord, UsersResponse } from "types/pocketbase-types";
import { pb } from "lib/database/pocketbase";
import { BaseRecord } from "types/BaseRecord";

type EmployeeData = {
  name: string;
  gender: string;
  birthday: string;
  contact: string;
  address: string;
};

export interface Employee extends BaseRecord {
  name: string;
  gender: string;
  birthday: string;
  contact: string;
  address: string;
}

export interface EmployeeStore extends BaseStoreState {
  employee: Array<Employee>;
  createEmployee: (data: EmployeeData) => Promise<void>;
  getEmployees: () => Promise<void>;
  updateEmployee: (id: string, data: EmployeeData) => Promise<void>;
}

const useEmployeeStore = create<EmployeeStore>((set) => ({
  employee: [],
  error: null,
  isLoading: false,
  success: false,
  createEmployee: async (data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("employee").create(data);

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
  getEmployees: async () => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      const records = await pb.collection("employee").getFullList({
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
  updateEmployee: async (id, data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("employee").update(id, data);

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
  deleteEmployee: async (id: string) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("employee").delete(id);

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

export default useEmployeeStore;
