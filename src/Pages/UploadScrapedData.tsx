import { FunctionComponent, useEffect, useState, createRef } from "react";

import { Product } from "../Models/Product";

const UploadScrapedData: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="w-2/6 border-2 rounded-lg px-10 py-5 border-gray-400 bg-gray-300">
            <input className="block mb-4" type="file" name="" id="" />
            <button type="button" className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button>
        </div>
    );
};

export default UploadScrapedData;
