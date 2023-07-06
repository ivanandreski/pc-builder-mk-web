import React, { FC, ChangeEvent } from "react";
import TextInput from "./Input/TextInput";

interface ProductFilterProps {
  category: string;
  setCategory: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
}

const ProductFilter: FC<ProductFilterProps> = ({
  category,
  setCategory,
  search,
  setSearch,
}) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const inputValue = event.target.value;
    setCategory(inputValue);
  };

  return (
    <>
      <div className="mb-2 bg-white">
        <select
          value={category}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
        >
          <option value="mb">Motherboards</option>
          <option value="cpu">Processors</option>
          <option value="ram">RAM</option>
          <option value="gpu">Graphics Cards</option>
          <option value="psu">Power Supplies</option>
          <option value="case">Pc Cases</option>
          <option value="storage">Storage</option>
        </select>
      </div>
      <div className="mb-2 bg-white">
        <TextInput value={search} setValue={setSearch} />
      </div>
    </>
  );
};

export default ProductFilter;
