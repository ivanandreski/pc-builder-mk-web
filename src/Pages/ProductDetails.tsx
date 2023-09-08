import { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noImageAvailable from "../assets/no-image-available.jpg";
import { Product } from "../Models/Product";

import anhoch from "../assets/images/anhoch.png";
import setec from "../assets/images/setec.jpg";
import ddstore from "../assets/images/ddstore.png";

import CompatibleIcon from "../Components/CompatibleIcon";
import { PcBuildService } from "../Services/PcBuildService";
import RouteNames from "../Config/RouteNames";

const ProductDetails: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const product: Product = location.state;
    console.log(product);

    const handleAddToPcBuild = async () => {
        const pcBuildService: PcBuildService = PcBuildService.getInstance();
        await pcBuildService.addProduct(product);

        navigate(RouteNames.PcBuild);
    };

    // const handleStoreClick = (store: StoreLocation) => {
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         const { latitude } = position.coords;
    //         const { longitude } = position.coords;
    //         window.open(
    //             // `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${store.latitude},${store.longitude}&travelmode=driving`
    //             `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    //         );
    //     });
    // };

    const getStoreImage = () => {
        if (product.storeName === "Anhoch") return anhoch;
        if (product.storeName === "DDStore") return ddstore;
        return setec;
    };

    return (
        <div className="grid lg:grid-cols-2 gap-3">
            <div className="">
                <div className="flex justify-center">
                    <img
                        className="rounded-t-lg"
                        src={product.imageUrl.split(";")[0]}
                        alt="Product Image"
                        onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                                noImageAvailable)
                        }
                    />
                </div>
                <hr className="w-full my-2 border border-gray-500" />
                <h5 className="mb-2 text-center text-xl font-semibold tracking-tight text-gray-900">
                    {product.name}
                </h5>
                <hr className="w-full my-2 border border-gray-500" />
                <div className="flex">
                    <div className="w-1/2 mr-2 focus:outline-none border-2 border-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5">
                        {product.price} MKD
                    </div>
                    <div className="w-1/2 ml-2 focus:outline-none border-2 border-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5">
                        Available:{" "}
                        <CompatibleIcon
                            compatible={product.storeLocations.length > 0}
                        />
                    </div>
                </div>
                <hr className="w-full my-2 border border-gray-500" />
                <div className="flex h-14">
                    <button
                        onClick={handleAddToPcBuild}
                        className="w-1/2 mr-2 focus:outline-none border-2 text-white bg-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5"
                    >
                        Add to PC build
                    </button>
                    <div className="w-1/2 ml-2 focus:outline-none border-2 border-purple-700 font-medium rounded-lg text-lg text-center">
                        <a href={product.originalUrl} className="w-full h-full flex justify-center">
                            <img
                                className="max-w-full max-h-full"
                                src={getStoreImage()}
                                alt=""
                            />
                        </a>
                    </div>
                </div>
                <hr className="w-full mt-2 border border-gray-500" />
                {product.storeLocations.map((store, i) => (
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${store.latitude},${store.longitude}`}
                        key={i}
                        className="block w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mt-2"
                    >
                        {store.name}
                    </a>
                ))}
            </div>
            <div className="lg:border-l-2 lg:border-gray-500 lg:pl-3">
                <div
                    onClick={handleAddToPcBuild}
                    className="w-full mr-2 border-2 text-white bg-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5"
                >
                    Description
                </div>
                <hr className="w-full my-2 border border-gray-500" />
                <p className="font-semibold whitespace-pre-wrap">
                    {product.description}
                </p>
            </div>
        </div>
    );
};

export default ProductDetails;
