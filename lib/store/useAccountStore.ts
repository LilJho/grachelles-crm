import { create } from "zustand";
import { BaseStoreState } from "types/BaseStore";
import { UsersRecord, UsersResponse } from "types/pocketbase-types";
import { pb } from "lib/database/pocketbase";
import { BaseRecord } from "types/BaseRecord";
import { Branch } from "./useBranchStore";
import { Employee } from "./useEmployeeStore";

type AccountCreateData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  branch: Array<string>;
};

type AccountUpdateInfoData = {
  name: string;
  username: string;
};

type AccountUpdatePasswordData = {
  password: string;
  passwordConfirm: string;
};

interface Account extends BaseRecord {
  avatar: string;
  branch: Array<string>;
  emailVisibility: boolean;
  employee_data: string;
  name: string;
  roles: Array<string>;
  username: string;
  verified: boolean;
  expand: {
    branch?: Branch;
    employee_data?: Employee;
  };
}

export interface AccountStore extends BaseStoreState {
  accounts: Array<Account>;
  createAccount: (data: AccountCreateData) => Promise<void>;
  getAccounts: () => Promise<void>;
  updateAccountInfo: (id: string, data: AccountUpdateInfoData) => Promise<void>;
  updateAccountPassword: (
    id: string,
    data: AccountUpdatePasswordData
  ) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

const useAccountStore = create<AccountStore>((set) => ({
  accounts: [],
  error: null,
  isLoading: false,
  success: false,
  createAccount: async (data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("users").create({
        ...data,
        roles: ["admin"],
      });

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
  getAccounts: async () => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      const records = await pb.collection("users").getFullList({
        sort: "-created",
        expand: "branch,employee_data",
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
  updateAccountInfo: async (id, data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("users").update(id, data);

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
  updateAccountPassword: async (id, data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("users").update(id, data);

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
  deleteAccount: async (id: string) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("users").delete(id);

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

export default useAccountStore;
