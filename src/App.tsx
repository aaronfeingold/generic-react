import React, { useCallback, useRef } from "react";
import "./App.css";
import useTodos from "./useTodos";

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

const Button: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { title?: string }
> = ({ title, children, ...rest }) => {
  return (
    <button
      {...rest}
      style={{
        backgroundColor: "blue",
        color: "white",
        padding: "0.5rem",
        borderRadius: "0.5rem",
        border: "none",
        fontSize: "xx-large",
      }}
    >
      {title ?? children}
    </button>
  );
};

function App() {
  const { todos, addTodo, removeTodo } = useTodos([
    { id: 0, text: "default todo", done: false },
  ]);

  const newTodoRef = useRef<HTMLInputElement>(null);

  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      addTodo(newTodoRef.current.value || "");
    }
  }, []);

  return (
    <div className="app-container">
      <Heading title="New River Gorge Trip 08/2024" />
      <Box>My Weekend Planner</Box>
      <Heading title="Todo List" />
      {todos.map((todo) => (
        <div key={todo.id}>
          {todo.text}
          <Button onClick={() => removeTodo(todo.id)}>Remove</Button>
        </div>
      ))}
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={() => onAddTodo()}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
