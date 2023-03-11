import { FC, Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { HiCheck, HiSelector } from "react-icons/hi";
import Label from "./Inputs/Label";
import styled from "styled-components";

type IComboBoxProps = {
  fullWidth?: boolean;
  size?: "default" | "sm" | "lg";
  data?: { id: string; [key: string]: any }[];
  objKey: string;
  required?: boolean;
  label?: string;
  value?: { id: string; [key: string]: any };
  onChange: (value: { id: string; [key: string]: any }) => void;
};

const ComboBox: FC<IComboBoxProps> = ({
  fullWidth = false,
  size,
  data = [],
  objKey = "",
  required = false,
  label = "",
  value = "",
  onChange,
}) => {
  const [query, setQuery] = useState("");

  const filteredData =
    query === ""
      ? data
      : data.filter((val) =>
          val[objKey]
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  const getWidth = setWidthBasedOnLength(data, objKey);

  return (
    <div
      className={`flex flex-col ${TextSize(size)} ${fullWidth ? "w-full" : ""}`}
    >
      <Label required={required}>{label}</Label>
      <Combobox value={value} onChange={onChange}>
        <div className="relative">
          <SelectBox
            minWidth={getWidth}
            fullWidth={fullWidth}
            className={`relative ${
              fullWidth && "w-full"
            } cursor-default bg-white text-left border border-gray-300 focus:border-primary-600 focus:outline-none  ${SelectSize(
              size
            )}`}
          >
            <Combobox.Input
              className={`relative bg-white text-left focus:outline-none w-full`}
              displayValue={(val: any) => val[objKey]}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </SelectBox>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options
              className={`absolute z-20 mt-2 max-h-60 ${
                fullWidth ? "w-full" : "max-w-max"
              } overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {filteredData.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData.map((val) => (
                  <Combobox.Option
                    key={val.id}
                    className={({ active }) =>
                      `relative cursor-pointer select-none ${OptionSize(
                        size
                      )} ${TextSize(size)}  ${
                        active
                          ? "bg-primary-50 text-primary-900"
                          : "text-neutral-900"
                      }`
                    }
                    value={val}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {val[objKey]}
                        </span>
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default ComboBox;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const SelectSize = (size = "default") =>
  ({
    default: "pl-4 py-2.5 pr-10 rounded-md min-h-[2.875rem]",
    sm: "pl-3.5 py-2 pr-10 rounded-md min-h-[2.375rem]",
    lg: "pl-4 py-2.5 pr-10 text-lg rounded-md min-h-[3.125rem]",
  }[size]);

const OptionSize = (size = "default") =>
  ({
    default: "py-2 pl-10 pr-4",
    sm: "py-1.5 pl-10 pr-4",
    lg: "py-2 pl-10 pr-4",
  }[size]);

interface SelectBoxProps {
  fullWidth?: boolean;
  minWidth?: number;
}

const SelectBox = styled.div<SelectBoxProps>`
  width: ${(props) => (props.fullWidth ? "100%" : `${props.minWidth}rem`)};
`;

const setWidthBasedOnLength = (array: any[], objKey = "") => {
  let longestWord = "";

  const data = objKey === "" ? array : array.map((val: any) => val[objKey]);

  data?.forEach((word: string) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });
  return (longestWord.length * 9) / 16;
};
