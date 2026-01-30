import { useState, useEffect } from 'react';
import './App.css';
import MovieCard from './MovieCard';

const API_URL = 'http://www.omdbapi.com/?i=tt3896198&apikey=d5a8b11c';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem('filmsearch-favorites')
    );
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('filmsearch-favorites', JSON.stringify(items));
  };

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    }
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
        setFavorites(newFavoriteList);
        saveToLocalStorage(newFavoriteList);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="app">
      <h1>FilmSearch</h1>

      <div className="search">
        <input
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && searchMovies(searchTerm)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      <div className="container">
        {movies?.length > 0 ? (
          movies.map((movie) => (
            <MovieCard 
              movie={movie} 
              key={movie.imdbID} 
              handleFavoriteClick={addFavoriteMovie}
              actionLabel="Add to Favorites"
            />
          ))
        ) : (
          <div className="empty">
            <h2>Search for a movie to begin</h2>
          </div>
        )}
      </div>

      {favorites.length > 0 && (
        <>
          <h2 className='fav-header'>My Favorites</h2>
          <div className="container">
            {favorites.map((movie) => (
              <MovieCard 
                movie={movie} 
                key={movie.imdbID} 
                handleFavoriteClick={removeFavoriteMovie}
                actionLabel="Remove"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;