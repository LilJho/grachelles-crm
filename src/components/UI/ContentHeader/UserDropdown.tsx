import { Fragment } from "react";
import Avatar from "public/images/avatar2.png";
import Image from "next/legacy/image";
import {
  RiArrowDownSLine,
  RiUserSettingsLine,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { Transition, Menu } from "@headlessui/react";
import useLogout from "hooks/useLogout";
import Link from "next/link";

type Props = {
  name: string;
  role: string[];
};

const UserDropdown = ({ name, role }: Props) => {
  const logout = useLogout();

  return (
    <Menu as="div">
      <Menu.Button className="relative flex gap-3 items-center">
        <div className="flex-col text-sm hidden md:flex text-right">
          <h2 className="font-semibold text-primary-600">{name}</h2>
          <span className="-mt-1 self-end text-gray-500 capitalize">
            {role.map((val) => val).join(", ")}
          </span>
        </div>
        <div className="relative">
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image src={Avatar} alt="avatar" layout="fill" objectFit="cover" />
          </div>
          <div className="absolute z-10 bottom-0 right-0 p-[2px] bg-white rounded-full">
            <div className=" w-2.5 h-2.5 rounded-full bg-green-600"></div>
          </div>
        </div>
        <RiArrowDownSLine
          className={`-ml-1.5 w-6 h-6 transition-transform 
          }`}
        />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="w-60 mt-6 origin-top-right divide-y divide-gray-100 absolute rounded-md right-0 p-2 flex flex-col bg-white border border-gray-200 text-sm shadow-md">
          <Menu.Item>
            <div className="py-2.5 px-2 text-sm font-medium flex-col flex text-center">
              <div className="w-14 h-14 relative rounded-full overflow-hidden mx-auto">
                <Image
                  src={Avatar}
                  alt="avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <h2 className="font-semibold text-primary-600 mt-2">{name}</h2>
              <span className="text-xs text-gray-500 capitalize">
                {role.map((val) => val).join(", ")}
              </span>
            </div>
          </Menu.Item>
          <Menu.Item>
            <Link href="/account-settings">
              <button className="w-full flex gap-3 items-center p-2 group hover:bg-primary-600 hover:text-white rounded-md font-medium">
                <RiUserSettingsLine className="w-5 h-5 text-primary-600 group-hover:text-white" />
                <span>Account Settings</span>
              </button>
            </Link>
          </Menu.Item>
          <Menu.Item>
            <button
              className="w-full flex gap-3 items-center p-2 group hover:bg-primary-600 hover:text-white rounded-md font-medium"
              onClick={logout}
            >
              <RiLogoutBoxLine className="w-5 h-5 text-primary-600 group-hover:text-white" />
              <span>Logout</span>
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
