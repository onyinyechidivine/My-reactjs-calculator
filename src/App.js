import { useState } from 'react';

function App() {
const [calc, setCalc ] = useState("");
const[result, setResult] =useState("");
const ops = ['+','-','*','/','DEL'];

const updateCalc = value => {
  if (
    (ops.includes(value) && (calc === ''))||
    (ops.includes(value) && ops.includes(calc.slice(-1)))
  ){
    return;
  }
  setCalc(calc + value);
  if(!ops.includes(value)) {
    setResult(Eval(calc + value).toString());
  }
  
}
const solveSingle = (arr) =>{
  arr = arr.slice();
  while(arr.length-1){
    if (arr[1] ==='*') arr[0] = arr[0] * arr[2]
    if (arr[1] ==='+') arr[0] = +arr[0] + (+arr[2])
    if (arr[1] ==='-') arr[0] = arr[0] - arr[2]
    if (arr[1] ==='/') arr[0] = arr[0] / arr[2]
    arr.splice(1,1);
    arr.splice(1,1);
  }
  return arr[0];

}
const Eval =(eq) =>{
  let res = eq.split(/(\+|-)/g).map(x => x.trim().split(/(\*|\/)/g).map(a =>a.trim()));
  res = res.map(x => solveSingle(x));//evaluate nexted * and / operations.
  return solveSingle(res) //at last evaluating + and -
}
  

  const calculate = () => {
    setCalc(Eval(calc).toString());
  }

  const deleteLast = () => { 
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  }

  return (
    <div className="App">
    <div className="Reactjs Calculator">
    <h1>Reactjs Calculator</h1>
      <div className = "display">
       {result ?  <span>({result})</span> : '' }
        { calc || "0"}
      </div>
      <div className="operators">
          <button onClick = {() => updateCalc('*')}>*</button>
          <button onClick = {() => updateCalc('+')}>+</button>
          <button onClick = {() => updateCalc('-')}>-</button>
          <button onClick = {() => updateCalc('/')}>/</button>

          <button onClick={deleteLast}>DEL</button>
      </div>

      <div className="digit">

          <button onClick = {() => updateCalc('0')}>0</button>
          <button onClick = {() => updateCalc('1')}>1</button>
          <button onClick = {() => updateCalc('2')}>2</button>
          <button onClick = {() => updateCalc('3')}>3</button>
          <button onClick = {() => updateCalc('4')}>4</button>
          <button onClick = {() => updateCalc('5')}>5</button>
          <button onClick = {() => updateCalc('6')}>6</button>
          <button onClick = {() => updateCalc('7')}>7</button>
          <button onClick = {() => updateCalc('8')}>8</button>
          <button onClick = {() => updateCalc('9')}>9</button>
          <button onClick = {() => updateCalc('.')}>.</button>
          <button onClick={calculate}>=</button>
      </div>
    </div>
    </div>
  );
}

export default App;
