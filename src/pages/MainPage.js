import React from "react";
import Login from "../components/Login";
import Register from "../components/Register";

function MainPage() {
  return (
    <div className="d-flex log-Reg">
      <Register />
      <Login />
    </div>
  );
}

export default MainPage;
