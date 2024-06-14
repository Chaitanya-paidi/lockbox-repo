import React, { useContext, useEffect, useState } from "react";
import LoginContext from "../../context/logins/LoginContext";
import LoginItem from "./LoginItem";
import LoginView from "./LoginView";
import Navbar from "../Navbar";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeDropper, FaEyeSlash } from "react-icons/fa";

function Logins() {
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  const { logins, getLogins, editLogin } = context;
  const [showForm,setShowForm] = useState(false)

  const [showModal, setShowModal] = useState(false);
  const [login, setLogin] = useState({
    ewebsite: "",
    eurl: "",
    eusername: "",
    epassword: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 10;

  useEffect(() => {
    if (localStorage.getItem("token")) getLogins();
    else {
      navigate("/");
    }
  }, []);

  const updateLogin = (currentLogin) => {
    setShowModal(!showModal);
    setLogin({
      id: currentLogin._id,
      ewebsite: currentLogin.website,
      eurl: currentLogin.url,
      eusername: currentLogin.username,
      epassword: currentLogin.password,
    });
  };

  const handleClick = () => {
    editLogin(
      login.id,
      login.ewebsite,
      login.eurl,
      login.eusername,
      login.epassword
    );
    setShowModal(false);
  };
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentLogins = logins.slice(indexOfFirstNote, indexOfLastNote);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [copyUsernameText, setCopyUsernameText] = useState("Copy");
  const [copyPasswordText, setCopyPasswordText] = useState("Copy");

  const copyToClipboard = (text, setCopyText) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyText("Copied!");
        setTimeout(() => {
          setCopyText("Copy");
        }, 2000); // Reset text after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const handleShowform = () =>{
    setShowForm(true)
  }

  return (
    <div>
      <Navbar />
      <button className={`relative max-w-sm shadow-lg bg-cyan-600 flex items m-3 ml-7 p-3 rounded-md ${showForm ? "hidden" : ""}`}  onClick={handleShowform}>Add new</button>
      {showForm && <LoginView showForm={showForm} setShowForm={setShowForm} />}
      {showModal && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t"></div>
                <div className="flex items-center justify-center">
                  <form className="flex flex-col w-[700px]">
                    <label className="text-left ml-5 mt-2">Edit website</label>
                    <input
                      type="text"
                      placeholder="website"
                      name="ewebsite"
                      className="border-2 border-black p-2 mb-2 ml-5 mr-5"
                      onChange={handleChange}
                      value={login.ewebsite}
                    />
                    <label className="text-left ml-5 mt-2">Edit url</label>
                    <input
                      type="text"
                      placeholder="url"
                      name="eurl"
                      className="border-2 border-black p-2 ml-5 mr-5"
                      onChange={handleChange}
                      value={login.eurl}
                    />
                    <label className="text-left ml-5 mt-2">Edit username</label>
                    <div className="relative flex items-center border-2 border-black p-2 mb-2 ml-5 mr-5">
                      <input
                        type="text"
                        placeholder="username"
                        name="eusername"
                        className="flex-grow outline-none"
                        onChange={handleChange}
                        value={login.eusername}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(login.eusername, setCopyUsernameText)
                        }
                        className="ml-2 focus:outline-none bg-cyan-600 p-2 rounded-md font-bold text-white"
                      >
                        {copyUsernameText}
                      </button>
                    </div>
                    <label className="text-left ml-5 mt-2">Edit password</label>
                    <div className="relative flex items-center border-2 border-black p-2 mb-2 ml-5 mr-5">
                      <input
                        type={showPassword ? "text" : "password"}
                        placeholder="password"
                        name="epassword"
                        className="flex-grow outline-none"
                        onChange={handleChange}
                        value={login.epassword}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="ml-2 focus:outline-none"
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          copyToClipboard(login.epassword, setCopyPasswordText)
                        }
                        className="ml-2 focus:outline-none bg-cyan-600 p-2 rounded-md font-bold text-white"
                      >
                        {copyPasswordText}
                      </button>
                    </div>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="bg-cyan-600 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleClick}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {!showForm && <div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 mt-4">
        {currentLogins.map((login) => {
          return (
            <LoginItem
              key={login._id}
              updateLogin={updateLogin}
              login={login}
            />
          );
        })}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from(
          { length: Math.ceil(logins.length / notesPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-cyan-600 text-white"
                  : "bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      </div> }
      
    </div>
  );
}

export default Logins;
