import { BiSolidMicrophone } from 'react-icons/bi'
import { InputTaskBtnProps } from '../../types.dt' 

const InputTaskBtn = ({showAddTaskModal}: InputTaskBtnProps) => {
  return (
    <div className='h-10 p-2 bg-pry-gray mx-2 my-2 rounded-md border border-gray-400 flex justify-between items-center cursor-pointer hover:bg-sec-gray' onClick={showAddTaskModal}>
      <p>Input task</p>
      <BiSolidMicrophone className='text-2xl text-primary' />
    </div>
  )
}

export default InputTaskBtn