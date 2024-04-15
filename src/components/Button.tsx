import React from 'react';

interface ButtonProps {
  text: string;
  borderColor: string;
  hoverColor: string;
}

function Button({ text, borderColor, hoverColor }: ButtonProps) {
  const borderColorClass = () => {
    switch (borderColor) {
      case 'vibrant-teal':
        return 'border-vibrant-teal';
      case 'soft-orange':
        return 'border-soft-orange';
      default:
        return '';
    }
  };

  const hoverColorClass = () => {
    switch (hoverColor) {
      case 'soft-orange':
        return 'hover:bg-soft-orange';
      case 'vibrant-teal':
        return 'hover:bg-vibrant-teal';
      default:
        return '';
    }
  };

  return (
    <button
      className={`border-2 ${borderColorClass()} rounded p-6 font-madimi ${hoverColorClass()}`}
    >
      {text}
    </button>
  );
}

export default Button;
