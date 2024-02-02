import React, { useEffect, useState } from "react";
import "./MovieCard.css";

const apiKey = "8e16f5a1";
const MovieCard = ({ movie, error }) => {
	const [plot, setPlot] = useState("");
	const handleOnPointerDown = () => {
		// send them to the imdb link in a new browser window
		window.open(`https://www.imdb.com/title/${movie.imdbID}/`, "_blank");
	};

	useEffect(() => {
		fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=short&r=json&apiKey=${apiKey}`)
			.then((response) => response.json())
			.then((data) => {
				setPlot(data.Plot); // This will set the short plot of the movie
			})
			.catch((error) => console.error("Error:", error));
	}, [movie]);

	return (
		<div className="movie" onPointerDown={handleOnPointerDown}>
			<div className="movie-card">
				<div>
					<h2>{movie.Title}</h2>
					{error && (
						<div className="error">
							<p>{error}</p>
						</div>
					)}
				</div>
			</div>
			{movie?.Poster && movie.Poster !== "N/A" ? (
				<img src={movie.Poster} alt={movie.Title} />
			) : (
				<p> No poster available at this time, sorry. </p>
			)}
			<div>
				<p className="plot">{plot}</p>
				<span>{movie.Type}</span>
				<span>{movie.Year}</span>
			</div>
		</div>
	);
};

export default MovieCard;
