import Button from "@/components/UI/Button/Button";
import SelectField from "@/components/UI/SelectField";
import TextField from "@/components/UI/TextField";
import React, { FormEvent, useState } from "react";
import {
  EmployeeResponse,
  DailyTimeRecordsRecord,
  DailyTimeRecordsTypeOptions,
} from "types/pocketbase-types";
import dayjs from "dayjs";
import showToast from "helper/showToast";
import { pb } from "lib/database/pocketbase";
import { useMutation } from "@tanstack/react-query";
import { RiLoader5Line } from "react-icons/ri";

interface IDTRProps {
  employee: EmployeeResponse[] | undefined;
}

const now = new Date();
const currentTime = now.getHours() + ":" + now.getMinutes();

const TimeRecordForm = ({ employee }: IDTRProps) => {
  const [formData, setFormData] = useState<{
    employee: EmployeeResponse | null;
    time: string | any;
    type: DailyTimeRecordsTypeOptions | "";
    datetime: Date;
  }>({
    employee: null,
    time: currentTime,
    type: "",
    datetime: new Date(),
  });

  const handleChange = (key: string, value: string | number) => {
    setFormData((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSubmitRecord = useMutation(async (e: FormEvent) => {
    e.preventDefault();
    const data: DailyTimeRecordsRecord = {
      datetime: dayjs(new Date()).format("DD/MM/YYYY"),
      type: formData.type.toLowerCase() as DailyTimeRecordsTypeOptions,
      time: formData.time,
      employee: formData.employee?.id as string,
    };
    try {
      await pb.collection("daily_time_records").create(data);
      setFormData({
        employee: null,
        time: "",
        type: "",
        datetime: new Date(),
      });
      showToast("DTR submitted successfully!");
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <form
      className="p-6 max-w-xl w-full border rounded-md my-4 flex flex-col gap-4"
      onSubmit={handleSubmitRecord.mutate}
    >
      <SelectField
        label="Employee"
        fullWidth
        size="sm"
        data={employee}
        objKey="name"
        onChange={(e) => handleChange("employee", e)}
        value={formData.employee?.name || ""}
        required
      />
      <TextField
        label="Time"
        type="time"
        size="sm"
        onChange={(e) => handleChange("time", e.target.value)}
        value={formData.time}
        required
      />
      <SelectField
        label="Type"
        size="sm"
        fullWidth
        data={["Time-In", "Time-Out"]}
        onChange={(e) => handleChange("type", e)}
        value={formData.type}
        required
      />

      <div className="mt-4 flex justify-end">
        <Button size="sm" type="submit">
          {handleSubmitRecord.isLoading ? (
            <div className="w-12 flex justify-center">
              <RiLoader5Line className="animate-spin w-6 h-6" />
            </div>
          ) : (
            "Submit Log"
          )}
        </Button>
      </div>
    </form>
  );
};

export default TimeRecordForm;
