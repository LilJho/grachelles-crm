import MainLayout from "@/components/layout/MainLayout";
import React, { useCallback, useEffect } from "react";
import useBranchStore from "lib/store/useBranchStore";

const BranchPage = () => {
  const { getBranches } = useBranchStore();
  const fetchData = useCallback(async () => {
    await getBranches();
  }, [getBranches]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <MainLayout>BranchPage</MainLayout>;
};

export default BranchPage;
