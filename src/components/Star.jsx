import { useState } from "react";

function Star({ size =30, quantity=5,color="#ffcc00" ,onRatingSet}) {
  
  const wantedQuantity = Array.from({ length: quantity }, (a, i) => i++)
  
  const [ratings, setRatings] = useState(0)

  const clickHandler = (ratings) => {
    setRatings(ratings);
    onRatingSet(ratings);

  }

  const [tempRating, setTempRating] = useState()
  
  return (
    <div style={{display:"flex",height:"50px",alignItems:"center"}}>
      {
        wantedQuantity.map((a, index) => (
          <span key={index+1} role="button" style={{cursor:"pointer"}}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              stroke={color}
              fill={tempRating >= index + 1 || ratings >= index + 1 ? color : "none"}
              width={size}
              onClick={() => clickHandler(index + 1)}
              onMouseEnter={() => setTempRating(index + 1)}
              onMouseLeave={() => setTempRating(0)}
              >
              <path

                  d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                />
              </svg>
            </span>
        ))
      }
  
      <span style={{color: "#ffcc00",fontSize:`${size/2}px`,marginLeft:"10px"}}>{ tempRating ||  ratings || 0}</span>
    </div>
  )
}

export default Star
