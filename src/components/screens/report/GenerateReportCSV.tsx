import Button from "@/components/UI/Buttons/Button";
import DateField from "@/components/UI/Inputs/DateField";
import Modal from "@/components/UI/Modal/Modal";
import useGenerateSales from "hooks/useGenerateSales";
import React, { useState } from "react";
import SelectField from "./../../UI/Selects/SelectField";
import { CSVLink } from "react-csv";

import dayjs from "dayjs";
import useFetchData from "hooks/useFetchData";
import { BranchesResponse, Collections } from "types/pocketbase-types";
import {
  filterSalesData,
  filterCashierData,
} from "helper/filterSalesReportData";
import useGenerateCashierLog from "hooks/useGenerateCashierLog";

interface IGenerate {
  isOpen: boolean;
  toggle: () => void;
  cashierLog: any;
  orderData: any;
}
interface IFilterSales {
  startDate: string;
  endDate: string;
  branch: BranchesResponse | string;
}

const GenerateReportCSV = ({
  isOpen,
  toggle,
  cashierLog,
  orderData,
}: IGenerate) => {
  const { data: branchData, isLoading: branchLoading } =
    useFetchData<BranchesResponse>({
      collectionName: Collections.Branches,
    });

  const [filterSales, setFilterSales] = useState<IFilterSales>({
    startDate: "",
    endDate: "",
    branch: "",
  });

  const [filterCashier, setFilterCashier] = useState<IFilterSales>({
    startDate: "",
    endDate: "",
    branch: "",
  });

  const handleSalesFieldChange = (key: string, val: any, setState: any) => {
    setState((prev: any) => ({ ...prev, [key]: val }));
  };

  const { headers: SalesHeader, result } = useGenerateSales(
    filterSalesData(filterSales as any, orderData) as any[]
  );

  const { headers: CashiersHeader, data } = useGenerateCashierLog(
    filterCashierData(filterCashier as any, cashierLog)
  );

  return (
    <Modal isOpen={isOpen} toggle={toggle} title="Generate CSV" closeButton>
      <div className="flex flex-col gap-6 justify-center">
        <div className="flex flex-col gap-4 p-4 border rounded-md border-gray-200">
          <label className="text-xl font-bold text-gray-700">
            Sales Record
          </label>
          <div className="flex items-center gap-4 w-full">
            <DateField
              label="From"
              size="sm"
              fullWidth
              value={filterSales.startDate}
              onChange={(e) =>
                handleSalesFieldChange(
                  "startDate",
                  e.target.value,
                  setFilterSales
                )
              }
            />
            <DateField
              label="To"
              size="sm"
              fullWidth
              value={filterSales.endDate}
              onChange={(e) =>
                handleSalesFieldChange(
                  "endDate",
                  e.target.value,
                  setFilterSales
                )
              }
            />
          </div>
          <SelectField
            label="Branch"
            size="sm"
            data={branchData}
            objKey="name"
            value={(filterSales.branch as BranchesResponse).name}
            fullWidth
            onChange={(e) =>
              handleSalesFieldChange("branch", e, setFilterSales)
            }
          />
          <Note />
          <div className="flex items-center justify-between mt-6 w-full">
            <CSVLink
              data={result as any}
              headers={SalesHeader}
              filename={"SalesReport.csv"}
              target="_blank"
              className="flex items-center gap-2 text-sm text-green-700 font-semibold w-full"
            >
              <Button size="sm" className="w-full">
                Generate CSV
              </Button>
            </CSVLink>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-4 border rounded-md border-gray-200">
          <label className="text-xl font-bold text-gray-700">
            Cashier Sales Log
          </label>
          <div className="flex items-center gap-4 w-full">
            <DateField
              label="From"
              size="sm"
              fullWidth
              value={filterCashier.startDate}
              onChange={(e) =>
                handleSalesFieldChange(
                  "startDate",
                  e.target.value,
                  setFilterCashier
                )
              }
            />
            <DateField
              label="To"
              size="sm"
              fullWidth
              value={filterCashier.endDate}
              onChange={(e) =>
                handleSalesFieldChange(
                  "endDate",
                  e.target.value,
                  setFilterCashier
                )
              }
            />
          </div>
          <SelectField
            label="Branch"
            size="sm"
            data={branchData}
            objKey="name"
            value={(filterCashier.branch as BranchesResponse).name}
            fullWidth
            onChange={(e) =>
              handleSalesFieldChange("branch", e, setFilterCashier)
            }
          />
          <Note />
          <div className="flex items-center justify-between mt-6 w-full">
            <CSVLink
              data={data as any}
              headers={CashiersHeader}
              filename={"CashierLog.csv"}
              target="_blank"
              className="flex items-center gap-2 text-sm text-green-700 font-semibold w-full"
            >
              <Button size="sm" className="w-full">
                Generate CSV
              </Button>
            </CSVLink>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GenerateReportCSV;

const Note = () => (
  <p className="p-2 bg-indigo-50 text-indigo-900 text-sm rounded-md">
    Note: Please make sure to specify the date range and branch when generating
    the report. If these parameters are not provided, the report will include
    all available data, which may not be desirable. Thank you!
  </p>
);
