export const getFirstLetter = (str: string) => {
  return str
    .split(" ")
    .map((word) => word[0])
    .join("");
};
