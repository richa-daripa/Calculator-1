import React from 'react';
import '../App.css';

const ButtonValues = ({ value, handleClick, calculate }) => {
  return (
    <div>
      {value.map((i) => (
        <input
          type="button"
          key={i}
          value={i}
          className={i === '=' ? 'equal' : ''}
          onClick={i !== '=' ? handleClick : calculate}
          readOnly
        />
      ))}
    </div>
  );
};
export default ButtonValues;