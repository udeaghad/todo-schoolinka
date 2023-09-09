"use client";

import React, {useEffect, useReducer, useRef, useState} from "react";
import NavBar from "@/components/NavBar/NavBar";
import DatePicker from "@/components/DatePicker/DatePicker";
import { Todo, TodoState } from "@/types.dt";
import reducer from "@/lib/reducer";
import TodoItem from "@/components/TodoItem/TodoItem";
import ViewTask from "@/components/ViewTask/ViewTask";
import AddTask from "@/components/AddTask/AddTask";
import InputTaskBtn from "@/components/InputTaskBtn/InputTaskBtn";

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
  const editTaskRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<HTMLDivElement>(null)
  const addTaskRef = useRef<HTMLDivElement>(null)

  const handleViewTaskModal = (id: string) => { 
    
      viewTaskRef.current?.style.setProperty('bottom', '0')
      viewTaskRef.current?.classList.add('linear', 'duration-300')
      datePickerRef.current?.style.setProperty('display', 'none')
   
         
    const task = state.todos.find((todo: Todo) => todo.id === id)
    setTask(task!)    
  }

  const handleCloseViewModal = () => {
      viewTaskRef.current?.style.setProperty('bottom', '-100%')
      viewTaskRef.current?.classList.add('linear', 'duration-300')
      datePickerRef.current?.style.setProperty('display', 'block')
    
  }
  const handleDeleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id })  
    handleCloseViewModal()  
  }
  
  const handleEditButton = () => {
    viewRef.current?.style.setProperty('display', 'none')
    editTaskRef.current?.style.setProperty('display', 'block')
    
  }
  const handleCloseEditModal = () => {
    viewTaskRef.current?.style.setProperty('bottom', '-100%')
    viewTaskRef.current?.classList.add('linear', 'duration-300')
    datePickerRef.current?.style.setProperty('display', 'block')
  }


  const [tempTask, setTempTask] = useState<Todo>({
    id: '',
    title: '',
    completed: false,
    startTime: '',
    endTime: '',
  })

  useEffect(() => {
    setTempTask(task)
  }, [task])

  const handleEditOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTempTask({
      ...tempTask,
      title: e.target.value
    })
  }

  const handleSaveEditTask = () => {
    dispatch({ type: 'EDIT_TASK', payload: {title:tempTask.title, id: tempTask.id }})
    handleCloseEditModal()
  }

  const showAddTaskModal = () => { 
    addTaskRef.current?.style.setProperty('bottom', '0')
    addTaskRef.current?.classList.add('linear', 'duration-300')
  }

  const handleCloseAddTaskModal = () => {
      addTaskRef.current?.style.setProperty('bottom', '-100%')
      addTaskRef.current?.classList.add('linear', 'duration-300')
  }

  const [newTask, setNewTask] = useState<string>('')

  const handleNewTaskOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewTask(e.target.value)
  }

  const handleAddTask = () => {
    const payload = {
      id: state.todos.length + 1,
      title: newTask,
      completed: false,
      startTime: '10:00 am',
      endTime: '11:00 am',
    }
    dispatch({ type: 'ADD_TASK', payload})
    setNewTask('')
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

        <div className="fixed bottom-0 right-0 left-0 bg-white">
          <InputTaskBtn showAddTaskModal={showAddTaskModal} />
        </div>
        

      </section>

      <div className="fixed -bottom-full w-full bg-white" ref={viewTaskRef}>
        <ViewTask 
          task={task}
          viewRef={viewRef}
          handleDeleteTask={handleDeleteTask}
          handleCloseViewModal={handleCloseViewModal}
          handleEditButton={handleEditButton}
          editTaskRef={editTaskRef}
          handleCloseEditModal={handleCloseEditModal}
          handleEditOnChange={handleEditOnChange}
          tempTask={tempTask}
          handleSaveEditTask={handleSaveEditTask}
          
        />
      </div>

      <div className="fixed -bottom-full w-full bg-white" ref={addTaskRef}>
        <AddTask 
          handleCloseAddTaskModal={handleCloseAddTaskModal}
          handleNewTaskOnChange={handleNewTaskOnChange}
          handleAddTask={handleAddTask}
          newTask={newTask}
          
        />
      </div>
      
    </main>
  )
}
