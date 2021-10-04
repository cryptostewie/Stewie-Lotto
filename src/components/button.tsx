import React from "react";

interface ButtonProps {
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <div
      className={["bg-yellow hover:bg-transparent duration-300 rounded-md cursor-pointer text-white flex items-center justify-center h-10", className].join(' ')}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
