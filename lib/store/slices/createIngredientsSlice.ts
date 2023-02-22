const createIngredientsSlice = (set: any) => ({
  allIngredients: [] as string[],
  setAllIngredients: (allIngredients: string[]) => set({ allIngredients }),
});

export default createIngredientsSlice;
