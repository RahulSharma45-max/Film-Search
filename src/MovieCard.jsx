import React from 'react';

const MovieCard = ({ movie, handleFavoriteClick, actionLabel }) => {
  return (
    <div className="movie">
      <div>
        <p>{movie.Year}</p>
      </div>
      <div>
        <img
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/400'}
          alt={movie.Title}
        />
      </div>
      <div className="movie-info">
        <span>{movie.Type}</span>
        <h3>{movie.Title}</h3>
        <button 
            className="fav-btn"
            onClick={() => handleFavoriteClick(movie)}
        >
            {actionLabel}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;