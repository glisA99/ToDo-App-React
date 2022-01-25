import React from "react";
import "./App.css";
import { TodoContainer } from "./TodoContainer";
import { TodoContextProvider } from "./TodoContextProvider";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TodoContextProvider>
          <TodoContainer />
        </TodoContextProvider>
      </header>
    </div>
  );
}

export default App;
