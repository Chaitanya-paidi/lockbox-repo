import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import NoteState from "./context/notes/NoteState";
// import LoginState from "./context/logins/LoginState";
import Notes from "./components/notes/Notes";
import Login from "./components/Landing/Login";
import Signup from "./components/Landing/Signup";
import Logins from "./components/logins/Logins";
import LoginState from "./context/logins/LoginState";
// import Logins from "./components/logins/Logins";

function App() {
  return (
    <>
      <NoteState>
        <LoginState>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} index></Route> 
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/logins" element={<Logins />}></Route>
              <Route path="/notes" element={<Notes/>}></Route>
            </Routes>
          </BrowserRouter>
        </LoginState>
      </NoteState>
    </>
  );
}

export default App;