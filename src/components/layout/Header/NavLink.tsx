import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import {
  RiDashboardLine,
  RiFundsBoxLine,
  RiArchiveLine,
  RiShoppingBag2Line,
  RiMoneyDollarCircleLine,
  RiUser6Line,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiAccountBoxLine,
  RiBookReadLine,
} from "react-icons/ri";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";

type Props = {
  href: string;
  children: React.ReactNode;
};

const Icon = {
  "/": <RiDashboardLine />,
  "/report": <RiFundsBoxLine />,
  "/inventory": <RiArchiveLine />,
  "/categories": <RiBookReadLine />,
  "/products": <RiShoppingBag2Line />,
  "/expenses": <RiMoneyDollarCircleLine />,
  "/staff": <RiUser6Line />,
  "/branch": <HiOutlineBuildingStorefront />,
  "/account": <RiAccountBoxLine />,
  "/settings": <RiSettings4Line />,
  "/logout": <RiLogoutBoxLine />,
};

type ObjectKey = keyof typeof Icon;

const NavLink = ({ href, children }: Props) => {
  const { asPath } = useRouter();

  const path_origin = `/${asPath.split("/")[1]}`;
  const isActive = asPath === href || path_origin === href;
  return (
    <Link href={href}>
      <a>
        <li
          className={`flex gap-3 ${
            isActive
              ? "shadow-md shadow-primary-200 bg-primary-500 hover:bg-primary-600 text-white"
              : "text-gray-800 hover:bg-gray-100"
          } items-center px-4 py-3  rounded-md`}
        >
          <div
            className={`[&>*]:relatve flex items-center justify-center [&>*]:-top-[1px] [&>*]:w-5 [&>*]:h-5 ${
              isActive ? "text-white" : "text-primary-400"
            }`}
          >
            {Icon[href as ObjectKey]}
          </div>
          <span>{children}</span>
        </li>
      </a>
    </Link>
  );
};

export default NavLink;
