import React from "react";

interface Props<T> {
  header: string[];
  children: any;
}

const HorizontalTable = <T extends string | {}>({
  header,
  children,
}: Props<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-neutral-200 text-sm flex ">
        <thead className="basis-44">
          <tr className="flex flex-col">
            {header.map((val, idx) => (
              <th
                key={idx}
                className="whitespace-nowrap px-4 py-2 text-left font-semibold text-neutral-900 border [&:not(:last-child)]:border-b-0 border-r-0 border-gray-300 firsT:rounded-tl-md last:rounded-bl-md"
              >
                {val}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 flex-1">
          <tr className="flex flex-col">{children}</tr>
        </tbody>
      </table>
    </div>
  );
};

export default HorizontalTable;

export const HorizontalTableBody = ({ children }: any) => {
  return (
    <td className="whitespace-nowrap px-4 py-2 text-neutral-900 border [&:not(:last-child)]:border-b-0 border-gray-300 first:rounded-tr-md last:rounded-br-md">
      {children}
    </td>
  );
};
