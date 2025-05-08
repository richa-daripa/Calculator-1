import React, { useState } from 'react';
import './App.css';
import { evaluate } from 'mathjs';

function App() {

  const [result, setResult] = useState("");
  const [isCal, setisCal] = useState(false);

  const calculate = () => {
    try {
      setResult(evaluate(result));
      setisCal(true);
    } catch (error) {
      setResult("Error");
      setisCal(true);
    }
  }
  const handleClick = (e) => {
    const value = e.target.value;

    const op = ['+', '-', '*', '/', '.'];
    if (op.includes(value) && op.includes(result.slice(-1))) {
      return;
    }

    if (isCal) {
      setResult(value);
      setisCal(false);
    } else {
      setResult(prev => prev + value);
    }

  }

  return (
    <div className="App">
      <div className="container">
        <div className="display">
          <input type="text" value={result} placeholder="0" />
        </div>
        <div>
          <input type="button" value="AC" onClick={() => setResult("")} />
          <input type="button" value="DEL" onClick={() => setResult(result.toString().slice(0, -1))} />
          <input type="button" value="%" onClick={() => setResult(result / 100)} />
          <input type="button" value="/" onClick={handleClick} />
        </div>
        <div>
          <input type="button" value="7" onClick={handleClick} />
          <input type="button" value="8" onClick={handleClick} />
          <input type="button" value="9" onClick={handleClick} />
          <input type="button" value="*" onClick={handleClick} />
        </div>
        <div>
          <input type="button" value="4" onClick={handleClick} />
          <input type="button" value="5" onClick={handleClick} />
          <input type="button" value="6" onClick={handleClick} />
          <input type="button" value="-" onClick={handleClick} />
        </div>
        <div>
          <input type="button" value="1" onClick={handleClick} />
          <input type="button" value="2" onClick={handleClick} />
          <input type="button" value="3" onClick={handleClick} />
          <input type="button" value="+" onClick={handleClick} />
        </div>
        <div>
          <input type="button" value="." onClick={handleClick} />
          <input type="button" value="0" onClick={handleClick} />
          <input type="button" value="=" className='equal' onClick={calculate} />
        </div>
      </div>
    </div>
  );
}

export default App;

