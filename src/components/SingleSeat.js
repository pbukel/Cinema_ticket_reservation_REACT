import React from "react";
import logo from "../seat-icon.svg";
import { useContext } from "react";
import mainContext from "../context/mainContext";

function SingleSeat({ index, seat }) {
  const { socet, selectedMovieIndex } = useContext(mainContext);
  function setSelected() {
    if (seat.reservation) return;
    if (seat.selected && seat.whoSelected !== socet.id) return;
    // console.log(seat);
    const vieta = {
      movie: selectedMovieIndex,
      seat: index,
    };
    socet.emit("setSelected", vieta);
  }
  const style = {
    backgroundColor: seat.reservation
      ? "red"
      : seat.selected
      ? seat.whoSelected === socet.id
        ? "yellow"
        : "lightgrey"
      : "green",
  };

  return (
    <div onClick={setSelected} className="seat-logo">
      <img style={style} src={logo} alt="" />
    </div>
  );
}

export default SingleSeat;
