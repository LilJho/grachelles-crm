import { FC } from "react";
import { RiSearchLine } from "react-icons/ri";

type ISearchFieldProps = {
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  size?: "default" | "sm" | "lg";
  className?: string;
};

const SearchField: FC<ISearchFieldProps> = ({
  placeholder = "Enter your text here...",
  onChange,
  value,
  size,
  className = "",
}) => {
  return (
    <div className={`flex relative items-center ${className}`}>
      <div className={`z-10 absolute cursor-pointer ${TextIcon(size)}`}>
        <RiSearchLine />
      </div>
      <input
        className={`flex-1 w-full focus:outline-none border border-gray-300 focus:border-primary-600 appearance-none ${TextFieldSize(
          size
        )}
  `}
        placeholder={placeholder}
        type="search"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchField;

const TextFieldSize = (size = "default") =>
  ({
    default: "text-base py-2.5 pl-11 pr-4 rounded-lg",
    sm: "text-sm pl-9 pr-3.5 py-2 rounded-md",
    lg: "text-lg pl-12 pr-4 py-2.5 rounded-lg",
  }[size]);

const TextIcon = (size = "default") =>
  ({
    default: "[&>*]:w-5 [&>*]:h-5 left-4",
    sm: "[&>*]:w-4 [&>*]:h-4 left-3",
    lg: "[&>*]:w-5 [&>*]:h-5 left-5",
  }[size]);
