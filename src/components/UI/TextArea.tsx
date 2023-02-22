import React, { FormEvent, ChangeEvent, FC } from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

type ITextAreaProps = {
  label?: string;
  placeholder?: string;
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
  required?: boolean;
  error?: string;
  size?: "default" | "sm" | "lg";
  fullWidth?: boolean;
  onBlur?: (event: FormEvent<HTMLTextAreaElement>) => void;
  rows?: number;
};

const TextArea: FC<ITextAreaProps> = ({
  label = "",
  placeholder = "Enter your text here...",
  onChange,
  value,
  required = false,
  error = "",
  size,
  fullWidth = false,
  onBlur,
  rows = 10,
}) => {
  return (
    <div
      className={`relative flex flex-col ${TextSize(size)} ${
        fullWidth && "w-full"
      }`}
    >
      <Label required={required}>{label}</Label>
      <textarea
        className={`flex-1 w-full focus:outline-none border ${
          error !== "" ? "border-red-600" : "border-gray-300"
        } focus:border-primary-600 ${TextFieldSize(size)}
    `}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={rows}
      ></textarea>
      {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default TextArea;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const TextFieldSize = (size = "default") =>
  ({
    default: "py-2.5 px-4 rounded-md",
    sm: "px-3.5 py-2 rounded-md",
    lg: "px-4 py-2.5 rounded-md",
  }[size]);
