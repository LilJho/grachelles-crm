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
import AccountsTable from "@/components/screens/accounts/AccountsTable";
import { UsersResponse } from "types/pocketbase-types";
import { ExpandedUser } from "types/global-types";
import AddAccounts from "@/components/screens/accounts/AccountsForm/AddAccounts";

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
            Add New User
          </Button>
        </div>
      </PageTitle>
      <div>
        <AccountsTable data={accounts as any} />
      </div>
      {showAddForm && (
        <AddAccounts toggle={toggleAddForm} isOpen={showAddForm} />
      )}
    </MainLayout>
  );
};

export default AccountPage;
