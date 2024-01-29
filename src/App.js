import React from 'react';
import { useEffect } from 'react';
// API key for omdb: 8e16f5a1
// delete this when production!

const API_URL = 'http://www.omdbapi.com/?apikey=8e16f5a1';

const App = () => {

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();
		console.log(data.Search);
	};
	// render once, since the second argument is an empty array
	useEffect(() => {
		searchMovies('Matrix');
	}, []);


	return (
		<div>Find your movie</div>
	);
};

export default App;

