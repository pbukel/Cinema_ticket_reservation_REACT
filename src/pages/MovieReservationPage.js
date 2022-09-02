import React from "react";
import { useContext, useEffect, useState } from "react";
import mainContext from "../context/mainContext";
import SingleMovie from "../components/SingleMovie";
import SingleSeat from "../components/SingleSeat";

function MovieReservationPage() {
  const {
    socet,
    selectedMovieIndex,
    selectedSeats,
    setSelectedSeats,
    user,
    setUser,
  } = useContext(mainContext);
  const [move, setMovie] = useState([]);

  useEffect(() => {
    socet.emit("getSingleMovieData", selectedMovieIndex);
    socet.on("updateMovieData", (data) => {
      if (selectedMovieIndex === data.index) {
        setMovie(data.data);
      }
    });
    socet.on("mylSectedSeats", (data) => {
      setSelectedSeats(data);
    });
  }, []);

  function buyTickets() {
    if (user.money < suma) return alert("Nepakankamai pinigu!");
    socet.emit("buyTikets", { index: selectedMovieIndex, email: user.email });

    const useris = {
      moneyToTake: suma.toFixed(2),
      email: user.email,
    };

    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(useris),
    };

    fetch("http://localhost:4000/moneyToTake", options)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data);
      });

    setTimeout(setSelectedSeats(null), 1000);
  }

  let suma = 0;
  if (selectedSeats) {
    for (let i of selectedSeats) {
      suma += i.price;
    }
  }

  return (
    <div className="d-flex reservation">
      <SingleMovie item={move} from={"reservation"} />
      <div>
        <div className="seats">
          {move.length === 0
            ? ""
            : move.seats.map((x, i) => (
                <SingleSeat key={i} index={i} seat={x} />
              ))}
        </div>
        <div className="totals">
          <div className="d-flex">
            Your selected seats:
            {selectedSeats &&
              selectedSeats.map((x, i) => <div key={i}> {x.seatNumber}, </div>)}
          </div>
          <div>Total price: {suma.toFixed(2)}</div>
          <button onClick={buyTickets}>Buy Tickets</button>
        </div>
      </div>
    </div>
  );
}

export default MovieReservationPage;
