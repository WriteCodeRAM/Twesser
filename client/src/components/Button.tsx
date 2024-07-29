import React from "react";
import { ButtonProps } from "@/types";

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
