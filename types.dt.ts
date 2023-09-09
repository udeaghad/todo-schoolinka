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
  handleDeleteTask: (id: string) => void;
  handleCloseViewModal: () => void;
  handleEditButton: () => void;
  editTaskRef: React.RefObject<HTMLDivElement>;
  handleCloseEditModal: () => void;
  handleEditOnChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  tempTask: Todo;
  handleSaveEditTask: () => void;
}

export interface ButtonProps {
  title: string | JSX.Element;
  bgColor: string;
  hoverColor: string;
  handleClick: () => void;
}
