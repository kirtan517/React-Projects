import {useState} from 'react';
import TodoForm from './TodoForm.js';
import Todo from "./Todo.js";

function TodoList(){
    const [todos,setTodos] = useState([]);
    const [counter , setCounter] = useState(1);

    const addTodo = todo=>{
        if(!todo.text || /^\s*$/.test(todo.text))
            return;

        const newTodos = [todo, ...todos];
        console.log(newTodos);
        setTodos(newTodos);
    };

    const completeTodo = id =>{
        console.log("hey I am working");
        const updatedTodos = todos.map(todo => {
           if(todo.id === id)
           {
                todo.isComplete =  !todo.isComplete;
           }
           return todo;
        });
        setTodos(updatedTodos);
    }

    const removeTodo = id=>{
        const removeArr = todos.filter(todo=>todo.id !== id);
        setTodos(removeArr);
    }

    const updateTodo = (todoid,newValue) =>{
        if(!newValue.text || /^\s*$/.test(newValue.text))
            return;
        
        const newTodo = todos.map(todo =>{
            if(todo.id === todoid)
            {
               return  newValue;
            }
            else
            {  
                return todo;
            }
        });

        setTodos(newTodo);
    }

    return(
        <div>
            What's the plan today?
        <TodoForm onSubmit={addTodo} counter = {counter} setCounter = {setCounter} />
        <Todo todos = {todos} completeTodo={completeTodo} removeTodo={removeTodo} updateTodo={updateTodo} counter={counter} 
        setCounter={setCounter}/>
        </div>
    )
};

export default TodoList