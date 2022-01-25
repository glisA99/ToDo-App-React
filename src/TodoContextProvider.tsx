import React from 'react';
import { setTextRange } from 'typescript';
import { ITodoItem } from './Todo';

export interface ITodoContext {
    todos: Array<ITodoItem>,
    count: number,
    unfinished: number,
    addTodo: (todo: ITodoItem) => void,
    removeTodo: (id: number) => void,
    toggleTodo: (id: number) => void,
    reset: () => void
}

const initialState: ITodoContext = {
    todos: [],
    count: 0,
    unfinished: 0,
    addTodo: () => {},
    removeTodo: () => {},
    toggleTodo: () => {},
    reset: () => {}
}

export const TodoContext = React.createContext<ITodoContext>(initialState);

export const TodoContextProvider:React.FC = ({ children }) => {

    const [state, setState] = React.useState<ITodoContext>(initialState);

    // dodavanje novog task-a
    const addTodo = (todo: ITodoItem) => {
        console.log("Add todo called...");
        setState(state => {
            return { ...state,
                todos: [...state.todos, todo], 
                count: state.count + 1, 
                unfinished: state.unfinished + 1 
            };
        });
    }

    // toggle = markiranje kao finished/unfinished
    const toggleTodo = (id: number) => {
        console.log("Toggle todo called...");
        const todo = state.todos.find(todo => todo.id === id);
        if (todo === undefined) throw new Error("Invalid todo id");
        todo.finished = !todo.finished;
        setState(state => {
            return {
                ...state,
                unfinished: todo.finished === true ? state.unfinished - 1 : state.unfinished + 1
            }
        });
    }
    
    // brisanje task-a
    const removeTodo = (id: number) => {
        console.log("Remove todo called...");
        const todo = state.todos.find(todo => todo.id === id);
        if (todo === undefined) throw new Error("Invalid todo id");
        setState(state => {
            return { ...state,
                todos: state.todos.filter(todo => todo.id !== id),
                count: state.count - 1,
                unfinished: todo.finished === true ? state.unfinished : state.unfinished - 1
            }
        })
    }

    const restart = () => {
        setState({
            ...initialState,
            addTodo,
            removeTodo,
            toggleTodo,
            reset: restart
        });
    }

    return (
        <TodoContext.Provider value={{ ...state, addTodo, removeTodo, toggleTodo, reset: restart }}>
            {children}
        </TodoContext.Provider>
    )

}

