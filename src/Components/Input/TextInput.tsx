import { FC, ChangeEvent } from "react";

interface TextInputProps {
    value: string;
    setValue: (value: string) => void;
}

const TextInput: FC<TextInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    };

    return (
        <div>
            <input
                value={value}
                onChange={handleChange}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
                placeholder="Search"
            />
        </div>
    );
};

export default TextInput;
