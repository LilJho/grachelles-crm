"use-client";
import React, { FormEvent, useState } from "react";
import useAuthStore from "lib/store/useAuthStore";
import Image from "next/image";
import GrachellesLogo from "public/logo/GrachellesLogo2.svg";
import LoginIllustration from "public/images/Mobile login-cuate.svg";
import { useMutation } from "@tanstack/react-query";
import { RiLoader5Line } from "react-icons/ri";
import TextField from "@/components/UI/Inputs/TextField";
import PasswordField from "@/components/UI/Inputs/PasswordField";
import Button from "@/components/UI/Buttons/Button";
import { useRouter } from "next/router";
type Props = {};

const LoginPage = (props: Props) => {
  const router = useRouter();
  const { data, error, login } = useAuthStore();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useMutation(async (e: FormEvent) => {
    e.preventDefault();
    // login(userName, password);
    router.push("/");
  });

  return (
    <div className="flex flex-col justify-center items-center p-4 fixed inset-0">
      <form
        className="flex flex-col gap-4 w-full max-w-md"
        onSubmit={handleSubmit.mutate}
      >
        <div className="flex flex-col items-center mb-4">
          <div className="relative w-56 h-56 mx-auto">
            <Image
              src={LoginIllustration}
              alt="Grachelles Logo"
              layout="fill"
            />
          </div>

          <Image src={GrachellesLogo} alt="Grachelles Logo" className="w-36" />
        </div>
        <div className="flex flex-col gap-4">
          <TextField
            label="Email address"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            size="sm"
          />
          <PasswordField
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            size="sm"
          />
          <div className="text-red-500 text-sm">
            {error && "Invalid credentials!"}
          </div>
        </div>
        <div className="flex gap-2 mt-2 w-full">
          <Button className="ml-auto" type="submit" size="sm" fullWidth>
            {handleSubmit.isLoading ? (
              <div className="w-[36px] flex justify-center">
                <RiLoader5Line className="animate-spin w-5 h-5" />
              </div>
            ) : (
              "Login"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
