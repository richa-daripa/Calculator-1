import React, { useState } from 'react';
import ButtonValues from './Component/ButtonValues.jsx';
import buttonValue from './data.js';
import { evaluate } from 'mathjs';
import './App.css';


export default function App() {
  const [result, setResult] = useState('');
  const [isCal, setisCal] = useState(false);

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

    if ((result.toString().length === 0 || isCal === true) && op.includes(value)) {
      return;
    }

    if (op.includes(value) && op.includes(result.toString().slice(-1))) {
      return;
    }

    if (isCal) {
      setResult(value);
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
          <input type="button" value="DEL" onClick={handleDel} />
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
