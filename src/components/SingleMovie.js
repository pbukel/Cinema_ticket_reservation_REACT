import React from "react";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import mainContext from "../context/mainContext";

function SingleMovie({ item, index, from }) {
  const [error, setError] = useState();
  const { setSelectedMovieIndex, user } = useContext(mainContext);
  const nav = useNavigate();

  function selectMovie() {
    if (user.age >= item.age) {
      setSelectedMovieIndex(index);
      setError(null);

      nav("/move-reservation");
    } else {
      return setError("Jus per jaunas siam filmui. ");
    }
  }
  return (
    <div
      onClick={from === "reservation" ? () => {} : selectMovie}
      className="d-flex flex-column move center"
    >
      <img src={item.image} alt="" />
      <h4>{item.titleLtu}</h4>
      {from === "reservation" ? (
        ""
      ) : (
        <div className="available">
          Seats available:{" "}
          {item.seats.filter((x) => x.reservation === false).length} of{" "}
          {item.seats.length}
        </div>
      )}
      <div style={{ fontSize: "10px" }}>
        available from {item.age} years old
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
}

export default SingleMovie;
