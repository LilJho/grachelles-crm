import React from "react";

const Table = ({ data = [], header, children }: any) => {
  return (
    <>
      {data?.length >= 1 ? (
        <DisplayTable header={header} data={data} />
      ) : (
        <CustomTable header={header}>{children}</CustomTable>
      )}
    </>
  );
};

export default Table;

const DisplayTable = ({ data = [], header = [] }) => {
  const columns = Object.keys(Object(data[0]) || []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-neutral-200 text-sm">
        <thead>
          <tr>
            {header?.map((column, idx) => (
              <TableHead key={idx}>{column}</TableHead>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {data?.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-200">
              {columns?.map((column, idx) => (
                <TableColumn key={idx}>{row[column]}</TableColumn>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const CustomTable = ({ header, children }: any) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-neutral-100/30 text-sm">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
    </div>
  );
};

export const TableHead = ({ children }: any) => (
  <th className="whitespace-nowrap px-4 py-2.5 text-left font-semibold text-neutral-900 ">
    {children}
  </th>
);

export const TableRow = ({ className, onClick, children }: any) => (
  <tr onClick={onClick} className={`hover:bg-gray-100 ${className}`}>
    {children}
  </tr>
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

export const TableCheckBox = ({
  children,
  onChange = () => {},
  value,
  checked,
}: any) => (
  <th className="px-4 py-2.5 text-left">
    <label className="sr-only">{children}</label>
    <input
      className="h-5 w-5 rounded border-gray-200 cursor-pointer"
      type="checkbox"
      onChange={onChange}
      value={value}
      checked={checked}
    />
  </th>
);
