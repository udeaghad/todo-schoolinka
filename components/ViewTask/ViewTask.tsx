import { AiOutlineClose } from 'react-icons/ai';
import { MdOutlineDateRange } from 'react-icons/md';
import { BiTimeFive } from 'react-icons/bi';


import { ViewTaskProps } from "@/types.dt";

const ViewTask = ({ task, viewRef }: ViewTaskProps) => {
  return (
    <div className='relative h-96 w-full rounded-2xl p-4 border-2 bg-white'>
      <div ref={viewRef}>

        <div className='absolute right-4 top-4'>
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


      </div>
    </div>
  )
}

export default ViewTask