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
    default:
      return state;
  }
}

export default reducer;