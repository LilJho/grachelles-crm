import React from "react";
import { RiCalendar2Line } from "react-icons/ri";
import TextField from "./TextField";

type Props = {};

const DateFilterField = (props: Props) => {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Filter by Date</span>
      <div className="md:min-w-[16rem] flex relative items-center">
        <TextField type="date" size="sm" fullWidth />
        <div className="z-10 absolute right-4 pointer-events-none cursor-pointer">
          <RiCalendar2Line className="relative top-[2px]" />
        </div>
      </div>
    </div>
  );
};

export default DateFilterField;
