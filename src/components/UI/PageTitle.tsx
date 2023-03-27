import React from "react";

interface PageTitleProps {
  title: string;
  children: JSX.Element[] | JSX.Element;
}

const PageTitle = ({ title = "", children }: PageTitleProps) => {
  const split_word = title.split(" ");

  const checkStringLength = () => {
    if (split_word.length > 2) {
      const join = split_word[0] + " " + split_word[1];
      return [join, split_word[2]];
    }
    return split_word;
  };

  return (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold">
        {checkStringLength()[0] + " "}
        <span className="font-normal">{checkStringLength()[1]}</span>
      </h2>
      <>{children}</>
    </div>
  );
};

export default PageTitle;
