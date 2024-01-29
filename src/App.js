import React from 'react';
import { useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

// API key for omdb: 8e16f5a1
// delete this when production!

const API_URL = 'http://www.omdbapi.com/?apikey=8e16f5a1';

const App = () => {
	const [query, setQuery] = React.useState('Star Wars');
	const [results, setResults] = React.useState([]);

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		setResults(data.Search);
	};

	return (
		<div className="app">
			<section className="container">
				<h1>Find that Movie</h1>
				<div className="search">
					<form onSubmit={(e) => {
						e.preventDefault();
						searchMovies(query);
					}}>
						<input
							placeholder="Search for a movie, IE: 'Star Wars, then press Enter'"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</form>
				</div>
				<div className="results">
					{results.map((movie) => (
						<MovieCard key={movie.imdbID} movie={movie} />
					))}
				</div>

			</section>
		</div>
	);
};

export default App;