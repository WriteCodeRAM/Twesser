import React from "react";

interface ButtonProps {
  text: string;
  borderColor: string;
  bgColor: string;
  onClick: any;
}

function Button({ text, borderColor, bgColor }: ButtonProps) {
  const borderColorClass = () => {
    switch (borderColor) {
      case "vibrant-teal":
        return "border-vibrant-teal";
      case "soft-orange":
        return "border-soft-orange";
      default:
        return "";
    }
  };

  return (
    <button
      className={`border-2 ${bgColor} ${borderColorClass()} rounded-lg p-4 font-madimi text-white transition-opacity duration-100 hover:opacity-85 hover:text-dark-gray`}
    >
      {text}
    </button>
  );
}

export default Button;
