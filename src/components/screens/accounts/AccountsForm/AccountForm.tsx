import Button from "@/components/UI/Buttons/Button";
import Label from "@/components/UI/Inputs/Label";
import PasswordField from "@/components/UI/Inputs/PasswordField";
import TextField from "@/components/UI/Inputs/TextField";
import Modal from "@/components/UI/Modal/Modal";
import SelectField from "@/components/UI/Selects/SelectField";
import ToggleSwitch from "@/components/UI/Switch/ToggleSwitch";
import useFetchData from "hooks/useFetchData";
import React, { FormEvent, useEffect, useState } from "react";
import { RiLoader5Line } from "react-icons/ri";
import {
  BranchesResponse,
  Collections,
  UsersRecord,
  UsersRolesOptions,
} from "types/pocketbase-types";

interface IAccountFormProps {
  isOpen: boolean;
  toggle: () => void;
  mode?: "add" | "edit";
  onSubmit: (val: any) => void;
  isLoading: boolean;
  formData: ExtendedUsersRecord;
  setFormData: any;
}

interface ExtendedUsersRecord extends UsersRecord {
  username: string;
  email: string;
  password: string;
}

const AccountForm = ({
  isOpen,
  toggle,
  mode = "add",
  onSubmit,
  isLoading,
  formData,
  setFormData,
}: IAccountFormProps) => {
  const { data: branchData } = useFetchData<BranchesResponse>({
    collectionName: Collections.Branches,
  });
  const handleFormChange = (key: string, val: any) => {
    setFormData({
      ...formData,
      [key]: val,
    });
  };
  const roles = [
    {
      name: UsersRolesOptions.admin,
      isSelected: false,
    },
    {
      name: UsersRolesOptions.cashier,
      isSelected: false,
    },
    {
      name: UsersRolesOptions.stocker,
      isSelected: false,
    },
    {
      name: UsersRolesOptions.chef,
      isSelected: false,
    },
  ];
  const [userRoles, setUserRoles] = useState(roles);
  const [userBranch, setUserBranch] = useState(
    branchData
      ? branchData?.map((item) => ({
          id: item.id,
          name: item.name,
          isSelected: false,
        }))
      : []
  );

  const toggleRole = (name: string) => {
    const currentRoleIndex = userRoles.findIndex((item) => item.name === name);
    const updated = [...userRoles];
    if (currentRoleIndex >= 0) {
      updated[currentRoleIndex] = {
        ...updated[currentRoleIndex],
        isSelected: !updated[currentRoleIndex].isSelected,
      };
    }
    setUserRoles(updated);
  };
  const toggleBranch = (id: string) => {
    const currentBranchIndex = userBranch.findIndex((item) => item.id === id);
    const updated = [...userBranch];
    if (currentBranchIndex >= 0) {
      updated[currentBranchIndex] = {
        ...updated[currentBranchIndex],
        isSelected: !updated[currentBranchIndex].isSelected,
      };
    }
    setUserBranch(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    const roles = userRoles
      .filter((item) => item.isSelected)
      .map((item) => item.name);
    const branch = userBranch
      .filter((item) => item.isSelected)
      .map((item) => item.id);
    setFormData({
      ...formData,
      roles,
      branch,
    });
    onSubmit(e);
  };

  useEffect(() => {
    formData.roles.forEach((item) => {
      const currRoleIndex = roles.findIndex((r) => r.name === item);
      roles[currRoleIndex] = { ...roles[currRoleIndex], isSelected: true };
      setUserRoles(roles);
    });

    if (branchData) {
      if (mode === "add") {
        setUserBranch(
          branchData
            ? branchData?.map((item) => ({
                id: item.id,
                name: item.name,
                isSelected: false,
              }))
            : []
        );
      } else {
        formData.branch.forEach((item) => {
          const currRoleIndex = branchData.findIndex((r) => r.id === item);
          const localBranch = branchData?.map((item) => ({
            id: item.id,
            name: item.name,
            isSelected: false,
          }));

          localBranch[currRoleIndex] = {
            ...localBranch[currRoleIndex],
            isSelected: true,
          };
          setUserBranch(localBranch);
        });
      }
    }
  }, [branchData, formData]);
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      title={FormMode[mode].title}
      closeButton
    >
      <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
        <TextField
          size="sm"
          label="Name"
          required
          value={formData.name}
          onChange={(e) => handleFormChange("name", e.target.value)}
        />
        <TextField
          size="sm"
          label="Username"
          required
          value={formData.username}
          onChange={(e) => handleFormChange("username", e.target.value)}
        />
        {mode === "add" && (
          <TextField
            size="sm"
            label="Email"
            required
            value={formData.email}
            onChange={(e) => handleFormChange("email", e.target.value)}
          />
        )}
        {mode === "add" && (
          <PasswordField
            size="sm"
            label="Password"
            required
            value={formData.password}
            onChange={(e) => {
              handleFormChange("password", e.target.value);
            }}
          />
        )}
        <div>
          <Label>Roles</Label>
          {userRoles.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between mb-1.5"
            >
              <span className="capitalize">{item.name}</span>
              <ToggleSwitch
                enabled={item.isSelected}
                toggle={() => toggleRole(item.name)}
              />
            </div>
          ))}
        </div>
        <div>
          <Label>Branch</Label>
          {userBranch.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-1"
            >
              <span className="capitalize">{item.name}</span>
              <ToggleSwitch
                enabled={item.isSelected}
                toggle={() => toggleBranch(item.id)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-4">
          <Button
            size="sm"
            color="gray"
            variant="light"
            onClick={isLoading ? () => {} : toggle}
          >
            Cancel
          </Button>
          <Button size="sm" type={isLoading ? "button" : "submit"}>
            {isLoading ? (
              <div className="w-12 flex justify-center">
                <RiLoader5Line className="animate-spin w-6 h-6" />
              </div>
            ) : (
              <>{FormMode[mode].button}</>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AccountForm;

const FormMode = {
  add: {
    title: "Add New Account",
    button: "Create New Account",
  },
  edit: {
    title: "Update Account Details",
    button: "Update Account",
  },
};
