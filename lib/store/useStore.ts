import { create } from "zustand";
import createUserSlice from "./slices/createAddToOrdersSlice";
import { IStoreProps } from "types/global-types";
import createAddOnsSlice from "./slices/createAddOnsSlice";
import createProductSelectSlice from "./slices/createProductSelectSlice";

const useStore = create((set) => ({
  ...createUserSlice(set),
  ...createAddOnsSlice(set),
  ...createProductSelectSlice(set),
}));

export default useStore;
