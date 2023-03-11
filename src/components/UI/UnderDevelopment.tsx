import React from "react";
import UnderDevelopmentImage from "public/images/Building-permit-bro.png";
import Image from "next/image";

type Props = {};

const UnderDevelopment = (props: Props) => {
  return (
    <div>
      <Image src={UnderDevelopmentImage} alt="Engineer Illustration" />
      <h2>Under Developments</h2>
    </div>
  );
};

export default UnderDevelopment;
