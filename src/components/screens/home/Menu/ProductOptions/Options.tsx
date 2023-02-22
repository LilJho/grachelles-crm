import { arraySorter } from "helper/arraySorter";
import { getFirstLetter } from "helper/getFirstLetter";
import React from "react";

type OptionsTypes = {
  data: string[];
  label: string;
  selectedOptions: {
    names: {
      idx: number;
      value: string;
    };
    sizes: {
      idx: number;
      value: string;
    };
    types: {
      idx: number;
      value: string;
    };
  };
  handleSelectOption: (key: string, val: number, value: string) => void;
  objKey: string;
  type?: "letter" | "default";
};

const Options = ({
  data = [],
  label = "",
  selectedOptions,
  handleSelectOption,
  objKey,
  type,
}: OptionsTypes) => {
  type ObjectKey = keyof typeof selectedOptions;

  return (
    <>
      {data[0] !== "" && (
        <div className="flex flex-col gap-1">
          <h4 className="font-medium">{label}</h4>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {data.map((val, idx) => {
              return (
                <button
                  key={idx}
                  className={`${
                    selectedOptions[objKey as ObjectKey].idx === idx
                      ? "bg-primary-100 border-primary-600 text-primary-700"
                      : "bg-gray-100 border-gray-100 text-gray-800"
                  } transition-transform active:scale-95 border capitalize ${
                    type === "letter"
                      ? "rounded-full p-1 w-[30px] h-[30px]"
                      : "rounded-md px-2 py-1"
                  }`}
                  onClick={() => handleSelectOption(objKey, idx, val)}
                >
                  {type === "letter" ? (
                    <span className="uppercase">{getFirstLetter(val)}</span>
                  ) : (
                    val
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Options;
