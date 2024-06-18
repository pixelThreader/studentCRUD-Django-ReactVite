import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <nav className="sidebar">
            <ul>
                <li>
                    <NavLink
                        exact="true"
                        to="/"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/add-student"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Add Student
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/list"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        List
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/search"
                        className={({ isActive }) =>
                            isActive ? "active" : undefined
                        }
                    >
                        Search
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
