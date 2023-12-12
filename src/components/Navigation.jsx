import { useEffect, useRef } from "react"
import useKey from "../hooks/useKey"

function Navigation({ query, setQuery, movies }) {
  const inputEl = useRef()  
  

  useKey("enter",keyHandler,"keypress")

  function keyHandler(e) {
    if (document.activeElement === inputEl.current ) return
    inputEl.current.focus()
    setQuery("")
  }
  
  return (
    <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
      <input
        ref={inputEl}
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
        onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          Found <strong>{movies ? movies.length :0}</strong> results
        </p>
      </nav>
  )
}

export default Navigation
