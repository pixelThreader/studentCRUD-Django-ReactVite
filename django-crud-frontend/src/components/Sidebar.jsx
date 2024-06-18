import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <nav className="sidebar flex flex-col rounded-md header-s-dbms p-2" style={{ width: '300px' }}>
            <ul className="h-full">
                <li className="mb-2">
                    <NavLink
                        exact="true"
                        to="/"
                        className={({ isActive }) =>
                            `block w-full h-full p-3 rounded-md text-center cursor-pointer text-lime-200 hover:text-cyan-400 hover:bg-gray-700 ${isActive ? "bg-gray-700 text-cyan-400" : "landing-clr"
                            }`
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink
                        to="/add-student"
                        className={({ isActive }) =>
                            `block w-full h-full p-3 rounded-md text-center cursor-pointer text-lime-200 hover:text-cyan-400 hover:bg-gray-700 ${isActive ? "bg-gray-700 text-cyan-400" : "landing-clr"
                            }`
                        }
                    >
                        Add Student
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink
                        to="/list"
                        className={({ isActive }) =>
                            `block w-full h-full p-3 rounded-md text-center cursor-pointer text-lime-200 hover:text-cyan-400 hover:bg-gray-700 ${isActive ? "bg-gray-700 text-cyan-400" : "landing-clr"
                            }`
                        }
                    >
                        List
                    </NavLink>
                </li>
                <li className="mb-2">
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            `block w-full h-full p-3 rounded-md text-center cursor-pointer text-lime-200 hover:text-cyan-400 hover:bg-gray-700 ${isActive ? "bg-gray-700 text-cyan-400" : "landing-clr"
                            }`
                        }
                    >
                        Search
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
