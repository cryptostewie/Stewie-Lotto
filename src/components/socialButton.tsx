import React from "react";
import Image from "next/image";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const SocialButton: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
}) => {
  return (
    <div
      className={[
        "bg-white rounded-md cursor-pointer text-black flex items-center justify-center h-10",
        className,
      ].join(" ")}
      onClick={onClick}
      style={{alignItems: "center" }}
    >
      <div style={{ marginRight: 10 }}>
        <Image src="/google.png" width={18} height={18} />
      </div>
      {children}
    </div>
  );
};

export default SocialButton;
