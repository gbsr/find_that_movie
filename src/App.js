import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=8e16f5a1';

const App = () => {
	const [query, setQuery] = React.useState('Star Wars');
	const [results, setResults] = React.useState([]);
	const [totalResults, setTotalResults] = React.useState(0);
	const [page, setPage] = useState(1);

	const [error, setError] = useState(null);

	const searchMovies = async (title, page,) => {
		try {
			const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
			const data = await response.json();
			if (data.Response === "True") {
				setResults(prevResults => [...prevResults, ...data.Search]); // Append new results to existing ones
				setTotalResults(data.totalResults);
				setError(null); // Clear the error message when data is found
			} else {
				setResults([]); // Set results to an empty array if the movie isn't found
				setTotalResults(0);
				setError(data.Error); // Set the error message to data.Error
				console.log(data.Error);
			}
		} catch (error) {
			setResults([]); // Set results to an empty array if the API request fails
			setTotalResults(0);
			setError('Sorry, an error occurred. Please try again.');
		}
	};



	const onSubmit = (e) => {
		e.preventDefault();
		searchMovies(query, 1);
	};

	const loadMore = () => {
		setPage(prevPage => {
			const newPage = prevPage + 1;
			searchMovies(query, newPage);  // Fetch the next page of results
			return newPage;
		});
	};

	useEffect(() => {
		searchMovies(query, page); // Fetch the first page of results

	}, [query, page]);

	return (
		<div className="app">
			<section className="container">
				<h1>Find that Movie</h1>
				<div className="search">
					<form onSubmit={onSubmit}>

						<input
							placeholder="Search for a movie, IE: 'Star Wars, then press Enter'"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button type="submit">Find it!</button>
					</form>
				</div>
				<div className="results">
					{/* Add this line to display the total number of results */}
					<p>Total results: {totalResults}</p>
					{/* ... */}
					{results.length > 0 ? (
						results.map((movie) => <MovieCard key={movie.imdbID} movie={movie} />)
					) : (
						error && <div className="error"><p>{error}</p></div>
					)}
				</div>
				<button onClick={loadMore}>More..</button>

			</section>
		</div>
	);
};

export default App;