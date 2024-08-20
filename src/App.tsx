import React, {
  useCallback,
  useState,
  useEffect,
  useReducer,
  useRef,
} from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => <h2>{title}</h2>;

interface BoxProps {
  children: React.ReactNode;
}

const Box: React.FunctionComponent<BoxProps> = ({ children }) => (
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>
);

const List: React.FunctionComponent<{
  items: string[];
  onClick?: (item: string) => void;
}> = ({ items, onClick }) => (
  <ul>
    {items.map((item, index) => (
      <li key={index} onClick={() => onClick?.(item)}>
        {item}
      </li>
    ))}
  </ul>
);

interface Payload {
  text: string;
}

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

type ActionType =
  | { type: "ADD"; text: string }
  | { type: "REMOVE"; id: number };

function App() {
  const onListClick = useCallback((item: string) => {
    alert(item);
  }, []);
  const [payload, setPayload] = useState<Payload | null>(null);

  useEffect(() => {
    fetch("/data.json")
      .then((response) => response.json())
      .then((json) => setPayload(json));
  }, []);

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
  }, []);

  const newTodoRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: "ADD", text: newTodoRef.current.value || "" });
    }
  }, []);
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello There</Box>
      <List items={["Item 1", "Item 2", "Item 3"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
      <Heading title="Todo List" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <button onClick={() => dispatch({ type: "REMOVE", id: todo.id })}>
            Remove
          </button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={onAddTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
