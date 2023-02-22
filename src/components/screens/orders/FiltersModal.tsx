import Button from "@/components/UI/Button/Button";
import Modal from "@/components/UI/Modal/Modal";
import TextField from "@/components/UI/TextField";
import React, { useState } from "react";
import Image from "next/image";
import FilterImg from "public/images/Time management-cuate.svg";
import { RiFilterOffLine } from "react-icons/ri";

interface IFilterModalProps {
  isOpen: boolean;
  toggle: () => void;
  selectedTime: {
    start: string;
    end: string;
  };
  setSelectedTime: React.Dispatch<
    React.SetStateAction<{ start: string; end: string }>
  >;
}

const FiltersModal = ({
  isOpen,
  toggle,
  setSelectedTime,
  selectedTime,
}: IFilterModalProps) => {
  const handleTimeFilter = (key = "", val = "") => {
    setSelectedTime((prev) => ({ ...prev, [key]: val }));
  };

  const handleClearFilter = () => {
    setSelectedTime({ start: "", end: "" });
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} maxWidth="max-w-sm">
      <div className="flex flex-col">
        <div className="flex flex-col gap-4">
          <Image src={FilterImg} alt="Void Order" className="w-2/5 mx-auto" />
          <h2 className="text-xl font-semibold text-center">Filter Orders</h2>
          <TextField
            size="sm"
            type="time"
            value={selectedTime.start || ""}
            onChange={(e) => handleTimeFilter("start", e.target.value)}
            label="Start Time"
          />
          <TextField
            size="sm"
            type="time"
            value={selectedTime.end || ""}
            onChange={(e) => handleTimeFilter("end", e.target.value)}
            label="End Time"
          />
        </div>
        <div className="flex items-center mt-6 justify-between">
          <Button
            size="sm"
            icon={<RiFilterOffLine />}
            onClick={handleClearFilter}
            color="red"
            variant="light"
          >
            Clear Filter
          </Button>
          <Button size="sm" onClick={toggle}>
            OK
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default FiltersModal;
