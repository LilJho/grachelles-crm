import { FC, Fragment } from "react";
import { HiCheck, HiSelector } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";
import Label from "./Label";
import styled from "styled-components";
import ErrorMessage from "./ErrorMessage";

type ISelectFieldProps = {
  fullWidth?: boolean;
  size?: string;
  data?: any[];
  objKey?: string;
  required?: boolean;
  label?: string;
  value?: any;
  onChange?: (value: any) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
};

const SelectField: FC<ISelectFieldProps> = ({
  fullWidth = false,
  size,
  data = [],
  objKey = "",
  required = false,
  label = "",
  value = "",
  onChange,
  error = "",
}) => {
  const getWidth = setWidthBasedOnLength(data, objKey);
  return (
    <div
      className={`flex flex-col ${TextSize(size)} ${fullWidth ? "w-full" : ""}`}
    >
      <Label required={required}>{label}</Label>
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          {value !== "" ? (
            <Listbox.Button
              className={`relative ${
                fullWidth && "w-full"
              } cursor-default bg-white text-left border border-gray-300 focus:border-primary-600 focus:outline-none ${SelectSize(
                size
              )}`}
            >
              <SelectBox minWidth={getWidth} fullWidth={fullWidth}>
                {typeof value === "object" && objKey !== "" ? (
                  <span className="block truncate">{value[objKey]}</span>
                ) : (
                  <span className="block truncate">{value}</span>
                )}
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </SelectBox>
            </Listbox.Button>
          ) : (
            <Listbox.Button
              className={`relative w-full cursor-default bg-white text-left border border-gray-300 focus:border-primary-600 focus:outline-none  ${SelectSize(
                size
              )}`}
            >
              Select--
            </Listbox.Button>
          )}

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute z-20 mt-2 max-h-60 ${
                fullWidth ? "w-full" : "max-w-max"
              } overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            >
              {data.length ? (
                data?.map((item, valueIdx) => (
                  <Listbox.Option
                    key={valueIdx}
                    className={({ active }) =>
                      `relative cursor-pointer select-none ${OptionSize(
                        size
                      )} ${TextSize(size)}  ${
                        active
                          ? "bg-primary-50 text-primary-800"
                          : "text-neutral-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        {objKey !== "" ? (
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item[objKey]}
                          </span>
                        ) : (
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {item}
                          </span>
                        )}
                        {selected ? (
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-600">
                            <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))
              ) : (
                <div
                  className={`relative cursor-pointer select-none hover:bg-gray-100 ${OptionSize(
                    size
                  )} ${TextSize(size)}`}
                >
                  No data available
                </div>
              )}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      {error !== "" && <ErrorMessage absolute={false}>{error}</ErrorMessage>}
    </div>
  );
};

export default SelectField;

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

  const data = objKey === "" ? array : array.map((val) => val[objKey]);

  data?.forEach((word) => {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  });
  return (longestWord.length * 9) / 16;
};
