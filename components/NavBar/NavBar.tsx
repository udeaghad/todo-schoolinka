import { HiMenuAlt1 } from 'react-icons/hi';
import { AiOutlineSetting } from 'react-icons/ai';
import { FiBell } from 'react-icons/fi';

const NavBar = () => {
  return (
    <nav className='p-3 border-b-2 w-full'>
      <div className='px-5 flex justify-between w-full items-center'>

        <div>
          <h1 className='text-xl font-black'>ToDo</h1>
        </div>

        <div className='md:hidden'>
          <HiMenuAlt1 className='text-xl text-gray-500' />
        </div>

        <div className='hidden md:flex md:justify-center md:items-center md:gap-5'>
          <AiOutlineSetting className="text-xl" />
          <FiBell className="text-xl" />
          <div className='rounded-full bg-gray-500 w-8 h-8'>
            <p className='text-white text-sm text-center pt-1'>A</p>
          </div>

        </div>
      </div>
    </nav>
  )
}

export default NavBar