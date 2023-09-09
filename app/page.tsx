"use client";

import React, {useEffect, useReducer, useRef, useState} from "react";
import { MdAdd } from "react-icons/md";
import ReactPaginate from 'react-paginate';

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
  const clenderRef = useRef<HTMLDivElement>(null)

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
    handleCloseViewModal()
  }

  const showAddTaskModal = () => { 
    if (window.innerWidth > 768) {
      clenderRef.current?.style.setProperty('display', 'none')      
      addTaskRef.current?.style.setProperty('right', '1%')
      addTaskRef.current?.classList.add('linear', 'duration-300')
    } else {       
      addTaskRef.current?.style.setProperty('bottom', '0')
      addTaskRef.current?.classList.add('linear', 'duration-300')
    }
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

  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<Todo[]>([])
  const [pageCount, setPageCount] = useState<number>(0)
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems( state.todos.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(state.todos.length / itemsPerPage));   

  }, [itemOffset, state.todos])

  const handlePageClick = (e: { selected: number; }) => {
    const newOffset = (e.selected * itemsPerPage) % state.todos.length;    
    setItemOffset(newOffset);
  }



  return (
    <main>
      <div className="fixed top-0 w-full bg-white z-50">
        <NavBar />
      </div>

      <section className='px-3 pt-5 mt-16 md:flex md:justify-between md:items-start md:w-full md:px-5'>
        <div>
          <h2 className='text-xl font-bold'>Good morning!</h2>
          <p className='text-sm text-gray-500'>You got some task to do. </p>
        </div> 

        <div className="hidden md:block">
          <button className='border border-primary bg-primary rounded-md p-2 text-center text-sm text-white font-semibold hover:bg-secondary flex justify-center items-center gap-2' 
            onClick={showAddTaskModal} 
          >
            <MdAdd className='text-white text-xl'/>
            <span>Create New Task</span>
          </button>
        </div>      
      </section>

      <section className="mt-5 md:flex md:justify-start md:items-start md:gap-[1%] md:w-full md:px-5">
      <div className="md:w-[70%]">
        <div ref={datePickerRef}>
          <DatePicker />
        </div>

        <div className="md:hidden">
          {state.todos.map((todo: Todo) => (
            <TodoItem key={todo.id} {...todo} handleCheckBox={handleCheckBox} handleViewTaskModal={handleViewTaskModal} />
          ))}
        </div>

        <div className="hidden md:block">
          <div>
            {currentItems.map((todo: Todo) => (
              <TodoItem key={todo.id} {...todo} handleCheckBox={handleCheckBox} handleViewTaskModal={handleViewTaskModal} />
            ))}
          </div>
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< Previous"
            renderOnZeroPageCount={null}
            containerClassName="flex justify-between items-center m-5 w-full"
            pageClassName="cursor-pointer rounded-full w-8 h-8 flex justify-center items-center text-gray-500 bg-sec-gray hover:bg-secondary"
            previousClassName="cursor-pointer rounded-md p-1 h-8 flex justify-center items-center text-gray-500 bg-sec-gray hover:bg-primary"
            nextClassName="cursor-pointer rounded-md p-1 h-8 flex justify-center items-center text-gray-500 bg-sec-gray hover:bg-primary" 
            activeClassName="text-white bg-primary w-8 h-8 rounded-full"
            breakClassName="text-gray-500"
            activeLinkClassName="text-white bg-primary w-full h-full flex justify-center items-center rounded-full"
            pageLinkClassName="text-gray-500 text-sm hover:text-white"
            previousLinkClassName="text-gray-500 text-sm hover:text-white"
            nextLinkClassName="text-gray-500 text-sm hover:text-white"
          />

        </div>

        <div className="fixed bottom-0 right-0 left-0 bg-white md:hidden">
          <InputTaskBtn showAddTaskModal={showAddTaskModal} />
        </div>
      </div>

      <div className="md:w-[25%]">

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
