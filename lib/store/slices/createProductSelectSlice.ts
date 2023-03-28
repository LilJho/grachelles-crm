const createProductSelectSlice = (set: any) => ({
  selectedRows: [],
  setSelectedRows: (selectedRows: any[]) => set({ selectedRows }),
});

export default createProductSelectSlice;
