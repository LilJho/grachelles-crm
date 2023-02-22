import React from "react";

const ProductLoadingState = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((val, idx) => (
        <div
          key={idx}
          className={`cursor-pointer w-[100px] h-[120px] rounded-lg border p-2 flex flex-col items-center transition-all active:scale-95`}
        >
          <div className="bg-gray-200 animate-pulse rounded-md w-full h-16" />
          <div className="my-auto">
            <div
              className={`mt-1 text-center h-[14px] w-10 rounded-sm bg-gray-200 animate-pulse`}
            ></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductLoadingState;
