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
        margin: "20px",
        borderRadius: "0.5rem",
        border: "none",
        fontSize: "xx-large",
      }}
    >
      {title ?? children}
    </button>
  );
};

function UL<T>({
  items,
  render,
  itemClick,
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
> & {
  items: T[];
  render: (item: T) => React.ReactNode;
  itemClick: (item: T) => void;
}) {
  return (
    <ul>
      {items.map((item, index) => (
        <li
          onClick={(e) => {
            e.preventDefault();
            return itemClick(item);
          }}
          key={index}
        >
          {render(item)}
        </li>
      ))}
    </ul>
  );
}

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
      <UL
        className="todo-list"
        items={todos}
        itemClick={(todo) => alert(todo)}
        render={(todo) => (
          <>
            {todo.text}
            <Button
              onClick={(e) => {
                e.preventDefault();
                return removeTodo(todo.id);
              }}
            >
              Remove
            </Button>
          </>
        )}
      />
      <div>
        <input type="text" ref={newTodoRef} />
        <button onClick={() => onAddTodo()}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;
