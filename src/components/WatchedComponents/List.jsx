function List({watched,onRemoveWatched}) {
  return (
    <ul className="list">
                {watched.map((movie) => (
                  <li key={movie.imdbID}>
                    <img src={movie.poster} alt={`${movie.title} poster`} />
                    <h3>{movie.title}</h3>
                    <div>
                      <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                      </p>
                      <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                      </p>
                      <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                      </p>
                      <p className="btn-delete">
                        <span onClick={() => onRemoveWatched(movie.imdbID)}>❌</span>
                      </p>
                    </div>
                  </li>
                ))}
      </ul>
  )
}

export default List
