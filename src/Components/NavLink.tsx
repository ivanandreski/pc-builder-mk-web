import React from "react";
import { Link } from "react-router-dom";

interface NavLinkProps {
    activeRoute: boolean;
    route: string;
    setShow: (value: boolean) => void;
    children: string | JSX.Element | JSX.Element[];
}

const NavLink: React.FC<NavLinkProps> = ({
    activeRoute,
    route,
    setShow,
    children,
}) => {

    const handleClick = () => {
        setShow(false);
    };

    return (
      <li className={`${activeRoute && 'border-b-2 border-purple-600'}`}>
          <Link
              to={route}
              onClick={handleClick}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
              {children}
          </Link>
      </li>
  );
};

export default NavLink;
