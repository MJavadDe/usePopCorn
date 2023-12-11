import List from "./WatchedComponents/List"
import Summary from "./WatchedComponents/Summary"

function WatchedMoviesBox({ setIsOpen, isOpen ,watched,avgImdbRating,avgUserRating,avgRuntime}) {
  return (
    <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && (
            <>
          <Summary watched={watched} avgImdbRating={avgImdbRating} avgRuntime={avgRuntime}
          avgUserRating={avgUserRating}/>

              <List watched={watched}/>
            </>
          )}
        </div>
  )
}

export default WatchedMoviesBox
