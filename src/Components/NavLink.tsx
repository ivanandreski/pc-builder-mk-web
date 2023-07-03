import React from "react";

import { Link } from "react-router-dom";

interface NavLinkProps {
  name: string;
  route: string;
  setShow: (value: boolean) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ name, route, setShow }) => {
  const handleClick = () => {
    setShow(false);
  };

  return (
    <li>
      <Link
        to={route}
        onClick={handleClick}
        className="block py-2 pl-3 pr-4 text-gray-900 rounded bg-gray-100 hover:bg-gray-200"
      >
        {name}
      </Link>
    </li>
  );
};

export default NavLink;
