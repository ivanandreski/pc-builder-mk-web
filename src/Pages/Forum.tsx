// @ts-nocheck

import ProductCard from "../Components/ProductCard";
import Spinner from "../Components/Spinner";
import ProductFilter from "../Components/ProductFilter";
import axios from "../axios/axios";
import { FunctionComponent, useEffect, useState, createRef } from "react";

import { Product } from "../Models/Product";

const Forum: FunctionComponent = () => {
    const [isLoading, setIsLoading] = useState(true);

    return <div>FOrum</div>;
};

export default Forum;
