import { Routes, Route, HashRouter } from "react-router-dom";

import RouteNames from "./Config/RouteNames";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ProductDetails from "./Pages/ProductDetails";

import Home from "./Home";

import Layout from "./Layout/Layout";
import PcBuild from "./Pages/PcBuild";
import Products from "./Pages/Products";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path={RouteNames.Home} element={<Layout />}>
          <Route index element={<PcBuild />} />
          <Route path={RouteNames.PcBuild} element={<PcBuild />} />
          <Route path={RouteNames.Products} element={<Products />} />
          <Route path={RouteNames.ProductDetails} element={<ProductDetails />} />
          <Route path={RouteNames.Register} element={<Register />} />
          <Route path={RouteNames.Login} element={<Login />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
