import React from "react";
import { useRef, useState } from "react";

function Register() {
  const [error, setError] = useState(null);
  const inEmail = useRef();
  const inPass1 = useRef();
  const inPass2 = useRef();
  const inAge = useRef();

  function registerUser() {
    const user = {
      email: inEmail.current.value,
      pass1: inPass1.current.value,
      pass2: inPass2.current.value,
      age: inAge.current.value,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    };
    fetch("http://localhost:4000/register", options)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) return setError(data.message);

        setError(data.message);
      });
  }

  return (
    <div className="d-flex flex-column inputs center">
      <h3>Register:</h3>
      <input ref={inEmail} type="text" placeholder="email" />
      <input ref={inPass1} type="password" placeholder="pass1" />
      <input ref={inPass2} type="password" placeholder="pass2" />
      <input ref={inAge} type="text" placeholder="age" />

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button onClick={registerUser}>REGISTER</button>
    </div>
  );
}

export default Register;
