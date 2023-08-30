import { FC, ChangeEvent } from "react";
import TextInput from "./Input/TextInput";

interface ProductFilterProps {
    category: string;
    setCategory: (value: string) => void;
    search: string;
    setSearch: (value: string) => void;
    available: number;
    setAvailable: (value: number) => void;
    store: string;
    setStore: (value: string) => void;
}

const ProductFilter: FC<ProductFilterProps> = ({
    category,
    setCategory,
    search,
    setSearch,
    available,
    setAvailable,
    store,
    setStore,
}) => {
    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const inputValue = event.target.value;
        setCategory(inputValue);
    };

    const handleAvailableChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const inputValue = parseInt(event.target.value);
        setAvailable(inputValue);
    };

    const handleStoreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const inputValue = event.target.value;
        setStore(inputValue);
    };

    return (
        <>
            <div className="mb-2 bg-white flex">
                <select
                    value={available}
                    onChange={handleAvailableChange}
                    className="w-2/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
                >
                    <option value="0">All</option>
                    <option value="1">Available</option>
                    <option value="-1">Not Available</option>
                </select>
                <select
                    value={category}
                    onChange={handleChange}
                    className="w-2/6 mx-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
                >
                    <option value="mb">Motherboards</option>
                    <option value="cpu">Processors</option>
                    <option value="ram">RAM</option>
                    <option value="gpu">Graphics Cards</option>
                    <option value="psu">Power Supplies</option>
                    <option value="case">Pc Cases</option>
                    <option value="storage">Storage</option>
                </select>
                <select
                    value={store}
                    onChange={handleStoreChange}
                    className="w-2/6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block p-2.5"
                >
                    <option value="">All Stores</option>
                    <option value="anhoch">Anhoch</option>
                    <option value="setec">Setec</option>
                    <option value="ddstore">DDStore</option>
                </select>
            </div>
            <div className="mb-2 bg-white">
                <TextInput value={search} setValue={setSearch} />
            </div>
        </>
    );
};

export default ProductFilter;
