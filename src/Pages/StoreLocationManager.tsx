// @ts-nocheck

import axios from "../axios/axios";
import { FunctionComponent, useEffect, useState } from "react";

const StoreLocationManager: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [storeLocations, setStoreLocations] = useState([]);

    useEffect(() => {
        fetchStores();
    }, []);

    const fetchStores = async () => {
        const { data } = await axios.get("store");
        setStoreLocations(data);
    };

    const updateStoreLocation = async (storeLocation: object) => {
        // console.log(storeLocation);
        await axios.post("store", storeLocation);
    };

    const setLongitude = (newLongitude, storeLocation) => {
        const temp = [];
        storeLocations.forEach((element) => {
            if (element.slug === storeLocation.slug) {
                temp.push({
                    slug: storeLocation.slug,
                    name: storeLocation.name,
                    longitude: newLongitude,
                    latitude: storeLocation.latitude,
                });
            } else {
                temp.push(element);
            }
        });

        setStoreLocations(temp);
    };

    const setLatitude = (newLatitude, storeLocation) => {
        const temp = [];
        storeLocations.forEach((element) => {
            if (element.slug === storeLocation.slug) {
                temp.push({
                    slug: storeLocation.slug,
                    name: storeLocation.name,
                    longitude: storeLocation.longitude,
                    latitude: newLatitude,
                });
            } else {
                temp.push(element);
            }
        });

        setStoreLocations(temp);
    };

    return (
        <div>
            {storeLocations.map((storeLocation, index) => {
                return (
                    <div
                        key={index}
                        className="mb-2 px-5 py-2 flex rounded border-gray-400 bg-gray-300"
                    >
                        <div className="fond-bold w-2/12">
                            {storeLocation.slug}
                        </div>
                        <div className="w-4/12 flex">
                            Longitude:
                            <input
                                className="w-full rounded bg-gray-200 mx-2"
                                type="text"
                                value={storeLocation.longitude ?? ""}
                                onChange={(e) =>
                                    setLongitude(e.target.value, storeLocation)
                                }
                            />
                        </div>
                        <div className="w-4/12 flex">
                            Latitude:
                            <input
                                type="text"
                                className="w-full rounded bg-gray-200 mx-2"
                                value={storeLocation.latitude ?? ""}
                                onChange={(e) =>
                                    setLatitude(e.target.value, storeLocation)
                                }
                            />
                        </div>
                        <div className="w-2/12 flex justify-center">
                            <button
                                onClick={() =>
                                    updateStoreLocation(storeLocation)
                                }
                                className="hover:underline"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default StoreLocationManager;
