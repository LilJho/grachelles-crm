import React, { FC } from "react";

interface ILabelProps {
  children: React.ReactNode;
  required?: boolean;
}

const Label: FC<ILabelProps> = ({ children, required }) => {
  return (
    <label
      className={`font-medium ${
        children !== "" ? "mb-[2px]" : ""
      } flex items-center gap-1.5`}
    >
      {children}
      {required && (
        <span className=" text-rose-400 font-bold ml-[.15rem]">*</span>
      )}
    </label>
  );
};

export default Label;
