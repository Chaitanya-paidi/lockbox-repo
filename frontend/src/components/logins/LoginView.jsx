import React, { useContext, useState } from "react";
import LoginContext from "../../context/logins/LoginContext";

function LoginView(props) {
  const context = useContext(LoginContext);
  const { addLogin } = context;

  const [login, setLogin] = useState({
    website: "",
    url: "",
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addLogin(login.website, login.url, login.username, login.password, );
    setLogin({ website: "", url: "", username: "",  password: "",});
    props.setShowForm(false)
  };
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="flex items-center justify-center mt-10 ">
        <form className="flex flex-col w-[400px]" onSubmit={handleSubmit}>
          <label className="text-left">Website</label>
          <input
            type="text"
            placeholder="website"
            name="website"
            className="border-2 border-black p-2 mb-2 rounded-md bg-white"
            onChange={handleChange}
              value={login.website}
            required
          />
          <label className="text-left">url</label>
          <input
            type="text"
            placeholder="url"
            name="url"
            className="border-2 border-black p-2 mb-2 rounded-md"
            onChange={handleChange}
              value={login.url}
            required
          />
          <label className="text-left">username</label>
          <input
            type="text"
            placeholder="username"
            name="username"
            className="border-2 border-black p-2 mb-2 rounded-md"
            onChange={handleChange}
              value={login.username}
            required
          />
          <label className="text-left">password</label>
          <input
            type="password"
            placeholder="password"
            name="password"
            className="border-2 border-black p-2 mb-2 rounded-md"
            onChange={handleChange}
              value={login.password}
            required
          />
          <button
            type="submit"
            className="bg-cyan-700 border-2 border-white px-5 py-3 text-white mt-4"

            //   disabled={login.website.length<1 || login.url.length<1}
          >
            Add Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginView;
