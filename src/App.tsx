import React from "react";
import "./App.css";

const Heading = (props: { title: string }) => {
  <h2>{props.title}</h2>;
};

function App() {
  return (
    <div>
      <Heading title="Introduction" />
    </div>
  );
}

export default App;
