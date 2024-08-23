import { useReducer, useCallback, createContext, useContext } from "react";
import { createGlobalState } from "react-use";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

const useGlobalTodos = createGlobalState<Todo[]>([]);

type UseTodosManagerResult = ReturnType<typeof useTodosManager>;

const TodoContext = createContext<UseTodosManagerResult>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

function useTodosManager(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();
  const [todos, dispatch] = useReducer((state: Todo[], action: ActionType) => {
    switch (action.type) {
      case "ADD":
        return [
          ...state,
          {
            id: state.length + 1,
            done: false,
            text: action.text,
          },
        ];
      case "REMOVE":
        return state.filter(({ id }) => id !== action.id);
      default:
        throw new Error();
    }
  }, initialTodos);

  const addTodo = useCallback(
    (text: string) => dispatch({ type: "ADD", text }),
    []
  );

  const removeTodo = useCallback(
    (id: number) => dispatch({ type: "REMOVE", id }),
    []
  );

  return { todos, addTodo, removeTodo };
}

export const TodosProvider: React.FunctionComponent<{
  initialTodos: Todo[];
  children: React.ReactNode;
}> = ({ initialTodos, children }) => (
  <TodoContext.Provider value={useTodosManager(initialTodos)}>
    {children}
  </TodoContext.Provider>
);

export const useAddTodo = (): UseTodosManagerResult["addTodo"] => {
  const { addTodo } = useContext(TodoContext);
  return addTodo;
};

export const useRemoveTodo = (): UseTodosManagerResult["removeTodo"] => {
  const { removeTodo } = useContext(TodoContext);
  return removeTodo;
};

export const useTodos = (): UseTodosManagerResult["todos"] => {
  const { todos } = useContext(TodoContext);
  return todos;
};
