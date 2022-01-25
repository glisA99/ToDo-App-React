import React from 'react';
import { ITodoItem } from './Todo';

export interface ITodoItemProps {
    id: number,
    task: string,
    finished: boolean,
    toggleTodo: (id: number) => void,
    deleteTodo: (id: number) => void
}

export const TodoItem:React.FC<ITodoItemProps> = ({ finished, task: title, toggleTodo, id, deleteTodo }) => {

    const activeStyle = {
        backgroundColor: "green"
    }
    
    const finishedStyle = {
        backgroundColor: "grey"
    }

    const finishedParagraphStyle = {
        textDecoration: "line-through"
    }

    const onDeleteClick = () => {
        deleteTodo(id);
    }

    const onCircleClick = () => {
        toggleTodo(id);
    }

    return (
        <div className='todo-item'>
            <div className='todo-item-title'>
                <div className='circle-div' style={finished ? finishedStyle : activeStyle} onClick={onCircleClick}></div>
                <p className='todo-item-paragraph' style={finished ? finishedParagraphStyle : {}}>{title}</p>
            </div>
            <div className='todo-item-button'>
                <input type="button" value={"Delete"} className='delete-button' onClick={onDeleteClick} />
            </div>
        </div>
    )

}

export interface ITodoListProps {
    todos: Array<ITodoItem>,
    toggleTodo: (id:number) => void,
    deleteTodo: (id:number) => void
}

export const TodoList:React.FC<ITodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {

    if (todos.length === 0) return <p className='todo-list-message'>There are no active todos...</p>

    return (
        <div className='todo-list'>
            {todos.map(todo => {
                return (
                    <TodoItem 
                        key={todo.id} 
                        task={todo.task} 
                        finished={todo.finished} 
                        id={todo.id} 
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                    /> 
                )
            })}
        </div>
    )

}