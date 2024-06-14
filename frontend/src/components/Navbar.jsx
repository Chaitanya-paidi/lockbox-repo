import React, { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { FaTimes } from "react-icons/fa";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Navbar() {

  let navigate = useNavigate()
  const [activeButton, setActiveButton] = useState();
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setClick(false);
  };

  const handleLogout = () =>{
    localStorage.removeItem('token')
    navigate("/")
  }

  const content = (
    <>
      <div className="lg:hidden block absolute mt-6 top-16 w-full left-0 right-0 bg-slate-900 transition">
        <ul className="text-center text-xl p-20 ">
          <Link to="/logins">
            <li className="my-4 py-4 border-b border-slate-800 hover: bg-slate-800 hover:rounded">
              Logins
            </li>
          </Link>
          <Link to="/notes ">
            <li className="my-4 py-4 border-b border-slate-800 hover: bg-slate-800 hover:rounded">
              Notes
            </li>
          </Link>
          <Link to="/logout">
            <li className="my-4 py-4 border-b border-slate-800 hover: bg-slate-800 hover:rounded">
              Logout
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
  return (
    
    <nav>
      <div className="h-10vh flex justify-between z-52 text-black lg:py-2 px-15 py-4 flex-1 ">
        <div className="flex items-center flex-1">
          <span className="text-3xl font-bold">Lockbox</span>
          {/* <img src="/icon.ico" alt="" /> */}
        </div>
        <div className="lg:flex md:flex lg: flex-1 items-center justify-end font-normal hidden">
          <div className="flex-10 ">
            <ul className="flex gap-8 mr-16 text-[18px]">
              <li
                className={`hover:text-cyan-600 transition cursor-pointer p-2 ${
                  activeButton === "logins" && "text-cyan-600"
                }`}
                onClick={() => handleButtonClick("logins")}
              >
                <Link to="/logins">Logins</Link>
              </li>
              <li
                className={`hover:text-cyan-600 transition cursor-pointer p-2 ${
                  activeButton === "notes" && "text-cyan-600"
                }`}
                onClick={() => handleButtonClick("notes")}
              >
                <Link to="/notes">Notes</Link>
              </li>
              
              <li
                className={`bg-cyan-600 p-2  transition border-b-3 cursor-pointer rounded-md`}
                onClick={() => handleLogout("logout")}
              >
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
        <div>{click && content}</div>
        <button className="block sm:hidden transition" onClick={handleClick}>
          {click ? <FaTimes /> : <CiMenuBurger />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
