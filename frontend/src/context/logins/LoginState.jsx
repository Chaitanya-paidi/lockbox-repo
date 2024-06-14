import react, { useState } from "react";
import LoginContext from "./LoginContext";
import { host } from "../../url";

const LoginState = (props) => {
  const LoginsInitial = [];

  const [logins, setLogins] = useState(LoginsInitial);

  // Get all Logins
  const getLogins = async () => {
    //TODO: API call
    const response = await fetch(`${host}/api/logins/fetchalllogin`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = await response.json();
    // console.log(json);
    setLogins(json)
  };

  // Add a Login
  const addLogin = async (website, url, username, password) => {
    //TODO: API call
    const response = await fetch(`${host}/api/logins/addlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({website, url, username, password}),
    });
    
    const login = await response.json()
    setLogins(logins.concat(login));
  };

  // Delete a login
  const deleteLogin = async(id) => {
    //TODO: API call
    const response = await fetch(`${host}/api/logins/deletelogin/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
    });
    const json = response.json();
    // console.log(json)
    const newLogins = logins.filter((login) => {
      return login._id !== id;
    });
    setLogins(newLogins);
  };

  // Edit a Login
  const editLogin = async (id, website, url, username, password) => {
    //TODO: API call

    const response = await fetch(`${host}/api/logins/updatelogin/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          localStorage.getItem('token'),
      },
      body: JSON.stringify({ website, url, username, password }),
    });
    // const json = await response.json();
    // console.log(json)

    let newLogins = JSON.parse(JSON.stringify(logins))
    //Logic to edit in client
    for (let index = 0; index < newLogins.length; index++) {
      const element = newLogins[index];
      if (element._id === id) {
        newLogins[index].website = website;
        newLogins[index].url = url;
        newLogins[index].username = username;
        newLogins[index].password = password;
      break;
      }   
    }
    setLogins(newLogins)
  };

  return (
    <LoginContext.Provider value={{ logins, addLogin, deleteLogin, editLogin, getLogins }}>
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginState;
     