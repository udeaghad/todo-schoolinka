"use client";

import React, {useEffect, useReducer, useRef, useState} from "react";
import NavBar from "@/components/NavBar/NavBar";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Todo, TodoState } from "@/types.dt";
import reducer from "@/lib/reducer";
import TodoItem from "@/components/TodoItem/TodoItem";
import ViewTask from "@/components/ViewTask/ViewTask";

export default function Home() {

  const initialState: TodoState = {
    todos: [],
  }
  const [state, dispatch] = useReducer(reducer, initialState)

  const [task, setTask] = useState<Todo>({
    id: '',
    title: '',
    completed: false,
    startTime: '',
    endTime: '',
  })

  useEffect(() => {
    const todoItems = async() => {
      const res = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await res.json()
      
      const result = data.map((item: Todo) => {
        return {
          id: item.id,
          title: item.title,
          completed: item.completed,
          startTime: '10:00 am',
          endTime: '11:00 am',
        }
      })
      
      dispatch({ type: 'GET_TODOS', payload: result })
    }
    todoItems()
  }, [])

  const handleCheckBox = (id: string) => {   
    dispatch({ type: 'UPDATE_STATUS', payload: id })   
  }

  const viewTaskRef = useRef<HTMLDivElement>(null)
  const datePickerRef = useRef<HTMLDivElement>(null)

  const handleViewTaskModal = (id: string) => { 
    
      viewTaskRef.current?.style.setProperty('bottom', '0')
      viewTaskRef.current?.classList.add('linear', 'duration-300')
      datePickerRef.current?.style.setProperty('display', 'none')
   
         
    const task = state.todos.find((todo: Todo) => todo.id === id)
    setTask(task!)    
  }

  return (
    <main>
      <div className="fixed top-0 w-full bg-white z-50">
        <NavBar />
      </div>

      <section className='px-3 pt-5 mt-16'>
        <div>
          <h2 className='text-xl font-bold'>Good morning!</h2>
          <p className='text-sm text-gray-500'>You got some task to do. </p>
        </div>        
      </section>

      <section className="mt-5">
        <div>
          <DatePicker />
        </div>

        <div>
          {state.todos.map((todo: Todo) => (
            <TodoItem key={todo.id} {...todo} handleCheckBox={handleCheckBox} handleViewTaskModal={handleViewTaskModal} />
          ))}
        </div>
        

      </section>

      <div className="fixed -bottom-full w-full bg-white md:-right-full md:w-[28%] md:bottom-24" ref={viewTaskRef}>
        <ViewTask 
          task={task}
          viewRef={viewTaskRef}
        />
      </div>
      
    </main>
  )
}
