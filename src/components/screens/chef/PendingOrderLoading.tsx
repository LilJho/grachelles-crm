import React from "react";
import { RiLoader5Line } from "react-icons/ri";

const PendingOrderLoading = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, idx) => (
        <div
          className="w-full md:max-w-[328px] border rounded-md p-4 transition-transform active:scale-95 cursor-pointer"
          key={val}
        >
          <div className="text-sm flex justify-between items-center">
            <div className="flex flex-col gap-1">
              <div className="h-5 w-20 rounded bg-gray-200 animate-pulse"></div>
              <div className="h-4 w-36 rounded bg-gray-200 animate-pulse"></div>
            </div>
            <div className="px-2 py-1 bg-gray-200 animate-pulse text-sm text-white rounded h-7 w-16"></div>
          </div>
          <div className="flex flex-col gap-2 my-4">
            <div className="my-8 mx-auto">
              <RiLoader5Line className="animate-spin w-14 h-14 text-primary-200" />
            </div>
          </div>
          <div className="h-[1px] bg-gray-200 my-3"></div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-[2.25rem] bg-gray-200 animate-pulse rounded-sm"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default PendingOrderLoading;
