import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { host } from "../../url";
import Loader from "../Loader";

function Login() {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [erroremail, setErroremail] = useState(false);
  const [errorpassword, setErrorpassword] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleAccountCreation = () => {
    navigate("/signup");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    setLoader(false);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/logins");
    } else {
      if (json.error === "Invaild credentilas1") {
        setErroremail(true);
        setErrorpassword(false);
        setError("Email doesn't exists");
      }
      if (json.error === "Invalid credentials2") {
        setErrorpassword(true);
        setErroremail(false);
        setError("Password is incorrect");
      }
      // else {
      //   alert("Server error");
      // }
    }
  };

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setError(""); // Clear error when user starts typing
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex">
      <div className="hidden sm:block">
        <div className="w-1/2 place-content-center h-[550px] items-center">
          <p className="text-7xl font-bold text-left p-5">Welcome to Lockbox</p>
          <p className="text-2xl text-left p-5">
            Your safe haven for storing passwords and sensitive information
          </p>
        </div>
      </div>

      <div className="w-1/2">
        <div>
          Don't have an account?
          <button
            className="bg-cyan-700 text-white font-bold p-3 rounded-md ml-2"
            onClick={handleAccountCreation}
          >
            Create an account
          </button>
        </div>
        <div>
          <p className="text-3xl mt-20">Login now</p>

          <form className="max-w-sm mx-auto" onSubmit={handleSubmit}>
            {/* {error && <p className="text-red-500 text-sm mb-5">{error}</p>} */}
            <div className="mb-5 text-left">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                name="email"
                value={credentials.email}
                type="email"
                id="email"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-cyan-700 dark:border-cyan-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                placeholder="name@gmail.com"
                required
              />
              {error && erroremail && (
                <p className="text-red-500 text-sm mb-5">{error}</p>
              )}
            </div>
            <div className="mb-5 text-left relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                name="password"
                value={credentials.password}
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500"
                required
              />
              {error && errorpassword && (
                <p className="text-red-500 text-sm mb-5">{error}</p>
              )}
              <div
                className="absolute top-10 right-0 pr-3 flex items-center cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <div className="">
                    <FaRegEyeSlash />
                  </div>
                ) : (
                  <div>
                    <FaRegEye />
                  </div>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-cyan-700 hover:bg-cyan-800 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
