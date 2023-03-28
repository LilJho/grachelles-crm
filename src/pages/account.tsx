import MainLayout from "@/components/layout/MainLayout";
import React, { useEffect, useCallback } from "react";
import useAccountStore from "lib/store/useAccountStore";
import PageTitle from "@/components/UI/PageTitle";
import SelectField from "@/components/UI/Selects/SelectField";
import useToggle from "hooks/useToggle";
import AddInventory from "@/components/screens/inventory/InventoryForm/AddInventory";
import Button from "@/components/UI/Buttons/Button";
import { HiPlus } from "react-icons/hi";
import InventoryTable from "@/components/screens/inventory/InventoryTable";

const AccountPage = () => {
  const { isLoading, error, success, createAccount, getAccounts, accounts } =
    useAccountStore();
  const [showAddForm, toggleAddForm] = useToggle();

  async function handleSubmit() {
    // await createAccount();
  }

  const fetchData = useCallback(async () => {
    await getAccounts();
  }, [getAccounts]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <MainLayout>
      <PageTitle title="Inventory Record">
        <div className="flex justify-end max-w-sm gap-6 flex-1">
          <Button
            size="sm"
            color="green"
            icon={<HiPlus />}
            onClick={toggleAddForm}
          >
            Add New Stock
          </Button>
        </div>
      </PageTitle>
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>Email</td>
            <td>Name</td>
            <td>Roles</td>
            <td>Branch</td>
          </tr>
        </thead>
        <tbody>
          {accounts.map((item) => (
            <tr key={item.id}>
              <td>{item.username}</td>
              <td>{item.email}</td>
              <td>{item.name}</td>
              <td>{item.roles}</td>
              <td>{item.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {showAddForm && (
        <AddInventory toggle={toggleAddForm} isOpen={showAddForm} />
      )}
    </MainLayout>
  );
};

export default AccountPage;
