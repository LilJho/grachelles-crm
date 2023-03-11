import React from "react";
import NoResultFoundImg from "public/images/Tabs-bro.svg";
import Image from "next/image";
import NoDataFoundImg from "public/images/No data-bro.svg";
import { PropagateLoader } from "react-spinners";

interface ITableProps<T> {
  data?: T[];
  header: string[];
  query?: string | number;
  isLoading?: boolean;
}

interface ICustomTableProps<T> extends ITableProps<T> {
  children?: React.ReactNode;
}

const Table = <T,>({
  data = [],
  header,
  children,
  query,
  isLoading,
}: ICustomTableProps<T>) => {
  const hasChildren = Boolean(children);
  return (
    <>
      {!hasChildren ? (
        <DisplayTable
          header={header}
          data={data}
          query={query}
          isLoading={isLoading}
        />
      ) : (
        <CustomTable header={header} data={data} query={query}>
          {children}
        </CustomTable>
      )}
    </>
  );
};

export default Table;

const DisplayTable = <T,>({
  data = [],
  header = [],
  query = "",
  isLoading = false,
}: ITableProps<T>) => {
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
                <TableColumn key={idx}>{(row as any)[column]}</TableColumn>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isLoading && (
        <div className="my-20 flex justify-center w-full">
          <PropagateLoader color="#5AC39A" size={30} />
        </div>
      )}
      {!isLoading && data?.length === 0 && query !== "" && (
        <div className="flex justify-center items-center flex-col mt-6 mb-10">
          <Image
            src={NoResultFoundImg}
            alt="Searching File Illustration"
            className="w-56"
          />
          <h2 className="max-w-md text-center text-gray-400">
            Sorry, we could not find any results for your search query{" "}
            <span className="text-primary-600 font-semibold">
              &lsquo;
              {query}&lsquo;
            </span>
            . Please check your spelling and try again.
          </h2>
        </div>
      )}
      {!isLoading && data?.length === 0 && query === "" && (
        <div className="flex justify-center items-center flex-col mt-6 mb-10">
          <Image
            src={NoDataFoundImg}
            alt="Searching File Illustration"
            className="w-64"
          />
          <h2 className="max-w-md text-lg font-medium -mt-8 text-center text-gray-400">
            No Data Found!
          </h2>
        </div>
      )}
    </div>
  );
};

const CustomTable = <T,>({
  header,
  children,
  data,
  query,
}: ICustomTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-neutral-100/30 text-sm">
        <thead>
          <tr>{header}</tr>
        </thead>
        <tbody className="divide-y divide-gray-200">{children}</tbody>
      </table>
      {data?.length === 0 && query !== "" && (
        <div className="flex justify-center items-center flex-col my-10">
          <Image
            src={NoResultFoundImg}
            alt="Searching File Illustration"
            className="w-56"
          />
          <h2 className="max-w-md text-center text-gray-400">
            Sorry, we could not find any results for your search query{" "}
            <span className="text-primary-600 font-semibold">
              &lsquo;
              {query}&lsquo;
            </span>
            . Please check your spelling and try again.
          </h2>
        </div>
      )}
      {data?.length === 0 && query === "" && (
        <div className="flex justify-center items-center flex-col my-10">
          <Image
            src={NoDataFoundImg}
            alt="Searching File Illustration"
            className="w-64"
          />
          <h2 className="max-w-md text-lg font-medium -mt-8 text-center text-gray-400">
            No Data Found!
          </h2>
        </div>
      )}
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
