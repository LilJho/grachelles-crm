import { AddOnsRecordExtend } from "types/pocketbase-types";

const createAddOnsSlice = (set: any) => ({
  addOnsList: [] as AddOnsRecordExtend[],
  setAddOnsList: (addOnsList: AddOnsRecordExtend[]) => set({ addOnsList }),
});

export default createAddOnsSlice;
