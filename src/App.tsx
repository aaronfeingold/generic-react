import React, { useCallback, useState, useEffect } from "react";
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

  const [todos, dispatch] = useReducer(todos: Todo[])
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello There</Box>
      <List items={["Item 1", "Item 2", "Item 3"]} onClick={onListClick} />
      <Box>{JSON.stringify(payload)}</Box>
    </div>
  );
}

export default App;
