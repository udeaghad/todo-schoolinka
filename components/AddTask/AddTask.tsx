import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineDateRange } from 'react-icons/md';
import {  BiTimeFive } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';
import { AddTaskProps} from "../../types.dt"
import Button from '../Buttons/Button';


const AddTask = ({handleCloseAddTaskModal, handleNewTaskOnChange, handleAddTask, newTask}: AddTaskProps) => {
  return (
    <div className='h-72 w-full rounded-2xl p-4 border-2'>
      <div className='flex justify-between items-center'>
        <div>
          <span className='text-sm font-bold'>Add Task</span>
        </div>

        <div onClick={handleCloseAddTaskModal}>
          <AiOutlineClose  className='text-gray-700 text-base font-bold cursor-pointer'/>
        </div>
      </div>

      
      <textarea 
        placeholder="Add new task" 
        className='h-28 w-full border border-gray-400 rounded-md bg-sec-gray mt-1 p-2'
        onChange={handleNewTaskOnChange} 
        value={newTask}
      />
     

      <div className='flex justify-between w-full items-center'>
        <div className='h-8 border border-gray-400 p-2 rounded-md flex justify-center items-center gap-2 text-gray-400'>
          <MdOutlineDateRange />
          <span className='text-sm'>Today</span>          
        </div>

        <div className='h-8 border border-gray-400 p-2 rounded-md flex justify-center items-center gap-2 text-gray-400'>
          <BiTimeFive />
          <span className='text-sm'>00.00</span>          
        </div>

        <div className='h-8 border border-gray-400 p-2 rounded-md flex justify-center items-center gap-2 text-gray-400'>
          <BiTimeFive />
          <span className='text-sm'>00.00</span>          
        </div>
      </div>

      <div className='text-gray-700 text-sm flex justify-between items-center mt-2'>
        <div className='flex justify-center items-center gap-2'>
          <FaBell  />
          <span>10 minutes before</span> 
        </div>
        <AiOutlineClose />
      </div>

      <div className='flex justify-between items-center w-full mt-3'>
        
        <Button title='Cancle' bgColor='white' handleClick={handleCloseAddTaskModal} hoverColor='red' />
        <Button title='Add' bgColor='#0e31f2' handleClick={handleAddTask} hoverColor='#3d58ed' />
        
      </div>
    </div>
  )
}

export default AddTask