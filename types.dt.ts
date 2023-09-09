export interface Todo {
  id: string;
  title: string; 
  completed: boolean;
  startTime?: string;
  endTime?: string;
}

export interface TodoState {
  todos: Todo[];  
}

export interface TodoAction {
  type: string;
  payload: any;
}

export interface TodoItemProps extends Todo {
  handleCheckBox: (id: string) => void;
  handleViewTaskModal: (id: string) => void;
}

export interface ViewTaskProps {
  task: Todo;
  viewRef: React.RefObject<HTMLDivElement>;
}
