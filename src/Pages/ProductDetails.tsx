import React, { FC } from "react";
import { useLocation } from "react-router-dom";
import noImageAvailable from "../assets/no-image-available.jpg";
import { Product } from "../Models/Product";

import CompatibleIcon from "../Components/CompatibleIcon";

const ProductDetails: FC = () => {
  const location = useLocation();
  const product: Product = location.state;

  return (
    <div className="">
      <div className="flex justify-center">
        <img
          className="rounded-t-lg"
          src={product.imageUrl}
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
        <div className="w-1/2 mr-2 focus:outline-none border-2 border-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5 mb-2">
          {product.price} MKD
        </div>
        <div className="w-1/2 ml-2 focus:outline-none border-2 border-purple-700 font-medium rounded-lg text-lg text-center px-5 py-2.5 mb-2">
          Available:{" "}
          <CompatibleIcon compatible={product.storeLocations.length > 0} />
        </div>
      </div>
      <hr className="w-full my-2 border border-gray-500" />
      {product.storeLocations.map((store, i) => (
        <a
          href={`https://www.google.com/maps/dir/?api=1&origin=${43},${43}&destination=${43},${43}&travelmode=driving`}
          key={i}
          className="block w-full text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
        >
          {store.name}
        </a>
      ))}
    </div>
  );
};

export default ProductDetails;
