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
    if (!favorites.some(fav => fav.imdbID === movie.imdbID)) {
      const newFavoriteList = [...favorites, movie];
      setFavorites(newFavoriteList);
      saveToLocalStorage(newFavoriteList);

      // ✅ Popup message
      alert(`🎉 "${movie.Title}" added to favorites!`);
    }
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const isFavorite = (movie) =>
    favorites.some(fav => fav.imdbID === movie.imdbID);

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
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              handleFavoriteClick={addFavoriteMovie}
              isFavorite={isFavorite(movie)}
            />
          ))
        ) : (
          <h2>Search for a movie to begin</h2>
        )}
      </div>

      {favorites.length > 0 && (
        <>
          <h2 className="fav-header">My Favorites</h2>
          <div className="container">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                handleFavoriteClick={removeFavoriteMovie}
                isFavorite={true}
                remove
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
