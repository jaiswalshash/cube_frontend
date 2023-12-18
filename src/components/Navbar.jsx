import { React, useState, useEffect } from "react";
import { FaSun, FaMoon, FaUser, FaSignOutAlt } from "react-icons/fa";
import { isLoggedIn } from "../helper/auth";
import { useNavigate } from "react-router-dom";
import todo from "../assets/todo.png";

import "./navbar.css";
import Loader from "./Loader";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const [auth, setAuth] = useState(false);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (isLoggedIn()) setAuth(true); 
  }, );

  const toggleDarkMode = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    setLoader(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/");
      setLoader(false);
      window.location.reload();
    }, 2000);
  };
  return (
    <div
      id="navbar"
      className="flex items-center justify-between absolute
     w-full h-14 px-16 bg-slate-300 bg-opacity-40 backdrop-filter 
     backdrop-blur-18 border border-opacity-20 border-white top-0"
    >
      {loader && (
        <div className="fixed inset-0">
          <Loader />
        </div>
      )}
      <div className="flex gap-2 font-bold dark:text-white text-gray-700">
        <img src={todo} alt="" width={25} height={15} />
        <span>Catalyst</span>{" "}
      </div>

      <div className="flex items-center justify-between gap-5">
        <div>
          {auth ? (
            <FaSignOutAlt
              onClick={() => handleLogout()}
              className="text-2xl dark:text-white cursor-pointer"
            />
          ) : (
            <FaUser className="text-2xl dark:text-white" />
          )}
        </div>
        {theme === "light" ? (
          <FaSun
            onClick={toggleDarkMode}
            className="text-yellow-400 text-2xl cursor-pointer"
          />
        ) : (
          <FaMoon
            onClick={toggleDarkMode}
            className="text-black text-2xl cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default Navbar;
