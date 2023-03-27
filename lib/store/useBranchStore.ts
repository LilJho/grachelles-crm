import { create } from "zustand";
import { BaseStoreState } from "types/BaseStore";
import { UsersRecord, UsersResponse } from "types/pocketbase-types";
import { pb } from "lib/database/pocketbase";
import { BaseRecord } from "types/BaseRecord";

type BranchData = {
  name: string;
};

export interface Branch extends BaseRecord {
  name: string;
}

export interface BranchStore extends BaseStoreState {
  branches: Array<Branch>;
  createBranch: (data: BranchData) => Promise<void>;
  getBranches: () => Promise<void>;
  updateBranch: (id: string, data: BranchData) => Promise<void>;
}

const useBranchStore = create<BranchStore>((set) => ({
  branches: [],
  error: null,
  isLoading: false,
  success: false,
  createBranch: async (data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("branches").create(data);

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
  getBranches: async () => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      const records = await pb.collection("branches").getFullList({
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
  updateBranch: async (id, data) => {
    try {
      set({
        isLoading: true,
        success: false,
        error: null,
      });

      await pb.collection("branches").update(id, data);

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

export default useBranchStore;
