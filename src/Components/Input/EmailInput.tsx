import { FC, ChangeEvent } from "react";

interface EmailInputProps {
    value: string;
    setValue: (value: string) => void;
}

const EmailInput: FC<EmailInputProps> = ({ value, setValue }) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setValue(inputValue);
    };

    return (
        <div>
            <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
            >
                Your email
            </label>
            <input
                value={value}
                onChange={handleChange}
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="name@company.com"
            />
        </div>
    );
};

export default EmailInput;
