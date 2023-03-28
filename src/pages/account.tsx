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
import { Collections, UsersResponse } from "types/pocketbase-types";
import { ExpandedUser } from "types/global-types";
import AddAccounts from "@/components/screens/accounts/AccountsForm/AddAccounts";
import useFetchData from "hooks/useFetchData";

const AccountPage = () => {
  const [showAddForm, toggleAddForm] = useToggle();
  const { data } = useFetchData<UsersResponse>({
    collectionName: Collections.Users,
    expand: "branch",
  });

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
        <AccountsTable data={data as any} />
      </div>
      {showAddForm && (
        <AddAccounts toggle={toggleAddForm} isOpen={showAddForm} />
      )}
    </MainLayout>
  );
};

export default AccountPage;
