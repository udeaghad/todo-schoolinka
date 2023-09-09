import { TodoItemProps } from "@/types.dt";

const TodoItem = ({handleCheckBox, ...todo}:TodoItemProps) => {
  return (
    <div 
      className='flex justify-start items-center mx-3 my-3 p-2 gap-2 w-[100] bg-pry-gray drop-shadow-md hover:bg-sec-gray cursor-pointer'
    >
      <input type="checkbox" checked={todo.completed} onChange={() => handleCheckBox(todo.id)} />
      <div 
        className='flex justify-between items-center gap-2 w-full'
        
      >
        
        <div style={{color: todo.completed ? 'gray' : 'black', textDecorationLine: todo.completed ? 'line-Through' : 'none'}}>
          <h3 className='text-base font-bold' >{todo.title}</h3>
          <span className='text-sm'>{todo.startTime} - {todo.endTime}</span>
        </div>

        <p className='text-sm'>Today</p>
      </div>
    </div>
  )
}

export default TodoItem