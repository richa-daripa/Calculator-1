import React, { useState, useEffect, useCallback ,useMemo} from 'react';
import ButtonValues from './Component/ButtonValues';
import buttonValue from './data.js';
import './App.css';
import { evaluate } from './data.js';

export default function App() {
  const [result, setResult] = useState('');
  const [isCal, setisCal] = useState(false);

  const calculate = useCallback(() => {
    try {
      setResult(evaluate(result));
      setisCal(true);
    } catch (error) {
      setResult('Error');
      setisCal(true);
    }
  },[result]);

  const op = useMemo(()=>['+', '-', '*', '/', '.'],[]);
  const st = ['AC', 'DE', '%'];

  const handleClick = (e) => {
    const value = e.target.value;

    if (op.includes(value)) {
      if(result.toString().length === 0){
        setResult((prev)=>prev+'0' + value);
      return;
      }
      if(op.includes(result.toString().slice(-1))){
        setResult(result.toString().slice(0, -1) + value);
      return;
      }
    }

    if (isCal) {
      op.includes(value)?setResult((prev) => prev + value):setResult(value);
      setisCal(false);
    } else {
      setResult((prev) => prev + value);
      /*
      setResult((prev)=>{
        return prev.length<10?prev + value:prev;
      })*/
    }

    if (st.includes(value)) {
      switch (value) {
        case 'AC':
          setResult('');
          break;
        case 'DE':
          setResult(result.toString().slice(0, -1));
          break;
        case '%':
          setResult(result / 100);
          setisCal(true);
          break;
      }
    }
  };

  const handleKeydown = useCallback((event) => {
    const key = event.key;

    if(key==='Shift') return;

    if (op.includes(key)) {
      if(result.toString().length === 0){
        setResult((prev)=>prev+'0' + key);
      return;
      }
      if(op.includes(result.toString().slice(-1))){
        setResult(result.toString().slice(0, -1) + key);
      return;
      }
    }

    if (isCal) {
      op.includes(key)?setResult((prev) => prev + key):setResult(key);
      setisCal(false);
    } else {
      setResult((prev) => prev + key);
    }
    
    if (key === 'Enter') {
      calculate();
    } else if (key === 'Backspace') {
      setResult(result.toString().slice(0, -1));
    } else if (key === 'Delete') {
      setResult('');
    } else if (key === '%' ||(event.shiftKey && key === '5')) {
      setResult(result/100);
      setisCal(true);
    } 
  },[result,isCal,setResult,op,calculate,setisCal]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [handleKeydown]);

  return (
    <div className="App">
      <div className="container">
        <div className="display">
          <input type="text" value={result} placeholder="0" readOnly />
        </div>
        {buttonValue.map((row,index) => (
          <ButtonValues
          key={index}
            value={row}
            handleClick={handleClick}
            calculate={calculate}
          />
        ))}
      </div>
    </div>
  );
}
