import MainLayout from "@/components/layout/MainLayout";
import AddEmployee from "@/components/screens/employee/EmployeeForm/AddEmployee";
import EmployeeTable from "@/components/screens/employee/EmployeeTable";
import Button from "@/components/UI/Buttons/Button";
import PageTitle from "@/components/UI/PageTitle";
import useFetchData from "hooks/useFetchData";
import React from "react";
import { HiPlus } from "react-icons/hi";
import { Collections, EmployeeResponse } from "types/pocketbase-types";
import useToggle from "./../../hooks/useToggle";

const StaffPage = () => {
  const { data: EmployeeData, isLoading: EmployeeLoading } =
    useFetchData<EmployeeResponse>({
      collectionName: Collections.Employee,
    });

  const [showAddEmployee, toggleAddEmployee] = useToggle();

  return (
    <MainLayout>
      <PageTitle title="Employee Records">
        <div className="flex items-center justify-end gap-6 flex-1">
          <Button
            size="sm"
            color="blue"
            icon={<HiPlus />}
            onClick={toggleAddEmployee}
          >
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
      {showAddEmployee && (
        <AddEmployee isOpen={showAddEmployee} toggle={toggleAddEmployee} />
      )}
    </MainLayout>
  );
};

export default StaffPage;
