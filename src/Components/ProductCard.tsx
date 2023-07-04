import React, { FC } from "react";
import noImageAvailable from "../assets/no-image-available.jpg";
import { Link } from "react-router-dom";
import RouteNames from "../Config/RouteNames";
import { Product } from "../Models/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-lg shadow">
      <Link to={RouteNames.ProductDetails} state={product}>
        <div className="flex justify-center">
          <img
            className="rounded-t-lg"
            src={product.imageUrl}
            alt="Product Image"
            onError={(e) => (e.target.src = noImageAvailable)}
          />
        </div>
        <div className="p-5">
          <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900">
            {product.name}
          </h5>
          <div className="focus:outline-none text-white bg-purple-700 font-medium rounded-lg text-sm text-center px-5 py-2.5 mb-2">
            {product.price} MKD
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
