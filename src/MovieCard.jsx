const MovieCard = ({ movie, handleFavoriteClick, isFavorite, remove }) => {
  return (
    <div className="movie">
      <img
        src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/250x375"}
        alt={movie.Title}
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <button
          className="fav-btn"
          onClick={() => handleFavoriteClick(movie)}
          disabled={isFavorite && !remove}
        >
          {remove
            ? "Remove"
            : isFavorite
            ? "Added to Favorites"
            : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
