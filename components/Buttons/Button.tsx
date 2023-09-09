import { ButtonProps } from "../../types.dt"

const Button = ({title, bgColor, hoverColor, handleClick}: ButtonProps) => {
  return (
    <button className={`border border-gray-400 w-28 rounded-md p-1 text-center text-sm text-gray-700 font-semibold`} 
      onClick={handleClick} 
      style={{backgroundColor: bgColor, color: bgColor === 'white' ? 'black' : 'white'}}
      onMouseEnter={(e) => {e.currentTarget.style.backgroundColor = hoverColor; e.currentTarget.style.color = hoverColor === 'white' ? 'black' : 'white'   }}
      onMouseLeave={(e) => {e.currentTarget.style.backgroundColor = bgColor; e.currentTarget.style.color = bgColor === 'white' ? 'black' : 'white' }}
    >
      {title}
    </button>
  )
}

export default Button