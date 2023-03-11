import React, { FC, FormEvent } from "react";
import ErrorMessage from "./ErrorMessage";
import Label from "./Label";
import { RiEyeLine, RiEyeOffLine } from "react-icons/ri";
import useToggle from "hooks/useToggle";
import styled from "styled-components";

interface IPasswordFieldProps {
  label?: string;
  placeholder?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  size?: string;
  fullWidth?: boolean;
}

const PasswordField: FC<IPasswordFieldProps> = ({
  label = "",
  placeholder = "Enter your text here...",
  onChange,
  value,
  required = false,
  error = "",
  autoComplete = "on",
  onBlur,
  size,
  fullWidth = false,
}) => {
  const [show, toggle] = useToggle();

  return (
    <div
      className={`relative flex flex-col ${TextSize(size)} ${
        fullWidth && "w-full"
      }`}
    >
      <Label required={required}>{label}</Label>
      <div className="flex relative items-center">
        <InputStyled
          className={`flex-1 w-full  focus:outline-none border ${
            error !== "" ? "border-red-600" : "border-gray-300"
          } focus:border-primary-600 ${TextFieldSize(size)}`}
          placeholder={placeholder}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          onBlur={onBlur}
        />
        <div
          className={`z-10 absolute right-5 cursor-pointer ${IconSize(size)}`}
        >
          {show ? (
            <RiEyeOffLine onClick={toggle} />
          ) : (
            <RiEyeLine onClick={toggle} />
          )}
        </div>
      </div>
      {error !== "" && <ErrorMessage>{error}</ErrorMessage>}
    </div>
  );
};

export default PasswordField;

const InputStyled = styled.input`
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const TextFieldSize = (size = "default") =>
  ({
    default: "py-2.5 pl-4 pr-12 rounded-md",
    sm: "pl-3.5 py-2 pr-11 rounded-md",
    lg: "py-2.5 pl-4 pr-12 rounded-md",
  }[size]);

const IconSize = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5 text-base",
    sm: "[&>*]:w-4 [&>*]:h-4 text-sm",
  }[size]);
