import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import mainContext from "../context/mainContext";

function Toolbar() {
  const { user, setUser } = useContext(mainContext);
  const nav = useNavigate();

  function logout() {
    setUser(null);
    nav("/");
  }
  return (
    <div className="toolbar d-flex center">
      <h1>Kinokinas - Online seat reservation</h1>
      {user && (
        <div className="d-flex navigation">
          <div>Money: {user.money.toFixed(2)} $</div>
          <div onClick={logout}>LogOut</div>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
