import "./App.css";
import { io } from "socket.io-client";
import mainContext from "./context/mainContext";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//PAGES
import MainPage from "./pages/MainPage";
import MoviesPage from "./pages/MoviesPage";
import Toolbar from "./components/Toolbar";
import MovieReservationPage from "./pages/MovieReservationPage";

const socet = io.connect("http://localhost:4000");

function App() {
  const [user, setUser] = useState();
  const [movies, setMovies] = useState([]);
  const [selectedMovieIndex, setSelectedMovieIndex] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState();

  return (
    <mainContext.Provider
      value={{
        user,
        setUser,
        movies,
        setMovies,
        socet,
        selectedMovieIndex,
        setSelectedMovieIndex,
        selectedSeats,
        setSelectedSeats,
      }}
    >
      <div className="App d-flex flex-column">
        <BrowserRouter>
          <Toolbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route
              path="/move-reservation"
              element={<MovieReservationPage />}
            />
          </Routes>
        </BrowserRouter>
      </div>
    </mainContext.Provider>
  );
}

export default App;
