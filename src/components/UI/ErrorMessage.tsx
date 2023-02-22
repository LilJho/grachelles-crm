import React, { FC } from "react";

interface IErrorMessageProps {
  children: React.ReactNode;
  absolute?: boolean;
}

const ErrorMessage: FC<IErrorMessageProps> = ({
  children,
  absolute = false,
}) => {
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
