import React, { FC } from "react";

interface IButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  size?: "default" | "xs" | "sm" | "lg";
  variant?: "default" | "outlined" | "light" | "subtle";
  color?: "default" | "blue" | "green" | "gray" | "red";
  icon?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  radius?: string;
  textDisplay?: boolean;
}

const Button: FC<IButtonProps> = ({
  children,
  type = "button",
  fullWidth,
  size,
  variant,
  color,
  icon = "",
  onClick = () => {},
  className = "",
  disabled = false,
  radius,
  textDisplay = false,
}) => {
  return (
    <button
      className={`inline-block border border-transparent active:scale-95 transition-transform focus:outline-none font-medium ${
        fullWidth && "w-full"
      }
      ${textDisplay && "!px-0"}
      ${ButtonSize(size)}
      ${VariantDefault(variant, color)}
      ${ButtonRadius(radius)}
      ${className}
      disabled:bg-gray-400 disabled:hover:bg-gray-500 disabled:active:bg-gray-400 disabled:active:scale-100`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      <span className={`flex gap-2 items-center justify-center `}>
        {icon !== "" && (
          <span className={`${IconSize(size)} text-inherit hover:text-inherit`}>
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
};

export default Button;

const ButtonSize = (size = "default") =>
  ({
    default: "text-base px-6 py-2.5 rounded-md min-h-[2.625rem]",
    xs: "text-xs px-3.5 py-1.5 rounded-md min-h-[1.875rem]",
    sm: "text-sm px-5 py-1.5 rounded-md min-h-[2.25rem]",
    lg: "text-lg px-8 py-2.5 rounded-lg min-h-[3.125rem]",
  }[size]);

const ButtonRadius = (radius = "default") =>
  ({
    default: "rounded-md",
    sm: "rounded-sm",
    lg: "rounded-lg",
    rounded: "rounded-full",
  }[radius]);

const VariantDefault = (variant = "default", color = "default") => {
  switch (variant) {
    case "default":
      return `${ColorDefault(color)}`;
    case "outlined":
      return `${ColorOutlined(color)}`;
    case "light":
      return `${ColorLight(color)}`;
    case "subtle":
      return `${ColorSubtle(color)}`;
    default:
      break;
  }
};

const ColorDefault = (color = "default") => {
  switch (color) {
    case "default":
      return "bg-primary-500 hover:bg-primary-600 active:bg-primary-700 text-white";
    case "blue":
      return "bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white";
    case "green":
      return "bg-green-500 hover:bg-green-600 active:bg-green-700 text-white";
    case "gray":
      return "bg-gray-700 hover:bg-gray-800 active:bg-gray-900 text-white";
    case "red":
      return "bg-rose-500 hover:bg-rose-600 active:bg-rose-700 text-white";
    default:
      break;
  }
};
const ColorOutlined = (color = "default") => {
  switch (color) {
    case "default":
      return "border-primary-500 bg-white hover:border-primary-600 hover:bg-primary-600 active:border-primary-700 active:bg-primary-700 text-primary-500 hover:text-white active:text-white";
    case "blue":
      return "border-indigo-500 bg-white hover:border-indigo-600 hover:bg-indigo-600 active:border-indigo-700 active:bg-indigo-700 text-indigo-500 hover:text-white active:text-white";
    case "green":
      return "border-green-500 bg-white hover:border-green-600 hover:bg-green-600 active:border-green-700 active:bg-green-700 text-green-500 hover:text-white active:text-white";
    case "gray":
      return "border-gray-500 bg-white hover:border-gray-600 hover:bg-gray-600 active:border-gray-700 active:bg-gray-700 text-gray-500 hover:text-white active:text-white";
    case "red":
      return "border-rose-500 bg-white hover:border-rose-600 hover:bg-rose-600 active:border-rose-700 active:bg-rose-700 text-rose-500 hover:text-white active:text-white";
    default:
      break;
  }
};

const ColorLight = (color = "default") => {
  switch (color) {
    case "default":
      return "border-none bg-primary-50 hover:bg-primary-200 active:bg-primary-300 text-primary-600";
    case "blue":
      return "border-none bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 text-indigo-600";
    case "yellow":
      return "border-none bg-green-50 hover:bg-green-100 active:bg-green-200 text-green-600";
    case "gray":
      return "border-none bg-gray-200 hover:bg-gray-300 active:bg-gray-400 text-gray-800";
    case "red":
      return "border-none bg-rose-200 hover:bg-rose-200 active:bg-rose-300 text-rose-600";
    default:
      break;
  }
};

const ColorSubtle = (color = "default") => {
  switch (color) {
    case "default":
      return "border-white bg-white text-primary-500 hover:text-primary-600 active:text-primary-700";
    case "blue":
      return "border-white bg-white text-indigo-500 hover:text-indigo-600 active:text-indigo-700";
    case "yellow":
      return "border-white bg-white text-green-500 hover:text-green-600 active:text-green-700";
    case "red":
      return "border-white bg-white text-rose-500 hover:text-rose-600 active:text-rose-700";
    case "gray":
      return "border-white bg-white text-gray-500";
    default:
      break;
  }
};

const IconSize = (size = "default") =>
  ({
    default: "[&>*]:w-6 [&>*]:h-6",
    sm: "[&>*]:w-5 [&>*]:h-5",
    xs: "[&>*]:w-3.5 [&>*]:h-3.5",
  }[size]);
