import './style.css'
import './App.css';
import {useReducer} from 'react';
import DigitButton from './DigitButton';
import OperationButton from './OperationButton';

export const ACTIONS = {
  ADD_DIGIT : "add-digit",
  CLEAR : "clear",
  DELETE_DIGIT : "delete-digit",
  CHOOSE_OPERATION : "choose-operation",
  EVALUATE: "evaluate"
};

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us",{
  maximumFractionDigits: 0,
})

function formatOperand(operand){
  if(operand == null) return ;
  const [integer,decimal] = operand.split('.')
  if(decimal == null) return INTEGER_FORMATTER.format(integer);
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`;
}

function reducer(state,{type, payload}){
  switch(type){
    case ACTIONS.ADD_DIGIT:
      if(state.overwrite) return {...state,overwrite : false , currentOperand : `${payload.digit}`};
      if(state.currentOperand === "0" && payload.digit === "0") return state;
      if(payload.digit === "." && state.currentOperand.includes(".")) return state;
      if(state.currentOperand === "0" && payload.digit !== "0" && payload.digit !== ".") return {...state,currentOperand : `${payload.digit}` }
      return {...state,
        currentOperand : `${state.currentOperand || ""}${payload.digit}`  };
    case ACTIONS.CLEAR:
      return {currentOperand:"0",
              previousOperand : null,
              operation : null};
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperand === "0" && state.previousOperand === null) return state;

      if(state.previousOperand == null)
      return {
        ...state,
        previousOperand : state.currentOperand,
        operation : payload.operation,
        currentOperand:"0" 
      };
      
      if(state.currentOperand == "0")
      {
        return {
          ...state,
          operation : payload.operation
        };

      }

      return{
        ...state,
        previousOperand : evaluate(state),
        operation : payload.operation,
        currentOperand : "0"
      };
    case ACTIONS.EVALUATE:
      if(state.previousOperand == null || state.operation == null) return state;
      return {
        ...state,
        overwrite : true,
        currentOperand : evaluate(state),
        previousOperand : null,
        operation : null
      }
    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite) return {currentOperand : "0"};
      if(state.currentOperand === "0") return state;
      if(state.currentOperand.length === 1) return { ...state,currentOperand: "0"};
      return {
        ...state,
        currentOperand : state.currentOperand.slice(0,-1)
      };
    }
};

function evaluate({currentOperand,operation,previousOperand})
{
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if(isNaN(previous)) return "";
  let computation = "";
  switch(operation){
    case "+" : 
    computation = previous+current;
    break;
    case "-":
      computation = previous - current;
      break;
    case "*":
      computation = previous * current;
      break;
    case "÷":
      computation = previous / current;
      break;
  }

  return computation.toString();
};

function App() {
  const [{currentOperand,previousOperand,operation},dispatch] = useReducer(reducer,{currentOperand:"0",previousOperand : null,operation : null});
  return(
    <div className = "calculator-grid">
      <div className='output'>
         <div className='previous-operand'>{formatOperand(previousOperand)} {operation}</div>
         <div className='current-operand'>{formatOperand(currentOperand)}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({type: ACTIONS.CLEAR})}>AC</button>
      
      <button onClick={() => dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <OperationButton operation= "÷" dispatch={dispatch} />
      <DigitButton digit ="1" dispatch={dispatch}/>
      <DigitButton digit ="2" dispatch={dispatch}/>
      <DigitButton digit ="3" dispatch={dispatch}/>
      <OperationButton operation= "*" dispatch={dispatch} />
      <DigitButton digit ="4" dispatch={dispatch}/>
      <DigitButton digit ="5" dispatch={dispatch}/>
      <DigitButton digit ="6" dispatch={dispatch}/>
      <OperationButton operation= "+" dispatch={dispatch} />
      <DigitButton digit ="7" dispatch={dispatch}/>
      <DigitButton digit ="8" dispatch={dispatch}/>
      <DigitButton digit ="9" dispatch={dispatch}/>
      <OperationButton operation= "-" dispatch={dispatch} />
      <DigitButton digit ="." dispatch={dispatch}/>
      <DigitButton digit ="0" dispatch={dispatch}/>
      <button className='span-two' onClick={() => dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
};

export default App;
