import React from 'react';
import '../App.css';

const ButtonValues = ({ value, handleClick }) => {
  return (
    <div>
      {value.map((i, index) => (
        <input type="button" value={i} onClick={handleClick} />
      ))}
    </div>
  );
};
export default ButtonValues;