import React from "react";
import Image from "next/image";
import GrachellesImage from "public/images/grachelles.png";
import UnstyledButton from "@/components/UI/Button/UnstyledButton";

type Props = {
  image?: string;
  label: string;
  onClick: () => void;
};

const CategoryCard = ({ label, image, onClick }: Props) => {
  return (
    <UnstyledButton
      className={`cursor-pointer w-[100px] h-[120px] rounded-lg border active:border-primary-400 active:text-primary-500 p-2 flex flex-col items-center transition-all active:scale-95`}
      onClick={onClick}
    >
      <Image
        src={image || GrachellesImage}
        alt={"Image"}
        width={100}
        height={64}
        className="object-cover rounded-md h-16 overflow-hidden"
      />
      <div className="my-auto">
        <h2
          className={`mt-1 leading-[.90rem] text-xs text-center font-medium text-inherit`}
        >
          {label}
        </h2>
      </div>
    </UnstyledButton>
  );
};

export default CategoryCard;
