import React from "react";
import Task from "./Task";
import { useTodo } from "../contexts/TodoContext";

export default function TaskList(){
    const {todos} = useTodo()
    return (
        <section className="mt-4">
            {
                todos.map(task => {
                    return <Task key={task._id} task={task} />
                })
            }
        </section>
    )
}