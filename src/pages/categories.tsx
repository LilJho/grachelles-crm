import MainLayout from "@/components/layout/MainLayout";
import AddCategoryForm from "@/components/screens/categories/CategoriesForm/AddCategoryForm";
import CategoriesTable from "@/components/screens/categories/CategoriesTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import SelectBranch from "@/components/UI/SelectBranch";
import useFetchData from "hooks/useFetchData";
import useSelectBranch from "hooks/useSelectBranch";
import useToggle from "hooks/useToggle";
import React from "react";
import { HiPlus } from "react-icons/hi";
import {
  BranchesResponse,
  CategoriesResponse,
  Collections,
} from "types/pocketbase-types";

const CategoriesPage = () => {
  const { data: categoriesData, isLoading: categoriesLoading } =
    useFetchData<CategoriesResponse>({
      collectionName: Collections.Categories,
      expand: "branch,add_ons",
    });

  const [showAddForm, toggleAddForm] = useToggle();

  const { filterData, selectBranch, setSelectBranch, BranchesData } =
    useSelectBranch();

  const filteredCategoryData = filterData(
    categoriesData,
    (item: { branch: string }) => item.branch === selectBranch?.id
  );

  return (
    <MainLayout>
      <PageTitle title="Products Categories">
        <div className="flex items-center max-w-sm gap-6 flex-1">
          <SelectBranch
            data={BranchesData as BranchesResponse[]}
            selectBranch={selectBranch as BranchesResponse}
            onChange={(e) => setSelectBranch(e)}
          />
          <Button
            size="sm"
            color="blue"
            icon={<HiPlus />}
            onClick={toggleAddForm}
          >
            Add New Category
          </Button>
        </div>
      </PageTitle>
      <div>
        <CategoriesTable
          data={filteredCategoryData}
          isLoading={categoriesLoading}
        />
      </div>
      {showAddForm && (
        <AddCategoryForm
          isOpen={showAddForm}
          toggle={toggleAddForm}
          currentBranch={selectBranch}
        />
      )}
    </MainLayout>
  );
};

export default CategoriesPage;
