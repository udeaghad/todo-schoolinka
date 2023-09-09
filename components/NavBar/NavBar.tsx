import {HiMenuAlt1} from 'react-icons/hi';

const NavBar = () => {
  return (
    <nav className='p-3 border-b-2 w-full'>
      <div className='px-5 flex justify-between w-full items-center'>
        <div>
          <h1 className='text-xl font-black'>
            ToDo
          </h1>
        </div>

        <div>
          <HiMenuAlt1 className='text-xl text-gray-500'/>
        </div>

      </div>

    </nav>
  )
}

export default NavBar