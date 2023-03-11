import React from "react";

type Props = {
  children: any;
  absolute?: boolean;
};

const ErrorMessage = ({ children, absolute = false }: Props) => {
  return (
    <div
      className={`${
        absolute ? "absolute -bottom-6 left-0 " : ""
      } text-sm text-red-400 mt-1`}
    >
      {children}
    </div>
  );
};

export default ErrorMessage;
