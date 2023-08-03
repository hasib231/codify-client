import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import useAdmin from "../../../hooks/useAdmin";
import useInstructor from "../../../hooks/useInstructor";
import useStudent from "../../../hooks/useStudent";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const [isStudent] = useStudent();

  const handleLogOut = () => {
    logOut()
      .then()
      .catch((error) => console.log(error));
  };

  const navItems = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/allInstructors">Instructors</Link>
      </li>
      <li>
        <Link to="/classes"> Classes</Link>
      </li>
      <li>
        <Link to="/problems"> Problems</Link>
      </li>
      <li>
        <Link to="/addProblem">Add Problems</Link>
      </li>

      {isAdmin && (
        <li>
          <Link to="/dashboard/adminhome">Dashboard</Link>
        </li>
      )}
      {isInstructor && (
        <li>
          <Link to="/dashboard/instructorhome">Dashboard</Link>
        </li>
      )}
      {isStudent && (
        <li>
          <Link to="/dashboard/studenthome">Dashboard</Link>
        </li>
      )}

      {user ? (
        <>
          <li>
            <button onClick={handleLogOut}>Log Out</button>
          </li>
        </>
      ) : (
        <li>
          <Link to="/login">Login</Link>
        </li>
      )}
    </>
  );
  return (
    <div className="navbar bg-slate-100">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            {navItems}
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-3xl my-text ms-12">
          Sports Club
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end me-12">
        {user?.photoURL && (
          <div
            className="w-10 rounded-full tooltip tooltip-left"
            data-tip={user.displayName}
          >
            <img className="w-10 rounded-full" src={user.photoURL} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
