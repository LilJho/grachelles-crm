import React, { FormEvent } from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

type Props = {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: FormEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  error?: string;
  size?: string;
  fullWidth?: boolean;
  onBlur?: () => void;
  setErrors?: () => void;
  rows?: number;
};

const TextArea = ({
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
}: Props) => {
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
