import React from "react";

interface ButtonProps {
  text: string;
  borderColor: string;
  bgColor: string;
  onClick?: any;
  type: string;
}

function Button({
  text,
  borderColor,
  bgColor,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`border-2 ${bgColor} ${borderColor} rounded-lg p-4 font-madimi text-white transition-opacity duration-100 hover:text-dark-gray hover:opacity-85`}
    >
      {text}
    </button>
  );
}

export default Button;
