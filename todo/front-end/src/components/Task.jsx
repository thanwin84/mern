import React, {useState} from "react";
import { useTodo } from "../contexts/TodoContext";
import { actions } from "../contexts/taskReducer";
import axios from "axios";





function Button({type, handleClick, children}){
    const styles = {
        edit: "p-1 bg-green-500 hover:bg-green-700 rounded-md text-sm text-white",
        save: "p-1 bg-green-500 hover:bg-green-700 rounded-md text-sm text-white",
        delete: "p-1 ml-2 bg-red-500 hover:bg-red-700 rounded-md text-sm text-white"
    }
    return (
        <button className={styles[type]} onClick={handleClick}>
            {children}
        </button>
    )
}
export default function Task({task}){
    
    const [isEditing, setIsEditing] = useState(false)
    const [todo, SetTodo] = useState(task)
    const {dispatch} = useTodo()
     
    function handleOnChange(e){
        SetTodo(prevTodo => ({...prevTodo, name: e.target.value}))
    }
    

    const handleSave = async()=>{
        try {
            const response = await axios.patch(`/api/v1/tasks/${todo._id}`, {name: todo.name})
            dispatch({type: actions.updated, todo: todo})
            setIsEditing(!isEditing)
        } catch (error) {
            throw error
        }
    }

    const handleDelete = async()=>{
       try {
            await axios.delete(`/api/v1/tasks/${task._id}`)
            dispatch({type: actions.deleted, id: task._id})
       } catch (error) {
            throw error
       }
    }
    const handleCheckBox = async(todo)=>{
        try {
            const response = await axios.patch(`/api/v1/tasks/${todo._id}`, {completed: !todo.completed})
            dispatch({type: actions.checkedDone, todo: todo})
        } catch (error) {
            throw error
        }
    }
   
    return (
        <article className="flex justify-between shadow-md rounded-md px-3 py-2 w-4/5 group">
            <div className="my-auto flex w-full mr-2">
                <input 
                    className="mr-2"
                    type="checkbox"
                    checked = {task.completed}
                    onChange={()=>handleCheckBox(todo)}
                    name ="checkbox"
                />
                {
                    isEditing ? (
                        <input 
                            type="text"
                            value={todo.name}
                            className="w-full p-1 focus:outline-none border border-gray-600 rounded-md"
                            onChange={handleOnChange}
                            name ="edit-task"
                        /> 
                    ) : 
                    (
                        <span>{task.name}</span>
                    )
                }
            </div>
            <div className="flex invisible group-hover:visible">
                {
                    isEditing ? 
                    <Button 
                        type='save' 
                        handleClick={handleSave}
                    >
                        Save
                    </Button> :
                    <Button 
                        type='edit' 
                        handleClick={()=>setIsEditing(!isEditing)}
                    >
                        Edit
                    </Button>
                    
                }
                <Button 
                    handleClick={handleDelete} 
                    type='delete'
                >
                    Delete
                </Button>
            </div>
        </article>
    )
}