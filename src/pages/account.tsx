import MainLayout from "@/components/layout/MainLayout";
import React, { useEffect, useCallback } from "react";
import useAccountStore from "lib/store/useAccountStore";

const AccountPage = () => {
  const { isLoading, error, success, createAccount, getAccounts } =
    useAccountStore();

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
      AccountPage isLoading:{JSON.stringify(isLoading)}
      <br></br>
      error:{JSON.stringify(error)}
      <br></br>
      success:{JSON.stringify(success)}
      <br></br>
      <button onClick={handleSubmit}>createAccount Account</button>
    </MainLayout>
  );
};

export default AccountPage;
