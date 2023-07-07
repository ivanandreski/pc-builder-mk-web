import ProductCard from "../Components/ProductCard";
import ProductFilter from "../Components/ProductFilter";
import axios from "../axios/axios";
import React, {
  FunctionComponent,
  useEffect,
  useState,
  createRef,
} from "react";

import { Product } from "../Models/Product";

const Products: FunctionComponent = () => {
  const itemsRef = createRef<HTMLDivElement>();

  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(false);

  // filters
  const [category, setCategory] = useState("mb");
  const [search, setSearch] = useState("");
  const [available, setAvailable] = useState<number>(0);
  const [store, setStore] = useState<string>("");

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [page]);

  useEffect(() => {
    setPage(0);
    fetchProducts();
  }, [category, search, available, store]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("product", {
        params: {
          page: page,
          category: category,
          sortParameter: "price_asc",
          ...(search.length > 0 && { search: search }),
          ...(store.length > 0 && { store: store }),
          ...(available != 0 && {
            isAvailable: available == -1 ? false : true,
          }),
        },
      });

      const parsedProducts = response.data.content.content.map(
        (p: object) => new Product(p)
      );
      setProducts(parsedProducts);
      setIsFirst(response.data.content.first);
      setIsLast(response.data.content.last);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <div>
      <div className="">
        <ProductFilter
          category={category}
          setCategory={setCategory}
          search={search}
          setSearch={setSearch}
          available={available}
          setAvailable={setAvailable}
          store={store}
          setStore={setStore}
        />
      </div>
      <div ref={itemsRef}>
        <div className="flex mb-2">
          <div className="flex-initial w-2/6">
            <button
              disabled={isFirst}
              onClick={() => {
                setPage((page) => page - 1);
              }}
              className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Previous
            </button>
          </div>
          <div className="flex-initial w-2/6 px-2">
            <div className="w-full text-center font-bold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5">
              {page + 1}
            </div>
          </div>
          <div className="flex-initial w-2/6">
            <button
              disabled={isLast}
              onClick={() => {
                setPage((page) => page + 1);
              }}
              className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Next
            </button>
          </div>
        </div>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-2">
          {products.map((p, i) => (
            <ProductCard key={i} product={p} />
          ))}
        </div>
        <div className="flex">
          <div className="flex-initial w-2/6">
            <button
              disabled={isFirst}
              onClick={() => {
                setPage((page) => page - 1);
              }}
              className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Previous
            </button>
          </div>
          <div className="flex-initial w-2/6 px-2">
            <div className="w-full text-center font-bold focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5">
              {page + 1}
            </div>
          </div>
          <div className="flex-initial w-2/6">
            <button
              disabled={isLast}
              onClick={() => {
                setPage((page) => page + 1);
              }}
              className="w-full focus:outline-none text-white bg-purple-700 hover:bg-purple-800 disabled:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
