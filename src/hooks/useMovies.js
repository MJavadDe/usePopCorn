import { useEffect,useState } from "react"

const OMDB_KEY = 95748739;


function useMovies(query,callback) {
    const [isLoading, setisLoading] = useState(false)
    const [error, setError] = useState()
    const [movies, setMovies] = useState([]);

  

    useEffect(() => {
        callback?.()
        const controller = new AbortController()
        const getMovie = async (movieQuery) => {
          try {
            setError("")
            setisLoading(true)
            let res = await fetch(`http://www.omdbapi.com/?apikey=${OMDB_KEY}&s=${movieQuery}`,{signal:controller.signal});      
            if (!res.ok) {
              throw new Error("something wrong has happend")
            }
          
            res = await res.json();
      
            if (res.Response  === "False") {
              throw new Error("Movie was not found")
            }
      
            setMovies(res.Search);
      
          }
      
      
          catch (err) {
            if (err.name !== "AbortError") {
              setError(err.message)
            }
          }
          finally {
            setisLoading(false)
          }
        }
        if (query.length<3) {
          setMovies([])
          setError("")
          return
        }
        getMovie(query)
        return () => {
          controller.abort()
        }
    
    }, [query])
    
    return{movies,isLoading,error}
}

export default useMovies
