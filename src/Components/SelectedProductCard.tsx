import React, { FC } from "react";
import { Link } from "react-router-dom";

import RouteNames from "../Config/RouteNames";
import DividerTitle from "./DividerTitle";
import { Product } from "../Models/Product";
import noImageAvailable from "../assets/no-image-available.jpg";

interface SelectedProductCardProps {
  title: string;
  product: Product;
  handleRemove: (product: Product) => void;
}

const SelectedProductCard: FC<SelectedProductCardProps> = ({
  title,
  product,
  handleRemove,
}) => {
  return (
    <>
      <DividerTitle title={title} />
      <div className="flex mb-2">
        <div className="w-2/6 mr-1">
          <img
            className="rounded-t-lg"
            src={product.imageUrl.split(";")[0]}
            alt="Product Image"
            onError={(e) => (e.target.src = noImageAvailable)}
          />
        </div>
        <div className="w-4/6 ml-1 text-center">
          <span className="text-gray-500 align-middle font-semibold">
            {product.name}
          </span>
        </div>
      </div>
      <div className="flex mb-2">
        <div className="w-1/2 mr-2 text-gray-500 font-semibold text-center text-lg">
          Price: {product.price} MKD
        </div>
        <div className="w-1/2 ml-2 text-gray-500 font-semibold text-center text-lg">
          Store: {product.storeName}
        </div>
      </div>
      <div className="flex mb-2">
        <Link
          to={RouteNames.ProductDetails}
          state={product}
          className="mr-2 text-center w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Details
        </Link>
        <button
          onClick={() => handleRemove(product)}
          className="ml-2 w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Remove
        </button>
      </div>
    </>
  );
};

export default SelectedProductCard;
