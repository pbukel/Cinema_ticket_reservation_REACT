import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import mainContext from "../context/mainContext";

function Login() {
  const nav = useNavigate();
  const [error, setError] = useState(null);
  const inEmail = useRef();
  const inPass = useRef();
  const { setUser, socet } = useContext(mainContext);

  function loginAction() {
    const user = {
      email: inEmail.current.value,
      pass: inPass.current.value,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    };

    fetch("http://localhost:4000/login", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return setError(data.message);
        setUser(data.data);
        socet.emit("login", data.data);
        setError(null);
        nav("/movies");
      });
  }
  return (
    <div className="d-flex flex-column inputs center">
      <h3>Login</h3>
      <input ref={inEmail} type="text" placeholder="email" />
      <input ref={inPass} type="password" placeholder="pass" />

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button onClick={loginAction}>Login</button>
    </div>
  );
}

export default Login;
