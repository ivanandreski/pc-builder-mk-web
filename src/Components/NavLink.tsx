import React from "react";

import { Link } from "react-router-dom";

interface NavLinkProps {
    // name: string;
    route: string;
    setShow: (value: boolean) => void;
    children: string | JSX.Element | JSX.Element[];
}

const NavLink: React.FC<NavLinkProps> = ({
    // name,
    route,
    setShow,
    children,
}) => {
    const handleClick = () => {
        setShow(false);
    };

    return (
      <li>
          <Link
              to={route}
              onClick={handleClick}
              className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
          >
              {children}
          </Link>
      </li>
  );

    // return (
    //     <li>
    //         <Link
    //             to={route}
    //             onClick={handleClick}
    //             className="block py-2 pl-3 pr-4 text-gray-100 bg-gray-500 hover:bg-gray-400 border-b-2 border-l-2 border-r-2 border-gray-100"
    //         >
    //             {name}
    //         </Link>
    //     </li>
    // );
};

export default NavLink;
