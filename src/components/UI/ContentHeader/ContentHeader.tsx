import React, { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import { HiMenu } from "react-icons/hi";
import UnstyledButton from "../Buttons/UnstyledButton";
import useStore from "lib/store/useStore";
import { useCookies } from "react-cookie";
import jwt_decode from "jwt-decode";
import { IDecodedAccessTokenProps } from "lib/types";

type Props = {
  title?: string[];
};

const ContentHeader = ({ title = [] }: Props) => {
  const toggleSidebar = useStore((state) => state.toggleSidebar);
  const [cookies] = useCookies(["user-auth-token"]);

  const [userData, setUserData] = useState({
    name: "",
    role: [""],
  });

  useEffect(() => {
    if (Object.keys(cookies).length >= 1) {
      const access_token = cookies?.["user-auth-token"]?.access_token;
      const {
        first_name = "John",
        last_name = "Doe",
        role = ["admin"],
      }: IDecodedAccessTokenProps = jwt_decode(access_token);
      const name = `${first_name} ${last_name}`;

      setUserData({
        name,
        role,
      });
    }
  }, [cookies]);

  return (
    <div className="relative z-40">
      <div className="flex items-center gap-2 justify-between h-16 pl-2.5 pr-4 md:px-7 border border-gray-200 rounded-md bg-white">
        <div className="text-base md:text-xl font-medium flex items-center gap-1">
          <UnstyledButton
            className="inline-block md:hidden"
            onClick={toggleSidebar}
          >
            <HiMenu className="w-6 h-6" />
          </UnstyledButton>
          {title?.map((val, idx) => (
            <div key={idx} className="flex gap-1">
              {title.length > 1 && idx === title.length - 1 && <span>/</span>}
              <span
                key={val}
                className={`${
                  title.length > 1 &&
                  idx === title.length - 1 &&
                  "text-green-600"
                }`}
              >
                {val}
              </span>
            </div>
          ))}
        </div>
        <UserDropdown name={userData.name} role={userData.role} />
      </div>
    </div>
  );
};

export default ContentHeader;
