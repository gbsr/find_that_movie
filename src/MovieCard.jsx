import React, { useEffect, useState } from "react";
import "./MovieCard.css";

const apiKey = "8e16f5a1";
const Movie = ({ movie }) => {
	const [plot, setPlot] = useState("");

	useEffect(() => {
		fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=short&r=json&apiKey=${apiKey}`)
			.then((response) => response.json())
			.then((data) => {
				setPlot(data.Plot); // This will set the short plot of the movie
			})
			.catch((error) => console.error("Error:", error));
	}, [movie]);

	return (
		<div className="movie">
			<div className="movie-card">
				{movie?.Poster && movie.Poster !== "N/A" ? (
					<img src={movie.Poster} alt={movie.Title} />
				) : (
					<p> No poster available at this time, sorry. </p>
				)}
			</div>
			<div>
				<h2>{movie.Title}</h2>
				<p className="plot">{plot}</p>
				<span>{movie.Type}</span>
			</div>
		</div>
	);
};

export default Movie;
