import React, { useContext } from "react";
import LoginContext from "../../context/logins/LoginContext";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function LoginItem(props) {
  const context = useContext(LoginContext);
  const { deleteLogin } = context;
  const { login, updateLogin } = props;

  const slicedWebsite =
    login && login.website
      ? login.website.slice(0, 8) + (login.website.length > 8 ? "..." : "")
      : "";
  const slicedUsername =
    login && login.username
      ? login.username.slice(0, 10) + (login.username.length > 10 ? "..." : "")
      : "";

  return (
    <div className="relative max-w-sm rounded overflow-hidden shadow-lg bg-white flex item m-3 pt-5 border-3">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{slicedUsername}</div>
        <p className="text-gray-700 text-base">{slicedWebsite}</p>
        <div className="flex p-2 text-2xl absolute right-2 top-1">
          <div
          className="cursor-pointer"
          onClick={()=>(deleteLogin(login._id))}
          >
            <MdDelete />
          </div>
          <div
          onClick={()=>{updateLogin(login)}}
            className="cursor-pointer"
          >
            <FaEdit />
          </div>
        </div>
      </div>
    </div>

  );
}

export default LoginItem;
