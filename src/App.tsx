import React, { useCallback, useRef } from "react";
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
  const newTodoRef = useRef<HTMLInputElement>(null);
  const onAddTodo = useCallback(() => {
    if (newTodoRef.current) {
      dispatch({ type: "ADD", text: newTodoRef.current.value || "" });
    }
  }, []);

  return (
    <div className="app-container">
      <Heading title="Introduction" />
      <Box>Hello There</Box>
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
