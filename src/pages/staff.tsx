import MainLayout from "@/components/layout/MainLayout";
import EmployeeTable from "@/components/screens/employee/EmployeeTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import useFetchData from "hooks/useFetchData";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { Collections, EmployeeResponse } from "types/pocketbase-types";

const StaffPage = () => {
  const { data: EmployeeData, isLoading: EmployeeLoading } =
    useFetchData<EmployeeResponse>({
      collectionName: Collections.Employee,
    });

  return (
    <MainLayout>
      <PageTitle title="Employee Records">
        <div className="flex items-center justify-end gap-6 flex-1">
          <Button size="sm" color="blue" icon={<HiPlus />}>
            Add New Record
          </Button>
        </div>
      </PageTitle>
      <div>
        <EmployeeTable
          data={EmployeeData as EmployeeResponse[]}
          isLoading={EmployeeLoading}
        />
      </div>
    </MainLayout>
  );
};

export default StaffPage;
