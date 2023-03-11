import React from "react";

type Props = {
  children: any;
  header: string[];
};

const InteractiveTable = ({ children, header }: Props) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-neutral-200 text-sm">
        <thead>
          <tr>
            {header?.map((column, idx) => (
              <th
                key={idx}
                className="whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export default InteractiveTable;

export const TableHead = ({ children }: any) => (
  <th className="whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900 ">
    {children}
  </th>
);

export const TableRow = ({ children }: any) => (
  <tr className="hover:bg-gray-200">{children}</tr>
);

export const TableColumn = ({ children, className = "" }: any) => (
  <td
    className={`whitespace-nowrap px-4 py-2.5 first-of-type:font-semibold text-neutral-900 ${className}`}
  >
    {children}
  </td>
);

export const TableColumnImage = ({ children }: any) => (
  <td className="relative flex items-center p-2">
    <div className="relative w-10 h-10 rounded-md overflow-hidden">
      {children}
    </div>
  </td>
);
