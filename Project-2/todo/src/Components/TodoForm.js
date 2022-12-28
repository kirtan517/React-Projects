import React from "react";
import {useState} from "react";
import {useEffect,useRef} from "react";

function TodoForm(prop) {
    const [input,setInput] = useState(prop.edit ? prop.edit.value: "" );
    const inputRef = useRef("");

    useEffect(()=>{
        inputRef.current.focus();
    })
    
    const handleClick = e=>{
        setInput(e.target.value);
    }

    const handleSubmit = e =>{
        e.preventDefault();

        prop.onSubmit(
            {
                id: prop.counter,
                text: input,
                isComplete: false
            }
        );
        prop.setCounter(prop.counter+1);
        setInput("");
    }

    return (
        <form className="todo-form" onSubmit={handleSubmit}>
            {prop.edit ? (
                <>
                 <input
                 type= "text" 
                 className="todo-input edit"
                 placeholder="Update your item"
                 name = "text"
                 value = {input}
                 onChange={handleClick}
                 ref ={inputRef}
                 />
                 <button className="todo-button edit" >Update</button>
                 </>
            ) : (
                <>
                <input
                type= "text" 
                className="todo-input"
                placeholder="Add a todo"
                name = "text"
                value = {input}
                onChange={handleClick}
                ref ={inputRef}
                />
                <button className="todo-button" >Add todo</button>
                </>
    

            )}
        </form>
    )
};

export default TodoForm;

