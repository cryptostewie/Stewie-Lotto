import React from "react";

interface InputProps {
  error: boolean | undefined;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  type?: string,
}

const Input: React.FC<InputProps> = ({
  error,
  value,
  onChange,
  placeholder,
  type,
}) => {
  return (
    <div className="w-full border border-white rounded-md h-10 flex items-center justify-between my-4 caret-white">
      <input type={type} className="bg-transparent outline-none pl-4 text-white" value={value} onChange={onChange} placeholder={placeholder} />
      <div>{error}</div>
    </div>
  );
};

export default Input;
