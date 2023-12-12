import { useState } from "react";
import Navigation from "./components/Navigation";
import Main from "./components/Main";
import Box from "./components/Box";
import MovieList from "./components/FoundMoviesList/MovieList";
import Summary from "./components/WatchedComponents/Summary";
import List from "./components/WatchedComponents/List";
import FoundMoviesBox from "./components/FoundMoviesBox";
import useMovies from "./hooks/useMovies";
import useLocalStorage from "./hooks/useLocalStorage";
import useKey from "./hooks/useKey";








const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

export default function App() {
  const [query, setQuery] = useState("");


  const { movies, isLoading, error } = useMovies(query, handleClose)

  const[watched,setWatched] = useLocalStorage([],"watched") 

  const [selectedId, setSelectedId] = useState(null)




  

  function handleAddWatched(newWatched) {
    setWatched(watched => [...watched.filter(elem => elem.imdbID !== newWatched.imdbID),newWatched])
  }



  const avgImdbRating = average(watched.map((movie) => movie.imdbRating)).toFixed(1);
  const avgUserRating = average(watched.map((movie) => movie.userRating)).toFixed(1);
  const avgRuntime = average(watched.map((movie) => movie.runtime)).toFixed(1);



  useKey("Escape",handleClose,"keypress")






  function selectId(id) {
    setSelectedId(prevID => id === prevID ? null:id)
  }
   

  function handleClose() {
    setSelectedId(null)
  }
  
  function removeWatchedMovie(imdbRating) {
    setWatched((prevWatched) => prevWatched.filter( movie => movie.imdbID !== imdbRating ))
  }


  return (
    <>
      <Navigation query={query} setQuery={setQuery} movies={movies}/>

      <Main>
        <Box>
          {!isLoading && !error && <MovieList movies={movies} setSelectedId={selectId} />}
          {isLoading && <h1 className="loader">Loading...</h1>}
          {error && !isLoading && <p className="error">Movie was not found</p>}
        </Box>
        <Box>
          {selectedId ?
            <FoundMoviesBox movieId={selectedId} handleClose={handleClose} watched={watched} onAddWatched={handleAddWatched}/> : <>
              <Summary watched={watched} avgImdbRating={avgImdbRating} avgRuntime={avgRuntime}
              avgUserRating={avgUserRating} />
              <List watched={watched} onRemoveWatched={removeWatchedMovie } />
            </>
      
        }
          
        </Box>
      </Main>
    </>
  );
}
