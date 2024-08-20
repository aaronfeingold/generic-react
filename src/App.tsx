import React from "react";
import "./App.css";

const Heading = ({ title }: { title: string }) => {
  <h2>{title}</h2>;
};

const Box: React.FunctionComponent = ({ children }) => {
  <div
    style={{
      padding: "1rem",
      fontWeight: "bold",
    }}
  >
    {children}
  </div>;
};

function App() {
  return (
    <div>
      <Heading title="Introduction" />
      <Box>Hello There</Box>
    </div>
  );
}

export default App;
