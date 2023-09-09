import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineDateRange } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';
import { FaBell } from 'react-icons/fa';

import Button from '../Buttons/Button';


import { ViewTaskProps } from "@/types.dt";

const ViewTask = ({ 
  task, 
  viewRef, 
  handleDeleteTask, 
  handleCloseViewModal, 
  handleEditButton, 
  editTaskRef, 
  handleCloseEditModal, 
  handleEditOnChange, 
  tempTask, 
  handleSaveEditTask 
}: ViewTaskProps) => {
  
  return (
    <div className='relative h-96 w-full rounded-2xl p-4 border-2 bg-white'>
      <div ref={viewRef}>

        <div className='absolute right-4 top-4' onClick={handleCloseViewModal}>
          <AiOutlineClose className='text-gray-900 text-base font-bold cursor-pointer' />
        </div>

        <div className='my-7'>
          <span className='text-base font-bold'>{task.title}</span>
        </div>

        <div>
          <div className='flex justify-start items-center gap-2'>
            <MdOutlineDateRange className='text-primary' />
            <span className='text-sm font-semibold'>{new Date().toLocaleDateString()}</span>
          </div>
          <div className='flex justify-start items-center gap-2'>
            <BiTimeFive className='text-primary' />
            <span className='text-sm font-semibold'>{task.startTime} - {task.endTime}</span>
          </div>
        </div>

        <div className='flex justify-between items-center w-full mt-5'>

          <Button title='Delete' bgColor='white' handleClick={() => handleDeleteTask(task.id)} hoverColor='red' />
          <Button title='Edit' bgColor='#0e31f2' handleClick={handleEditButton} hoverColor='#3d58ed' />

        </div>
      </div>

      {// Edit Task Modal
      }

      <div className='hidden' ref={editTaskRef}>
        <div className='flex justify-between items-center'>
          <div>
            <span className='text-sm font-bold'>Edit Task</span>
          </div>

          <div onClick={handleCloseEditModal}>
            <AiOutlineClose className='text-gray-700 text-base font-bold cursor-pointer' />
          </div>
        </div>


        <textarea
          className='h-28 w-full border border-gray-400 rounded-md bg-sec-gray mt-1 p-2'
          onChange={handleEditOnChange}
          value={tempTask.title}
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
            <FaBell />
            <span>10 minutes before</span>
          </div>
          <AiOutlineClose />
        </div>

        <div className='flex justify-between items-center w-full mt-3'>

          <Button title='Cancle' bgColor='white' handleClick={handleCloseEditModal} hoverColor='red' />
          <Button title='Save' bgColor='#0e31f2' handleClick={handleSaveEditTask} hoverColor='#3d58ed' />

        </div>
      </div>
    </div>
  )
}

export default ViewTask