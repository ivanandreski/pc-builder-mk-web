import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from "./NavBar";

const HomeLayout: FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <main className="max-w-screen-xl mx-auto mt-2 p-4">
      <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;