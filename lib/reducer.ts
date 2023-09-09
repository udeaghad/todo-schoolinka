import { TodoState, TodoAction, Todo } from "@/types.dt"

const reducer = (state: TodoState, action: TodoAction) => {
  switch(action.type) {
    case 'GET_TODOS':
      return { 
        ...state, 
        todos: action.payload 
      };

    case 'UPDATE_STATUS':        
      return {
        ...state,
        todos: state.todos.map((todo: Todo) => {
          if(todo.id === action.payload) {
            todo.completed = !todo.completed;
          }
          return todo;
        })
      };

    case 'DELETE_TASK':
      return {
        ...state,
        todos: state.todos.filter((todo: Todo) => todo.id !== action.payload)
      };

    case 'EDIT_TASK':
      return {
        ...state,
        todos: state.todos.map((todo: Todo) => {
          if(todo.id === action.payload.id) {
            todo.title = action.payload.title;
          }
          return todo;
        })
      }

        
    default:
      return state;
  }
}

export default reducer;