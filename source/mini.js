const isFloat = (num) => Number(num) === num && num % 1 !== 0;

const checkNum = (num) => {
  if (isFloat(num)) {
    if (num.toString().split( '.' ).pop().length > 3) {
          num = num.toFixed(6);
    }
  }
  return num;
};

const getQuadRoot = (num) => {
  if (num < 0) {
    return NaN;
  } else if (num === 0 || num === 1) {
    return num;
  }
  let val; let root = num / 2;
  do {
          val = root;
          const x = num / val;
          root = (val + x) / 2;
  } while ((val - root) !== 0);
  return root;
};


const solveQuadEquation = (a = 0, b = 0, c = 0) => {
  if (a == 0 || a == undefined) {
    return 'Error! \'a\' cannot be equal to zero or empty!';
  }
  let answer; let dsc = ''; let cmt = '';
  const discriminant = b * b - 4 * a * c;

  dsc = 'Discriminant is: ' + '\n' + discriminant + '\n';
  if (discriminant === 0) {
    cmt = 'Discriminant is 0, the solution to the equation is: ';
    answer = -b / (2*a);
  } else if (discriminant < 0) {
    cmt = 'Discriminant is negative, so there are 2 imaginary solutions to the equation:';
    const x0 = getQuadRoot(-discriminant);
    const x1 = checkNum(-b / (2 * a));
    const x2 = checkNum(x0 / (2*a));
    answer = '\n' + x1 + ' + i * ' + x2 + '\n' + x1 + ' - i * ' + x2;
  } else if (discriminant > 0) {
    const x0 = getQuadRoot(discriminant);
    const x1 = checkNum((-b + x0) / ( 2 * a));
    const x2 = checkNum((-b - x0) / ( 2 * a));
    cmt = 'Discriminant is positive, 2 solutions to the equation are:';
    answer = '\n' + x1 + '\n' + x2;
  }
  return dsc + cmt + answer;
};

const prog = () => {
  const a = document.getElementById('a').value;
  const b = document.getElementById('b').value;
  const c = document.getElementById('c').value;

  const result = solveQuadEquation(a, b, c);
  document.getElementById('result').textContent = result;
  document.getElementById('answer').style.display = 'block';
};