import React from "react";

interface InputProps {
  error: boolean | undefined;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({
  error,
  value,
  onChange,
  placeholder
}) => {
  return (
    <div className="w-full border border-white rounded-md h-10 flex items-center justify-between my-4 caret-white">
      <input className="bg-transparent outline-none pl-4" value={value} onChange={onChange} placeholder={placeholder} />
      <div>{error}</div>
    </div>
  );
};

export default Input;
