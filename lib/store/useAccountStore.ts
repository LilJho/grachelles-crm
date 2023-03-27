import { create } from "zustand";
import { BaseStoreState } from "types/BaseStore";
import { UsersRecord, UsersResponse } from "types/pocketbase-types";
import { pb } from "lib/database/pocketbase";

export interface AuthStoreData extends UsersRecord {}

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

export interface AuthStore extends BaseStoreState {
  data?: UsersResponse<unknown>;
  createAccount: (data: AccountCreateData) => Promise<void>;
  getAccounts: () => Promise<void>;
  updateAccountInfo: (id: string, data: AccountUpdateInfoData) => Promise<void>;
  updateAccountPassword: (
    id: string,
    data: AccountUpdatePasswordData
  ) => Promise<void>;
  deleteAccount: (id: string) => Promise<void>;
}

const useAccountStore = create<AuthStore>((set) => ({
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
  updateAccountInfo: async (id: string, data: AccountUpdateInfoData) => {
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
  updateAccountPassword: async (
    id: string,
    data: AccountUpdatePasswordData
  ) => {
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
