import { FunctionComponent } from "react";
import { useState } from "react";

import RouteNames from "../Config/RouteNames";

import useGetUser from "../Hooks/useGetUser";

import NavLink from "../Components/NavLink";

const NavBar: FunctionComponent = () => {
  const [show, setShow] = useState(false);

  const getUser = useGetUser();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShow(false);
  };

  return (
    <nav className="bg-gray-100">
      <div className="border-gray-200 max-w-screen-xl flex flex-wrap items-center mx-auto py-4">
        <button
          onClick={() => setShow((show) => !show)}
          type="button"
          className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="ml-3 flex items-center">
          <span className="text-gray-500 self-center text-2xl font-semibold whitespace-nowrap">
            Current page name
          </span>
        </div>
        <div className={`w-full ${show ? "" : "hidden"}`} id="navbar-hamburger">
          <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50">
            {getUser ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 pl-3 pr-4 text-gray-900 rounded bg-gray-100 hover:bg-gray-200"
                >
                  Logout
                </button>
              </li>
            ) : (
              <>
                <NavLink
                  name="Register"
                  route={RouteNames.Register}
                  setShow={setShow}
                />
                <NavLink
                  name="Login"
                  route={RouteNames.Login}
                  setShow={setShow}
                />
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;