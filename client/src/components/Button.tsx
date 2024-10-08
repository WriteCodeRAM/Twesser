import React from "react";
import { ButtonProps } from "../../src/types/index";

function Button({
  text,
  borderColor,
  bgColor,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`border-2 ${bgColor} ${borderColor} ${disabled ? "cursor-not-allowed opacity-50" : ""} rounded-lg p-4 font-madimi text-white transition-opacity duration-100 hover:text-dark-gray hover:opacity-85`}
    >
      {text}
    </button>
  );
}

export default Button;
