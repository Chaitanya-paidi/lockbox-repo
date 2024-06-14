import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { host } from "../../url";

// Define the schema using Zod
const signupSchema = z.object({
  name: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  cpassword: z.string().min(6, "Password must be at least 6 characters long"),
}).refine((data) => data.password === data.cpassword, {
  message: "Passwords must match",
  path: ["cpassword"],
});

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const handleAccountcreation = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = signupSchema.safeParse(credentials);

    if (!validation.success) {
      // If validation fails, set errors
      const formattedErrors = validation.error.format();
      setErrors(formattedErrors);
      return;
    }

    const { name, email, password, cpassword } = credentials;
    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, cpassword }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      navigate("/logins");
    } else {
      // Handle server validation errors
      if (json.error === "Email already exists") {
        setErrors({ email: { _errors: ["Email already in use"] } });
      } else {
        alert("Invalid attempt");
      }
    }
  };

  const onchange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: null }); // Clear error for the field being updated
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
          Existing user?
          <button
            className="bg-cyan-700 text-white font-bold p-3 px-5 rounded-md ml-2"
            onClick={handleAccountcreation}
          >
            Login
          </button>
        </div>
        <div>
          <p className="text-3xl mt-20 mb-2">Create your digital vault</p>

          <form className="max-w-sm mx-auto mt-2" onSubmit={handleSubmit}>
            <div className="mb-5 text-left">
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Username
              </label>
              <input
                name="name"
                value={credentials.name}
                type="text"
                id="name"
                onChange={onchange}
                className={`bg-gray-50 border ${errors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500`}
                placeholder="Ram"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name._errors[0]}</p>}
            </div>
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
                onChange={onchange}
                className={`bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500`}
                placeholder="name@gmail.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email._errors[0]}</p>}
            </div>

            <div className="mb-5 text-left relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Create a password
              </label>
              <input
                name="password"
                value={credentials.password}
                type={showPassword ? "text" : "password"}
                id="password"
                onChange={onchange}
                className={`bg-gray-50 border ${errors.password ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500`}
              />
              <span className="absolute right-3 top-10 cursor-pointer" onClick={togglePasswordVisibility}>
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
              {errors.password && <p className="text-red-500 text-sm">{errors.password._errors[0]}</p>}
            </div>
            <div className="mb-5 text-left relative">
              <label
                htmlFor="cpassword"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm your password
              </label>
              <input
                name="cpassword"
                value={credentials.cpassword}
                type={showCPassword ? "text" : "password"}
                id="cpassword"
                onChange={onchange}
                className={`bg-gray-50 border ${errors.cpassword ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-cyan-500 dark:focus:border-cyan-500`}
              />
              <span className="absolute right-3 top-10 cursor-pointer" onClick={toggleCPasswordVisibility}>
                {showCPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </span>
              {errors.cpassword && <p className="text-red-500 text-sm">{errors.cpassword._errors[0]}</p>}
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

export default Signup;
