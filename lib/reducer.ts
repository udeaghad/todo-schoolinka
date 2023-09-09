import { TodoState, TodoAction, Todo } from "@/types.dt"

const reducer = (state: TodoState, action: TodoAction) => {
  switch(action.type) {
    case 'GET_TODOS':
      return { 
        ...state, 
        todos: action.payload 
      };
    default:
      return state;
  }
}