import { 
    createContext, 
    useContext, 
    useReducer,
    useEffect
 } from "react";
import taskReducer from "./taskReducer";
import axios from 'axios'
import { useLoaderData } from "react-router-dom";

export const TodoContext = createContext(null)

export const useTodo = ()=>{
    return useContext(TodoContext)
}  

export async function Loader(){
    try {
        const response = await axios.get('/api/v1/tasks')
        const {data} = response.data 
        return data
    } catch (error) {
        throw error
    }
}

export  function TodoProvider({children}){
    const initialState = useLoaderData()
    const [todos, dispatch] = useReducer(taskReducer,  initialState)

    // save it to localstorage
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos))
    },[])

    return (
        <TodoContext.Provider value={{todos, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
    
}