import { useEffect } from "react";

function useKey(key,action,event) {


    useEffect(() => {
        const eventHandler = (e) => {
          if (e.code.toLowerCase() === key.toLowerCase()) {
            action()
          }
        }
    
        document.addEventListener(event,eventHandler)
      
        return () => {
          document.removeEventListener(event,eventHandler)
        }
      }, [key,action,event])
}

export default useKey
