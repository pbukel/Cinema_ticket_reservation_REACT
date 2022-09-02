import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import mainContext from "../context/mainContext";
import SingleMovie from "../components/SingleMovie";

function MoviesPage() {
  const { socet, movies, setMovies } = useContext(mainContext);

  useEffect(() => {
    socet.emit("askforMovies");
    socet.on("getMovies", (data) => {
      setMovies(data);
    });
  }, []);
  return (
    <div className="d-flex flex-wrap center">
      {movies.map((x, i) => (
        <SingleMovie item={x} key={i} index={i} />
      ))}
    </div>
  );
}

export default MoviesPage;
