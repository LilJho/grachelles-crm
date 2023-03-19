import UnstyledButton from "@/components/UI/Buttons/UnstyledButton";
import DataTable from "./DataTable";

const DataList = ({ toggleProductModal, data, isLoading }) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen">
        <h1 className="text-6xl">PAKYO</h1>
      </div>
    );
  }

  return (
    <div className="w-full p-4 bg-white border border-gray-500 rounded-xl">
      <div className="flex items-center justify-between">
        <p className="font-bold ">Products</p>
        <UnstyledButton className="border " onClick={toggleProductModal}>
          Add Product
        </UnstyledButton>
      </div>
      <DataTable data={data} />
    </div>
  );
};

export default DataList;
