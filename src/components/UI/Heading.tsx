import React from "react";
import { FC } from "react";

type Props = {
  children: string;
};

const Heading: FC<Props> = ({ children }) => {
  const split_word = children.split(" ");

  const checkStringLength = () => {
    if (split_word.length > 2) {
      const join = split_word[0] + " " + split_word[1];
      return [join, split_word[2]];
    }
    return split_word;
  };

  return (
    <h1 className="text-xl md:text-2xl font-semibold">
      {checkStringLength()[0] + " "}
      <span className="font-normal">{checkStringLength()[1]}</span>
    </h1>
  );
};

export default Heading;
