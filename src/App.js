import React from 'react';
import { useState } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'https://www.omdbapi.com/?apikey=8e16f5a1';

const App = () => {
	const [query, setQuery] = React.useState('Star Wars');
	const [results, setResults] = React.useState([]);
	const [page, setPage] = useState(1);

	const searchMovies = async (title, page) => {
		try {
			const response = await fetch(`${API_URL}&s=${title}&page=${page}`);
			const data = await response.json();
			if (data.Search) {
				setResults(data.Search);
			} else {
				setResults([]); // Set results to an empty array if data.Search is undefined
				console.error('Search property not found in API response:', data);
			}
		} catch (error) {
			setResults([]); // Set results to an empty array if the API request fails
			console.error('Error fetching movies:', error);
		}
	};

	const onSubmit = (e) => {
		e.preventDefault();
		searchMovies(query, 1);
	};

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
					{results.map((movie, index) => {

						return <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />;
					})}
				</div>

			</section>
		</div>
	);
};

export default App;