import React, { FC, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import noImageAvailable from "../assets/no-image-available.jpg";
import { Product } from "../Models/Product";

import CompatibleIcon from "../Components/CompatibleIcon";
import { PcBuildService } from "../Services/PcBuildService";
import RouteNames from "../Config/RouteNames";
import { StoreLocation } from "../Models/StoreLocation";

const ProductDetails: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product: Product = location.state;

  const handleAddToPcBuild = async () => {
    const pcBuildService: PcBuildService = PcBuildService.getInstance();
    await pcBuildService.addProduct(product);

    navigate(RouteNames.PcBuild);
  };

  const handleStoreClick = async (store: StoreLocation) => {
    navigator.geolocation.getCurrentPosition(function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      window.open(
        `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${store.latitude},${store.longitude}&travelmode=driving`
      );
    });
  };

  return (
    <>
      <div className="">
        <div className="flex justify-center">
          <img
            className="rounded-t-lg"
            src={product.imageUrl.split(";")[0]}
            alt="Product Image"
            onError={(e) => (e.target.src = noImageAvailable)}
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
            <CompatibleIcon compatible={product.storeLocations.length > 0} />
          </div>
        </div>
        <hr className="w-full my-2 border border-gray-500" />
        <button
          onClick={handleAddToPcBuild}
          className="w-full mr-2 focus:outline-none border-2 text-white bg-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5"
        >
          Add to PC build
        </button>
        <hr className="w-full my-2 border border-gray-500" />
        {product.storeLocations.map((store, i) => (
          <button
            onClick={() => handleStoreClick(store)}
            key={i}
            className="block w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
          >
            {store.name}
          </button>
        ))}
      </div>
    </>
  );
};

export default ProductDetails;
