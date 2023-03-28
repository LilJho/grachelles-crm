import { create } from "zustand";

const useVariantStore = create((set) => ({
  selectedRows: [],
  setSelectedRows: (selectedRows: any[]) => set({ selectedRows }),
}));

export default useVariantStore;
