function Navigation({ query, setQuery, movies,setSearch }) {

  
  
  return (
    <nav className="nav-bar">
        <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
        <input
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
