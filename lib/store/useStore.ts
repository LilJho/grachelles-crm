import { create } from "zustand";
import createUserSlice from "./slices/createAddToOrdersSlice";
import { IStoreProps } from "types/global-types";
import createAddOnsSlice from "./slices/createAddOnsSlice";
import createIngredientsSlice from "./slices/createIngredientsSlice";

const useStore = create<IStoreProps>((set) => ({
  data: {},
  ...createUserSlice(set),
  ...createAddOnsSlice(set),
  ...createIngredientsSlice(set),
}));

export default useStore;
