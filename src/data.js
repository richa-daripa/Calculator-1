const buttonValue = [
  ["AC","DE","%","/"],
  ["7","8","9","*"],
  ["4","5","6","-"],
  ["1","2","3","+"],
  [".","0","="]
];

export default buttonValue;

export const evaluate = (exp) => {
  let num = [];
  let op = [];
  let curr = '';
  const operators = ['+', '-', '*', '/'];

  let charArray = exp.split('');

  for (let i = 0; i < charArray.length; i++) {
    let char = charArray[i];

    if (operators.includes(char)) {
      num.push(Number(curr));
      op.push(char);
      curr = '';
    } else {
      curr += char;
    }
  }
  num.push(Number(curr));

  for (let i = 0; i < op.length; i++) {
    if (op[i] === '*' || op[i] === '/') {
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
};



