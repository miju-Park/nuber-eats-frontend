import React from "react";

interface IRestaurantProps {
  id: string;
  coverImg: string;
  name: string;
  categoryName?: string;
}
export const Restaurant: React.FC<IRestaurantProps> = ({
  coverImg,
  name,
  categoryName,
}) => {
  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="bg-cover bg-center mb-3 gap-11 py-28"
      ></div>
      <h3 className="text-xl font-medium">{name}</h3>
      <span className="border-t mt-4 py-2 text-xs opacity-50 border-gray-400">
        {categoryName}
      </span>
    </div>
  );
};
