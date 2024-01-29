// Movie.js
import React from "react";
import "./MovieCard.css";

const Movie = ({ movie }) => (
	<div className="movie">
		<div className="movie-card">
			<h2>{movie.Title}</h2>
			{movie?.Poster && movie.Poster !== "N/A" ? (
				<img src={movie.Poster} alt={movie.Title} />
			) : (
				<p> No poster available at this time, sorry. </p>
			)}
		</div>
	</div>
);

export default Movie;
