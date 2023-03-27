"use-client";

import useAuthStore from "lib/store/useAuthStore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { UsersRolesOptions } from "types/pocketbase-types";

interface Props {
  children: JSX.Element[] | JSX.Element;
  allowedRoles: UsersRolesOptions[];
}

const PrivatePage = ({ children, allowedRoles }: Props) => {
  const { data, isLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) {
      router.push("/login");
    }
    if (data && !isLoading) {
      let allowed = false;
      data.roles.forEach((item) => {
        if (allowedRoles.includes(item)) {
          allowed = true;
        }
      });
      if (!allowed) {
        router.push("/login");
      }
    }
  }, [router, isLoading, data, allowedRoles]);

  if (isLoading) <p>loading</p>;
  return <>{children}</>;
};

export default PrivatePage;
