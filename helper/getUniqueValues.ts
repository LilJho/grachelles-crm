import { arraySorter } from "./arraySorter";

export const getUniqueValues = (
  data: Array<{ [key: string]: any }> | undefined,
  key: string,
  sortBy?: string[]
) => {
  const uniqueData = data
    ? Array.from(new Set(data.map((product) => product[key])))
    : [];
  return sortBy ? arraySorter(uniqueData, sortBy) : uniqueData;
};
