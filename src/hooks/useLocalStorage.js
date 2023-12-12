import { useEffect,useState } from "react"

function useLocalStorage(initialState,itemName) {

    const [name, setName] = useState(function () {
        const storedData = localStorage.getItem(itemName)
        return JSON.parse(storedData) ?? initialState
    })
    
    useEffect(() => {
        localStorage.setItem(itemName, JSON.stringify(name))
      
        
      }, [name,itemName])
      
    
    return [name,setName]
}

export default useLocalStorage
