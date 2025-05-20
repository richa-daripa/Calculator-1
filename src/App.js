import React, { useState } from 'react';
import ButtonValues from './Component/ButtonValues.jsx';
import buttonValue from './data.js';
import './App.css';


export default function App() {
  const [result, setResult] = useState('');
  const [isCal, setisCal] = useState(false);

  const evaluate = (exp) => {

    let num = [];
    let op = [];
    let curr = "";
    const operators = ['+', '-', '*', '/'];

    let charArray = exp.split('');

    for (let i = 0; i < charArray.length; i++) {
      let char = charArray[i];

      if (operators.includes(char)) {
        num.push(Number(curr));
        op.push(char);
        curr = "";
      } else {
        curr += char;
      }
    }
    num.push(Number(curr));

    for (let i = 0; i < op.length; i++) {
      if (op[i] === "*" || op[i] === '/') {
        let a = num[i];
        let b = num[i + 1];
        let ans = op[i] === '*' ? a * b : a / b;
        num.splice(i, 2, ans);
        op.splice(i, 1);
        i--;
      }
    }

    let result = num[0];
    for (let i = 0; i < op.length; i++) {
      result = op[i] === '+' ? result + num[i + 1] : result - num[i + 1];
    }
    return result;
  }

  const calculate = () => {
    try {
      setResult(evaluate(result));
      setisCal(true);
    } catch (error) {
      setResult('Error');
      setisCal(true);
    }
  };

  const handleClick = (e) => {
    const value = e.target.value;

    const op = ['+', '-', '*', '/', '.'];

    if (result.toString().length === 0 && op.includes(value)) {
      return;
    }

    if (op.includes(value) && op.includes(result.toString().slice(-1))) {
      return;
    }

    if (isCal === true) {
      if (op.includes(value)) {
        setResult((prev) => prev + value);
      } else {
        setResult(value);//instead of clearing, set the new input immediately
      }
      setisCal(false);
    } else {
      setResult((prev) => prev + value);
    }
  };

  const handleAC = () => {
    setResult('');
  };

  const handleDel = () => {
    setResult(result.toString().slice(0, -1));
  };

  const percentOp = () => {
    setResult(result / 100);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="display">
          <input type="text" value={result} placeholder="0" />
        </div>
        <div>
          <input type="button" value="AC" onClick={handleAC} />
          <input type="button" value="DE" onClick={handleDel} />
          <input type="button" value="%" onClick={percentOp} />
          <input type="button" value="/" onClick={handleClick} />
        </div>

        {buttonValue.map((row) => (
          <ButtonValues value={row} handleClick={handleClick} />
        ))}

        <div>
          <input type="button" value="." onClick={handleClick} />
          <input type="button" value="0" onClick={handleClick} />
          <input type="button" value="=" className="equal" onClick={calculate} />
        </div>
      </div>
    </div>
  );
}

// if we use setResult("") instead of setResult(value) then it clears the result first
// the next button press appends to the empty string instead of immediately
// showing the new number
/*
    if (isCal === true) {
    setResult(value);
    } 
    setResult((prev) => prev + value);
    }
      Since react does not batch state updates synchronously, the setResult gets overwritten by the second call
      if you don't mention else

*/