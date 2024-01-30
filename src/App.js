import React from 'react';
import { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';

// The base URL for the OMDB API
// replace the API key with your own key, which can be obtained by creating an account at http://www.omdbapi.com/apikey.aspx
const API_URL = 'https://www.omdbapi.com/?apikey=8e16f5a1';

const App = () => {
	// State variables for the search query, search results, current page, and any error messages
	const [query, setQuery] = React.useState('Star Wars');
	const [results, setResults] = React.useState([]);
	const [page, setPage] = useState(1);
	const [error, setError] = useState(null);

	// Function to search for movies using the OMDB API
	const searchMovies = async (title, page,) => {
		try {
			// Fetch data from the API
			const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
			const data = await response.json();
			if (data.Response === "True") {
				// If the API returns a successful response, update the results and clear any error messages
				setResults(data.Search);
				setError(null);
			} else {
				// If the movie isn't found, set the results to an empty array and update the error message
				setResults([]);
				setError(data.Error);
				console.log(data.Error);
			}
		} catch (error) {
			// If the API request fails, set the results to an empty array and display a generic error message
			setResults([]);
			setError('Sorry, an error occurred. Please try again.');
		}
	};

	// Function to handle form submission
	const onSubmit = (e) => {
		e.preventDefault();
		// When the form is submitted, search for movies using the current query and reset the page number to 1
		searchMovies(query, 1);
	};
	// what to return (ie, what stuff to 'build' into the DOM)
	return (
		<div className="app">
			<section className="container">
				<h1>Find that Movie</h1>
				<div className="search">
					<form onSubmit={onSubmit}>
						<input
							placeholder="Search for a movie, IE: 'Star Wars, then press Enter'"
							value={query}
							// Update the query state variable whenever the input value changes
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type="submit">Find it!</button>
					</form>
				</div>
				<div className="results">
					{results.length > 0 ? (
						// If there are results, map over them and render a MovieCard for each one
						results.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
					) : (
						// If there are no results and there's an error message, display the error message
						error && <div className="error"><p>{error}</p></div>
					)}
				</div>
			</section>
		</div>
	);
};

export default App;