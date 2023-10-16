import React, {useState} from "react";
import { useTodo } from "../contexts/TodoContext";
import { actions } from "../contexts/taskReducer";
import axios from "axios";


export default function AddTask(){
    const [todo, setTodo] = useState("")
    const {dispatch} = useTodo()

    function handleChange(e){
        const value = e.target.value
        setTodo(value)
    }
    function handleClick(E){
        if (!todo.length){
            return
        }
        const postData = async(value)=>{
            try {
                const response = await axios.post('/api/v1/tasks', {name: value})
                const {data} = response.data
                dispatch({type: actions.added, name: data})
                
            } catch (error) {
                throw error
            }
        }
        postData(todo)
        setTodo("")
    }
    return (
        <div className="flex flex-row justify-between w-4/5 ">
           <input 
                type="text"
                name = "todo"
                onChange={handleChange}
                placeholder="Enter your todo"
                autoComplete="off"
                className=" px-2 py-1 border border-gray-300 rounded-lg shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 focus:outline-none w-3/4"
                value = {todo}
            />
            <button
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
                  onClick={handleClick}

            >
                Add Task
            </button>
        </div>
    )
}