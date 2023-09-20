import { FunctionComponent, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import RouteNames from "../Config/RouteNames";

import useGetUser from "../Hooks/useGetUser";

import NavLink from "../Components/NavLink";

const NavBar: FunctionComponent = () => {
    const [show, setShow] = useState(false);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const getUser = useGetUser();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem("user");
        setShow(false);
        document.location.reload();
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target as Node)
            ) {
                // Clicked outside the dropdown, so close it
                setShow(false);
            }
        }

        // Add event listener when the component mounts
        document.addEventListener("click", handleClickOutside);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={sidebarRef} className="lg:w-64">
            <button
                onClick={() => setShow((show) => !show)}
                type="button"
                className="inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
                <span className="sr-only">Open sidebar</span>
                <svg
                    className="w-6 h-6"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        clipRule="evenodd"
                        fillRule="evenodd"
                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                    ></path>
                </svg>
            </button>

            <aside
                className={`w-64 h-screen top-0 left-0 absolute lg:block z-40 lg:z-0 transition-transform ${
                    show ? "transofrm-none" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="overflow-y-auto py-5 px-3 h-full bg-white border-r border-gray-200">
                    <ul className="space-y-2">
                        <li>
                            <span className="flex items-center p-2 text-lg font-semibold text-gray-900 rounded-lg">
                                PC Builder MK
                            </span>
                        </li>
                    </ul>
                    <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200">
                        <NavLink
                            route={RouteNames.PcBuild}
                            setShow={setShow}
                            activeRoute={
                                location.pathname == RouteNames.PcBuild ||
                                location.pathname == RouteNames.Home
                            }
                        >
                            <svg
                                className={`w-6 h-6 ${
                                    location.pathname == RouteNames.PcBuild ||
                                    location.pathname == RouteNames.Home
                                        ? "text-purple-600"
                                        : "text-gray-400"
                                } transition duration-75 group-hover:text-gray-900`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M20 9V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v7h20ZM0 11v2a2 2 0 0 0 2 2h7v3H6a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2h-3v-3h7a2 2 0 0 0 2-2v-2H0Z" />
                            </svg>
                            <span className="ml-3">PC Build</span>
                        </NavLink>
                        <NavLink
                            route={RouteNames.Products}
                            setShow={setShow}
                            activeRoute={
                                location.pathname == RouteNames.Products
                            }
                        >
                            <svg
                                className={`w-6 h-6 ${
                                    location.pathname == RouteNames.Products
                                        ? "text-purple-600"
                                        : "text-gray-400"
                                } transition duration-75 group-hover:text-gray-900`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                            </svg>
                            <span className="ml-3">Products</span>
                        </NavLink>
                        {getUser && (
                            <NavLink
                                route={RouteNames.Forum}
                                setShow={setShow}
                                activeRoute={
                                    location.pathname == RouteNames.Forum
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${
                                        location.pathname == RouteNames.Forum
                                            ? "text-purple-600"
                                            : "text-gray-400"
                                    } transition duration-75 group-hover:text-gray-900`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                <span className="ml-3">Forum</span>
                            </NavLink>
                        )}
                    </ul>
                    {getUser?.role == "ADMIN" && (
                        <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200">
                            <NavLink
                                route={RouteNames.StoreLocationManager}
                                setShow={setShow}
                                activeRoute={
                                    location.pathname ==
                                    RouteNames.StoreLocationManager
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${
                                        location.pathname ==
                                        RouteNames.StoreLocationManager
                                            ? "text-purple-600"
                                            : "text-gray-400"
                                    } transition duration-75 group-hover:text-gray-900`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.876.517A1 1 0 0 0 17 0H3a1 1 0 0 0-.871.508C1.63 1.393 0 5.385 0 6.75a3.236 3.236 0 0 0 1 2.336V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.044a3.242 3.242 0 0 0 1-2.294c0-1.283-1.626-5.33-2.124-6.233ZM15.5 14.7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1-.8-.8v-2.4a.8.8 0 0 1 .8-.8h2.4a.8.8 0 0 1 .8.8v2.4ZM16.75 8a1.252 1.252 0 0 1-1.25-1.25 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0A1.252 1.252 0 0 1 3.25 8 1.266 1.266 0 0 1 2 6.75C2.306 5.1 2.841 3.501 3.591 2H16.4A19.015 19.015 0 0 1 18 6.75 1.337 1.337 0 0 1 16.75 8Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Store Location Manager
                                </span>
                            </NavLink>
                            {/* <NavLink
                                route={RouteNames.UploadScrapedData}
                                setShow={setShow}
                                activeRoute={
                                    location.pathname ==
                                    RouteNames.UploadScrapedData
                                }
                            >
                                <svg
                                    className={`w-6 h-6 ${
                                        location.pathname ==
                                        RouteNames.UploadScrapedData
                                            ? "text-purple-600"
                                            : "text-gray-400"
                                    } transition duration-75 group-hover:text-gray-900`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                    <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                    <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                </svg>
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                    Upload Scraped Data
                                </span>
                            </NavLink> */}
                        </ul>
                    )}
                    <ul className="pt-5 mt-5 space-y-2 border-t border-gray-200">
                        {getUser ? (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex w-full items-center p-2 text-base font-normal text-gray-900 rounded-lg hover:bg-gray-100 group"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-6 h-6 text-gray-400 transition duration-75 group-hover:text-gray-900"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                                    </svg>
                                    <span className="ml-3">Logout</span>
                                </button>
                            </li>
                        ) : (
                            <>
                                <NavLink
                                    route={RouteNames.Login}
                                    setShow={setShow}
                                    activeRoute={
                                        location.pathname == RouteNames.Login
                                    }
                                >
                                    <svg
                                        className={`w-6 h-6 ${
                                            location.pathname ==
                                            RouteNames.Login
                                                ? "text-purple-600"
                                                : "text-gray-400"
                                        } transition duration-75 group-hover:text-gray-900`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                                        />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Login
                                    </span>
                                </NavLink>
                                <NavLink
                                    route={RouteNames.Register}
                                    setShow={setShow}
                                    activeRoute={
                                        location.pathname == RouteNames.Register
                                    }
                                >
                                    <svg
                                        className={`w-6 h-6 ${
                                            location.pathname ==
                                            RouteNames.Register
                                                ? "text-purple-600"
                                                : "text-gray-400"
                                        } transition duration-75 group-hover:text-gray-900`}
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                                    </svg>
                                    <span className="flex-1 ml-3 whitespace-nowrap">
                                        Register
                                    </span>
                                </NavLink>
                            </>
                        )}
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default NavBar;
