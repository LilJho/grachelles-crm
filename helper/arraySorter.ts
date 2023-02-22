export const arraySorter = (data: string[], letters: string[]) => {
  const sortedWords = data.sort((a, b) => {
    // Find the first position where the letters of the two words differ
    const pos = a.split("").findIndex((char, index) => char !== b[index]);

    // If the two words have different letters at the first position, compare the positions of those letters in the letters array
    if (pos !== -1) {
      return letters.indexOf(a[pos]) - letters.indexOf(b[pos]);
    }

    // If the two words have the same letters in the positions compared, compare the length of the two words
    return a.length - b.length;
  });

  return sortedWords;
};
