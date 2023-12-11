import { useState } from "react";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/FoundMoviesList/MovieList";
import Summary from "./components/WatchedComponents/Summary";
import List from "./components/WatchedComponents/List";
import Star from "./components/Star";
import { useEffect } from "react";
import FoundMoviesBox from "./components/FoundMoviesBox";






const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);
  const [selectedId, setSelectedId] = useState(null)
  const [isLoading, setisLoading] = useState(false)
  const [error, setError] = useState()



  const OMDB_KEY = 95748739;


  const getMovie = async (movieQuery) => {
    try {
      setError("")
      setisLoading(true)
      let res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${movieQuery}`);      
      if (!res.ok) {
        throw new Error("something wrong has happend")
      }
    
      res = await res.json();

      if (res.Response  === "False") {
        throw new Error("Movie was not found")
      }

      setMovies(res.Search);

    }


    catch (err){
      setError(err.message)
    }
    finally {
      setisLoading(false)
    }
  }

  function handleAddWatched(newWatched) {
    setWatched(watched => [...watched.filter(elem => elem.imdbID !== newWatched.imdbID),newWatched])
  }



  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);

  const [ratings, setRatings] = useState(0)


  function selectId(id) {
    setSelectedId(prevID => id === prevID ? null:id)
  }


  useEffect(() => {
    if (query.length<3) {
      setMovies([])
      setError("")
      return
    }
    getMovie(query)

  }, [query])


  function handleClose() {
    setSelectedId(null)
  }
  


  return (
    <>
      <Navigation query={query} setQuery={setQuery} movies={movies} setSearch={getMovie} />

      <Main>
        <Box>
          {!isLoading && !error && <MovieList movies={movies} setSelectedId={selectId} />}
          {isLoading && <h1 className="loader">Loading...</h1>}
          {error && !isLoading && <p>Movie was not found</p>}
        </Box>
        <Box>
          {selectedId ?
            <FoundMoviesBox movieId={selectedId} handleClose={handleClose} watched={watched} onAddWatched={handleAddWatched}/> : <>
              <Summary watched={watched} avgImdbRating={avgImdbRating} avgRuntime={avgRuntime}
              avgUserRating={avgUserRating} />
              <List watched={watched}/>
            </>
      
        }
          
        </Box>
      </Main>
    </>
  );
}
