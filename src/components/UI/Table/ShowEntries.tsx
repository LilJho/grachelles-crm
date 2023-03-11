import React from "react";
import { Fragment, Key, ReactNode } from "react";
import { HiSelector } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";

interface IProps<T> {
  size?: string;
  data?: T[];
  selected?: string | number;
  setSelected?: (selected: any) => void;
}

const ShowEntries = <T extends string | number | {}>({
  size,
  data = [],
  selected,
  setSelected,
}: IProps<T>) => {
  return (
    <div className="flex items-center gap-3 ">
      <span className="font-medium">Show</span>
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button
            className={`relative w-full cursor-default bg-white text-left border border-gray-300 focus:border-primary-600 focus:outline-none  ${SelectSize(
              size
            )}`}
          >
            <span className="block truncate">
              {selected as unknown as ReactNode}
            </span>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <HiSelector
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-20 mt-2 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {data.map((value: any, valueIdx: Key | null | undefined) => (
                <Listbox.Option
                  key={valueIdx}
                  className={({ active }) =>
                    `text-center relative cursor-default select-none ${OptionSize(
                      size
                    )}  ${
                      active
                        ? "bg-amber-100 text-primary-800"
                        : "text-neutral-900"
                    }`
                  }
                  value={value}
                >
                  {({ selected }) => (
                    <span
                      className={`truncate ${
                        selected
                          ? "font-medium text-primary-600"
                          : "font-normal"
                      }`}
                    >
                      {value}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
      <span className="font-medium">entries</span>
    </div>
  );
};

export default ShowEntries;

const SelectSize = (size = "default") =>
  ({
    default: "pl-4 py-2.5 pr-10 text-base rounded-md",
    sm: "pl-3.5 py-2 pr-10 text-sm rounded-md",
    lg: "pl-4 py-2.5 pr-10 text-lg rounded-md",
  }[size]);

const OptionSize = (size = "default") =>
  ({
    default: "py-2 px-4 text-base",
    sm: "py-1.5 px-4 text-sm",
    lg: "py-2 px-4 text-lg",
  }[size]);
