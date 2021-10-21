import React from "react";

interface ErrorMessageProps {
  className?: string;
  content: string;
  isVisible: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  className,
  content,
  isVisible,
}) => {
  if (isVisible)
    return (
      <div className={["text-red-500 text-xs", className].join(" ")}>{content}</div>
    );
  else return <></>;
};

export default ErrorMessage;
