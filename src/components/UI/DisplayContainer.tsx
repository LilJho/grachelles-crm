import React from "react";
import SearchField from "./Inputs/SearchField";
import SelectField from "./SelectField";
import ShowEntries from "./Table/ShowEntries";

type Props = {
  children: any;
  showCount: number | string;
  setShowCount: (showCount: any) => void;
  query: string;
  setQuery: (query: string) => void;
  textColor?: string;
  label: string;
};

const DisplayContainer = ({
  children,
  showCount,
  setShowCount,
  query,
  setQuery,
  textColor = "text-gray-700",
  label,
}: Props) => {
  return (
    <div className="px-6 py-8 md:px-10 md:py-12 bg-white rounded-lg border border-gray-200">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
          <h2 className={`font-semibold text-xl ${textColor}`}>{label}</h2>
          <div className="flex gap-8 items-center">
            <ShowEntries
              size="sm"
              data={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
              selected={showCount}
              setSelected={setShowCount}
            />
            <SearchField
              size="sm"
              className="w-auto md:w-80"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </div>
  );
};

export default DisplayContainer;
