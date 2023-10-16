import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts/TodoContext'
import AddTask from './components/AddTask'
import TaskList from './components/TaskList'
import './App.css'

function App() {
 
  const heading = (
    <h2 className='text-center text-2xl font-medium mb-3'>Add your task here</h2>
  )
  return (
    <section className='p-5 w-full mx-auto md:w-3/5'>
      <TodoProvider>
        {heading}
        <AddTask/>
        <TaskList/>
      </TodoProvider>
    </section>
  )
}

export default App
