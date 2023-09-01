import { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';

import NavBar from "./NavBar";

const HomeLayout: FunctionComponent = () => {
  return (
    <div className="flex" style={{minWidth: '500px'}}>
      <NavBar />
      <main className="w-full lg:w-5/6 mx-auto mt-2 p-4 lg:p-10">
      <Outlet />
      </main>
    </div>
  );
};

export default HomeLayout;