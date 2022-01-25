import React from "react";
import { TodoContext } from "./TodoContextProvider";
import { TodoList } from "./TodoList";
import { TodoItem } from './Todo';

export const TodoContainer = () => {

    const context = React.useContext(TodoContext);

    const [input, setInput] = React.useState<string>("");

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }

    const onAddButtonClick = () => {
        console.log("CALLED");
        // create new todo using input as task
        const newTodo = new TodoItem(input);
        // call add todo function in context
        context.addTodo(newTodo);
        // set input to default empty string
        setInput("");
    }

    const onResetButtonClick = () => {
      context.reset();
    }

  return (
    <div className="todo-container">

      <h2>Todo list</h2>
      <p>Count: {context.count}</p>
      <p>Unfinished tasks: {context.unfinished}</p>

      <input type={"text"} className="todo-input" placeholder="Add new todo..." value={input} onChange={onInputChange}/><br></br>
      <input type="button" className="todo-button" value={"Add"} onClick={onAddButtonClick}/>

      <hr></hr>

      <TodoList todos={context.todos} toggleTodo={context.toggleTodo} deleteTodo={context.removeTodo} />

      <hr></hr>

      <input type="button" className="todo-button" value={"Reset"} onClick={onResetButtonClick}/>

    </div>
  );

};
