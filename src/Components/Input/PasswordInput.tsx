import { FC, ChangeEvent } from "react";

interface PasswordInputProps {
    value: string;
    setValue: (value: string) => void;
}

const PasswordInput: FC<PasswordInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    };

    return (
        <div>
            <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Password
            </label>
            <input
                value={value}
                onChange={handleChange}
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
            />
        </div>
    );
};

export default PasswordInput;
