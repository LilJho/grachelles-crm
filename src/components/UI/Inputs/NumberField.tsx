import React, { SetStateAction, useState } from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";

interface INumberFieldProps {
  value: string | number;
  onChange: (
    value:
      | string
      | number
      | React.ChangeEvent<HTMLInputElement>
      | SetStateAction<number>
  ) => void;
  format?: string;
  inputLength?: number;
  placeholder?: string;
  required?: boolean;
  error?: string;
  size?: "default" | "sm" | "lg" | any;
  fullWidth?: boolean;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  absolute?: boolean;
  rightIcon?: string;
  leftIcon?: string;
  readOnly?: boolean;
  className?: string;
  description?: string;
  label?: string;
}

const NumberField = ({
  value,
  onChange,
  format,
  inputLength,
  placeholder,
  required = false,
  error = "",
  size,
  fullWidth = false,
  onBlur,
  absolute = false,
  rightIcon = "",
  leftIcon = "",
  className = "",
  description = "",
  label,
}: INumberFieldProps) => {
  const [internalValue, setInternalValue] = useState<number | string>(
    value || ""
  );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue, selectionStart } = event.target;
    // Remove all non-numeric characters from the input value
    const numericValue = inputValue.replace(/\D/g, "");
    // Determine the maximum length of the input value based on the format
    const maxLength = format
      ? Math.min(
          numericValue.length +
            format.split("").filter((char) => /\d/.test(char)).length,
          format.length
        )
      : inputLength;
    // Format the numeric value with the specified format
    let formattedValue = "" as string;

    if (format) {
      let valueIndex = 0;
      for (let i = 0; i < format.length; i++) {
        const formatChar = format[i];
        if (/[0x]/i.test(formatChar)) {
          const inputChar = numericValue[valueIndex];
          if (inputChar) {
            formattedValue += inputChar;
            valueIndex++;
          }
        } else {
          formattedValue += formatChar;
        }
      }
      // Remove any hyphens at the end of the formatted value
      formattedValue = formattedValue.replace(/-+$/, "");
    } else {
      formattedValue = numericValue.slice(0, maxLength);
    }

    setInternalValue(formattedValue);
    if (onChange) {
      onChange(formattedValue);
    }
    // Adjust the cursor position if necessary to allow for deleting hyphens
    let newCursorPosition = selectionStart ?? 0;
    if (inputValue === "") {
      if (
        formattedValue[newCursorPosition - 1] === "-" &&
        (newCursorPosition === 1 ||
          formattedValue[newCursorPosition - 2] !== "-")
      ) {
        newCursorPosition--;
      } else if (formattedValue[newCursorPosition] === "-") {
        newCursorPosition++;
      }
    }
    // setValue(formattedValue.slice(0, maxLength));
    // Set the cursor position to the adjusted position
    event.target.setSelectionRange(newCursorPosition, newCursorPosition);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (event.key !== "Backspace" && isNaN(parseInt(event.key, 10))) {
      event.preventDefault();
    }

    const { key, target } = event;
    if (
      key === "ArrowLeft" &&
      target instanceof HTMLInputElement &&
      target.selectionStart !== null &&
      target.selectionStart > 0
    ) {
      target.setSelectionRange(
        target.selectionStart - 1,
        target.selectionStart - 1
      );
    } else if (
      key === "ArrowRight" &&
      target instanceof HTMLInputElement &&
      target.selectionStart !== null &&
      typeof internalValue === "string" &&
      target.selectionStart < internalValue.length
    ) {
      target.setSelectionRange(
        target.selectionStart + 1,
        target.selectionStart + 1
      );
    }
  };

  const getMaxLength = (
    numericValueLength: number,
    format: string,
    selectionStart: number
  ): number => {
    let remainingCharsCount = format.length - selectionStart;
    for (let i = numericValueLength; i < format.length; i++) {
      if (/\d/.test(format[i])) {
        remainingCharsCount++;
      }
    }
    return numericValueLength + remainingCharsCount;
  };

  const maxLength = format
    ? getMaxLength(
        (typeof value === "string" ? value.replace(/-/g, "") : "").length,
        format,
        value?.toString().length || 0
      )
    : inputLength;

  return (
    <div
      className={`relative flex flex-col ${TextSize(size)} ${className} ${
        fullWidth && "w-full"
      }`}
    >
      <Label required={required}>{label}</Label>
      {description && (
        <p className="-mt-0.5 text-gray-500 mb-0.5">{description}</p>
      )}
      <div
        className={`flex gap-2 md:gap-3 relative items-center bg-white border ${
          error !== "" ? "border-red-600" : "border-gray-300"
        } focus-within:border-primary-600 ${TextFieldSize(size)}`}
      >
        {leftIcon !== "" && (
          <div className="z-20 left-5 cursor-pointer">
            <span className={`${IconSize(size)}  text-gray-400`}>
              {leftIcon}
            </span>
          </div>
        )}
        <input
          className={`flex-1 bg-white w-full focus:outline-none custom-input
      `}
          placeholder={format ? format.replace(/\d/g, "0") : placeholder}
          type="text"
          value={internalValue}
          onChange={handleInputChange}
          onBlur={onBlur}
          maxLength={maxLength}
          onKeyDown={handleKeyDown}
        />
        {rightIcon !== "" && (
          <div className="z-20 right-5 cursor-pointer">
            <span className={`${IconSize(size)} text-gray-400`}>
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      {error !== "" && <ErrorMessage absolute={absolute}>{error}</ErrorMessage>}
    </div>
  );
};

export default NumberField;

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

const IconSize = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5 text-base",
    sm: "[&>*]:w-4 [&>*]:h-4 text-sm",
  }[size]);
