import React from "react";
import { RiImage2Line } from "react-icons/ri";

type Props = {
  children?: any;
  fullWidth?: boolean;
  onChange: (e: any) => void;
  size?: string;
  color?: string;
  icon?: any;
  className?: string;
};

const UploadButton = ({
  onChange,
  className = "",
  fullWidth,
  size,
  color,
  children,
}: Props) => {
  return (
    <div>
      <input
        type="file"
        id="file"
        accept="image/*"
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor="file"
        className={`flex items-center gap-2 justify-center cursor-pointer border active:scale-95 transition-transform text-white focus:outline-none ${className} ${
          fullWidth && "w-full"
        }
          ${ButtonSize(size)}
          ${ButtonColor(color)}
          `}
      >
        <>
          <RiImage2Line className="text-current w-5 h-5" />
          <span>{children}</span>
        </>
      </label>
    </div>
  );
};

export default UploadButton;

const ButtonSize = (size = "default") =>
  ({
    default: "text-base px-8 py-2.5 rounded-lg",
    sm: "text-sm px-6 py-2 rounded-md",
    lg: "text-lg px-10 py-2.5 rounded-lg",
  }[size]);

const ButtonColor = (color = "default") =>
  ({
    default: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700",
    red: "bg-red-500 hover:bg-red-600 active:bg-red-700",
    green: "bg-green-600 hover:bg-green-700 active:bg-green-800",
    blue: "bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800",
  }[color]);

const IconSize = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5",
    sm: "[&>*]:w-4 [&>*]:h-4",
  }[size]);
