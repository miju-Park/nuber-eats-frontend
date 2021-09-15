import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}
export const Button: React.FC<IButtonProps> = ({
  canClick,
  loading,
  actionText,
}) => {
  return (
    <button
      className={`${
        canClick
          ? "bg-lime-600 hover:bg-lime-700"
          : "bg-gray-300 pointer-events-none"
      } text-lg font-medium text-white py-4  focus:outline-none transition-colors`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
};
export default Button;