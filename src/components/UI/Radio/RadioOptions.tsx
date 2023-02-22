import Image from "next/image";
import React from "react";
import Label from "../Label";
import CashierImg from "public/images/cashier.svg";
import ChefImg from "public/images/chef.svg";
import StockerImg from "public/images/stocker.svg";

const RadioOptions = ({
  className,
  size,
  fullWidth,
  options = ["Any", "None"],
  label = "",
  value,
  onChange,
}: any) => {
  let option_name = label;
  option_name = option_name.replace(/\s/g, "");

  return (
    <fieldset
      className={`relative w-full flex flex-col ${TextSize(
        size
      )} ${className} ${fullWidth && "w-full"}`}
    >
      <Label>{label}</Label>
      <div className="flex items-center justify-center md:justify-between gap-3 md:gap-4 w-full flex-wrap">
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
                className={`flex w-full flex-1 cursor-pointer items-center justify-between rounded-md transition-colors border border-gray-300 hover:border-gray-400 hover:bg-gray-100 ${
                  ActivePosition[val as keyof typeof ActivePosition]
                } ${OptionSize(size)}`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Image
                    src={ImageForOptions[val as keyof typeof ImageForOptions]}
                    alt="Illustrations"
                    className="w-24 md:w-32"
                  />
                  <p className="capitalize text-base md:text-lg font-semibold">
                    {val}
                  </p>
                </div>
              </label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
};

export default RadioOptions;

const ImageForOptions = {
  cashier: CashierImg,
  chef: ChefImg,
  stocker: StockerImg,
};

const ActivePosition = {
  cashier:
    "peer-checked:border-primary-500 peer-checked:text-primary-600 peer-checked:hover:bg-primary-100",
  chef: "peer-checked:border-violet-500 peer-checked:text-violet-600 peer-checked:hover:bg-violet-100",
  stocker:
    "peer-checked:border-red-500 peer-checked:text-red-500 peer-checked:hover:bg-red-100",
};

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
