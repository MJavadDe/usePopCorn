import { useState } from "react";
import { useEffect } from "react"
import Star from "./Star";

function FoundMoviesBox({ movieId, handleClose ,onAddWatched,watched}) {

  const [movie, setMovie] = useState({})
  const [isLoading, setisLoading] = useState(false)
  const [userRating, setuserRating] = useState(0)
  
  const { Title: title, Year: year, Poster: poster, Runtime: runtime, imdbRating, Plot: plot, Released: released, Actors: actors, Director: director, Genre: genre } = movie

  const isWatched = watched.map(item => item.imdbID).includes(movieId)
  const OMDB_KEY = 95748739;
  console.log(isWatched,watched);


  function handleAdd() {
    const newWatchedMovie = {
      imdbID: movieId,
      title,
      year, poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating
    }
    onAddWatched(newWatchedMovie)

    handleClose()
  }

  useEffect(() => {
    async function getMovie() {
      setisLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&i=${movieId}`)
      const data = await res.json()
      setMovie(data)
      setisLoading(false)
    }
  
    getMovie()
    
  }, [movieId])
  




  return (
    <div className="details">
      {isLoading ? <p>Is Loading...</p>:( <>
        <header>
        <button className="btn-back" onClick={handleClose}>&larr;</button>
        <img src={poster} alt={`poster of ${title}`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>{imdbRating} imdb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
            {!isWatched ? <>
              <Star size={20} quantity={10} onRatingSet={setuserRating} />
            
            {userRating > 0 &&<button className="btn-add" onClick={handleAdd}>
              add to watched +
              </button>
              }
            </> : <p>You already rated this movie</p>}
        </div>
        <p>
          <em>{ plot}</em >
        </p>
        <p>Staring {actors}</p>
        <p>Directed by {director }</p>
        
        </section>
        </>)
      }
    </div>
  )
}

export default FoundMoviesBox
