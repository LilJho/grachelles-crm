import { FC, Fragment } from "react";
import { HiOutlineChevronDown } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";
import Label from "./Label";
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
  placeholder?: string;
  type?: string;
  error?: string;
  onBlur?: () => void;
  icon?: any;
  readOnly?: boolean;
  className?: string;
  onSelect?: (index: any) => void;
};

const SelectTextField: FC<ISelectFieldProps> = ({
  fullWidth = false,
  size,
  data = [],
  required = false,
  label = "",
  value = "",
  onChange,
  onSelect,
  placeholder = "Enter your text here...",
  type = "text",
  error = "",
  onBlur,
  icon = "",
  readOnly = false,
  className = "",
}) => {
  return (
    <div
      className={`flex group flex-col ${className} ${TextSize(size)} ${
        fullWidth ? "w-full" : "max-w-max"
      }`}
    >
      <Label required={required}>{label}</Label>
      <div
        className={`flex gap-2 md:gap-3 relative items-center bg-white border rounded-md w-full ${
          error !== "" ? "border-red-600" : "border-gray-300"
        } group-focus-within:border-primary-600`}
      >
        {icon !== "" && (
          <div className="z-20 left-5 cursor-pointer">
            <span className={`${IconSize(size)}  text-gray-400`}>{icon}</span>
          </div>
        )}
        <input
          className={`flex-1 w-full focus:outline-none ${TextFieldSize(size)}`}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          readOnly={readOnly}
        />
        <Listbox value={value} onChange={onSelect}>
          <Listbox.Button
            className={`cursor-pointer h-full focus:outline-none text-gray-400 active:text-primary-500 ${SelectFieldSize(
              size
            )}`}
          >
            <HiOutlineChevronDown
              className="h-5 w-5 text-inherit"
              aria-hidden="true"
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`absolute z-30 right-0 left-0 top-[120%] max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base border focus:outline-none`}
            >
              {data.length ? (
                data?.map((item, valueIdx) => (
                  <Listbox.Option
                    key={valueIdx}
                    className={`relative cursor-pointer select-none hover:bg-gray-100 ${OptionSize(
                      size
                    )} ${TextSize(size)}`}
                    value={item}
                  >
                    <span className={`block truncate`}>{item}</span>
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
        </Listbox>
      </div>
      {error !== "" && <ErrorMessage absolute={false}>{error}</ErrorMessage>}
    </div>
  );
};

export default SelectTextField;

const TextSize = (size = "default") =>
  ({
    default: "text-base",
    sm: "text-sm",
    lg: "text-lg",
  }[size]);

const OptionSize = (size = "default") =>
  ({
    default: "py-2 px-4",
    sm: "py-1.5 px-4",
    lg: "py-2 px-4",
  }[size]);

const TextFieldSize = (size = "default") =>
  ({
    default: "py-2.5 px-4 rounded-md",
    sm: "px-3.5 py-2 rounded-md",
    lg: "px-4 py-2.5 rounded-md",
  }[size]);

const SelectFieldSize = (size = "default") =>
  ({
    default: "px-4 py-2.5 rounded-md",
    sm: "px-3.5 py-2 rounded-md",
    lg: "px-4 py-2.5 rounded-md",
  }[size]);

const IconSize = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5 text-base",
    sm: "[&>*]:w-4 [&>*]:h-4 text-sm",
  }[size]);
