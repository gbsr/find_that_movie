import React from 'react';
import { useRef, useState, useEffect } from 'react';
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

	// floating scroll to top arrow
	const [isFormVisible, setIsFormVisible] = useState(true);
	const formRef = useRef(null);

	useEffect(() => {
		const observer = new IntersectionObserver(([entry]) => {
			setIsFormVisible(entry.isIntersecting);
		});

		if (formRef.current) {
			observer.observe(formRef.current);
		}

		return () => {
			if (formRef.current) {
				observer.unobserve(formRef.current);
			}
		};
	}, []);

	// custom scroll to top function, because I want more speed
	function smoothScrollToTop(duration) {
		const scrollHeight = window.scrollY;
		const scrollStep = Math.PI / (duration / 15);
		const cosParameter = scrollHeight / 2;
		let scrollCount = 0;
		let scrollMargin;
		let scrollInterval = setInterval(function () {
			if (window.scrollY != 0) {
				scrollCount = scrollCount + 1;
				scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);
				window.scrollTo(0, (scrollHeight - scrollMargin));
			}
			else clearInterval(scrollInterval);
		}, 15);
	}

	// add eventlistener for scroll to top arrow
	useEffect(() => {
		const scrollToTopButton = document.querySelector('.scroll-to-top');

		const scrollFunction = () => smoothScrollToTop(1500);

		if (scrollToTopButton) {
			scrollToTopButton.addEventListener('click', scrollFunction);
		}

		// Cleanup function to remove the event listener
		return () => {
			if (scrollToTopButton) {
				scrollToTopButton.removeEventListener('click', scrollFunction);
			}
		};
	}, []);

	return (
		<div className="app">
			<section className="container">
				<h1>Find that Movie</h1>
				<span>Clicking the card sends you to IMDB</span>
				<div className="search">
					<form onSubmit={onSubmit}>
						<input
							ref={formRef}
							type="text"
							placeholder="Search for a movie, IE: 'Star Wars, then press Enter'"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						<button className={`scroll-to-top ${!isFormVisible ? 'scroll-to-top-show' : ''}`} onClick={() => smoothScrollToTop(170)}>
							↑
						</button>
						<button type="submit">Find it!</button>
					</form>
				</div>
				<div className="results">
					{/* Add this line to display the total number of results */}
					<p>Total results: {totalResults}</p>
					<div className="spacer" />
					{results.length > 0 ? (
						results.map((movie, index) => <MovieCard key={`${movie.imdbID}-${index}`} movie={movie} />)
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