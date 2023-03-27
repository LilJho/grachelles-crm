import React from "react";
import Label from "../Inputs/Label";

const TextRadioInput = ({
  className,
  size,
  fullWidth,
  options = ["Any", "None"],
  label = "",
  value,
  onChange,
}: any) => {
  let option_name = label;
  option_name = option_name?.replace(/\s/g, "");

  return (
    <fieldset
      className={`relative w-full flex flex-col ${TextSize(
        size
      )} ${className} ${fullWidth && "w-full"}`}
    >
      <Label>{label}</Label>
      <div className="flex items-center gap-3 md:gap-4 w-full flex-wrap">
        {options.map((val: string, idx: number) => {
          return (
            <div key={idx}>
              <input
                type="radio"
                name={option_name}
                value={val}
                id={`${val}Option`}
                className="peer hidden [&:checked_+_label_svg]:block"
                checked={val === value}
                onChange={onChange}
              />

              <label
                htmlFor={`${val}Option`}
                className={`flex w-full flex-1 cursor-pointer items-center justify-between rounded-md border border-gray-300 hover:border-gray-400 hover:bg-gray-100 peer-checked:border-primary-500 peer-checked:hover:bg-primary-100 ${OptionSize(
                  size
                )}`}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="hidden h-5 w-5 text-primary-600"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <p className="text-gray-700 capitalize">{val}</p>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export default TextRadioInput;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const OptionSize = (size = "default") =>
  ({
    default: "py-2.5 px-4 rounded-md",
    sm: "px-3.5 py-2 rounded-md",
    lg: "px-4 py-2.5 rounded-md",
  }[size]);
