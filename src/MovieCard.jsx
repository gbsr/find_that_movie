import React, { useEffect, useState } from "react";
import "./MovieCard.css";

// The API key for the OMDB API, this will be replaced with a .env variable eventually, so get your own key if you want to use this
const apiKey = "8e16f5a1";

const MovieCard = ({ movie, error }) => {
	// State variable for the short plot of the movie
	const [plot, setPlot] = useState("");

	// Function to handle when the user clicks on the movie card
	const handleOnPointerDown = () => {
		// Open the IMDB page for the movie in a new browser window
		window.open(`https://www.imdb.com/title/${movie.imdbID}/`, "_blank");
	};

	// Effect hook to fetch the short plot of the movie when the movie prop changes
	useEffect(() => {
		fetch(`http://www.omdbapi.com/?i=${movie.imdbID}&plot=short&r=json&apiKey=${apiKey}`)
			.then((response) => response.json())
			.then((data) => {
				// Update the plot state variable with the short plot from the API response
				setPlot(data.Plot);
			})
			.catch((error) => console.error("Error:", error));
	}, [movie]);

	// what to 'build' into the virtual DOM
	return (
		<div className="movie" onPointerDown={handleOnPointerDown}>
			<div className="movie-card">
				<div>
					<h2>{movie.Title}</h2>
					{error && (
						<div className="error">
							{/* If there is an error, display it */}
							<p>{error}</p>
						</div>
					)}
				</div>
			</div>
			{movie?.Poster && movie.Poster !== "N/A" ? (
				// If the movie has a poster, display it
				<img src={movie.Poster} alt={movie.Title} />
			) : (
				// If the movie doesn't have a poster, display a placeholder message
				<p> No poster available at this time, sorry. </p>
			)}
			<div>
				{/* Display the plot and type of the movie */}
				<p className="plot">{plot}</p>
				<span>{movie.Type}</span>
			</div>
		</div>
	);
};

export default MovieCard;
