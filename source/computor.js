const colorSet = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[97m',
  reset: '\x1b[0m',
};

const printMonochrome = (answer, type) => {
  if (type !== 'err' && type !== 'warn') {
    console.log(answer);
  } else if (type === 'err') {
    console.error(answer);
  } else {
    console.warn(answer);
  }
};

const solveQuadEquation = (a, b, c) => {
  let answer; let cmt;

  const discriminant = b * b - 4 * a * c;

  if (discriminant !== 0 && flag === 3) {
    cmt = 'Discriminant is: ' + discriminant;
    formOutput(cmt, flag, 'comment');
  }
  if (discriminant === 0) {
    cmt = 'Discriminant is 0, the solution to the equation is: ';
    formOutput(cmt, flag, 'comment');
    answer = -b / (2*a);
    formOutput(answer, flag, 'x');
  } else if (discriminant < 0) {
    cmt = 'Discriminant is negative, so there are 2 imaginary' +
                'solutions to the equation:';
    formOutput(cmt, flag, 'comment');
    const x0 = getQuadRoot(-discriminant);
    const x1 = checkNum(-b / (2 * a));
    const x2 = checkNum(x0 / (2*a));
    answer = x1 + ' + i * ' + x2 + '\n' + x1 + ' - i * ' + x2;
    formOutput(answer, flag, 'x');
  } else if (discriminant > 0) {
    const x0 = getQuadRoot(discriminant);
    const x1 = checkNum((-b + x0) / ( 2 * a));
    const x2 = checkNum((-b - x0) / ( 2 * a));
    cmt = 'Discriminant is positive, 2 solutions to the equation are:';
    formOutput(cmt, flag, 'comment');
    answer = x1 + '\n' + x2;
    formOutput(answer, flag, 'x');
  }
};

const formOutput = (answer, flag = 0, type = '0') => {
  answer = '\b' + answer;

  if (flag === 0 || flag === 2 || flag === 3) {
    printMonochrome(answer, type);
  } else {
    let colorScheme; let color;

    if (flag === 1.1) {
      colorScheme = 'white';
    } else {
      colorScheme = 'black';
    }

    if (type === 'comment') {
      color = colorScheme === 'black' ? colorSet.cyan : colorSet.magenta;
    } else if (type === 'x') {
      color = colorScheme === 'black' ? colorSet.yellow : colorSet.green;
    } else if (type === 'err') {
      color = colorSet.red;
    } else {
      color = colorScheme === 'black' ? colorSet.white : colorSet.blue;
    }

    if (type !== 'err' || type !== 'warn') {
      console.log(color, answer, colorSet.reset);
    } else if (type === 'err') {
      console.error(color, answer, colorSet.reset);
    } else {
      console.warn(color, answer, colorSet.reset);
    }
  }
};

const degreeFinder = (d, lPart) => {
  let y = lPart.find((x) => x[1] === d);
  y = y ? y[0] : 0;
  return y;
};

const solveEquation = (biggestDegree, lPart) => {
  if (biggestDegree > 2) {
    checkAndHandleInput(biggestDegree);
  } else {
    let a; let b; let c;

    a = degreeFinder(2, lPart);
    b = degreeFinder(1, lPart);
    c = degreeFinder(0, lPart);

    if (flag === 3) {
      formOutput('a = ' + a + '\nb = ' + b + '\nc = ' + c);
    }
    if (biggestDegree === 2 && a === 0) {
          const strCheck = str.replace(/X\^2/g, '').replace(/X\^0/g, '');
          const xB = strCheck.indexOf('X');
          if (xB !== -1) {
        biggestDegree = 1;
          } else {
        biggestDegree = 0;
          }
          formOutput('polynomial degree: ' + biggestDegree, flag);
    } else {
          formOutput('polynomial degree: ' + biggestDegree, flag);
    }

    if (biggestDegree === 2 && a !== 0) {
      solveQuadEquation(a, b, c);
    } else if (biggestDegree === 1 || (biggestDegree === 2 && a === 0)) {
      if (b !== 0) {
        formOutput('The solution is:\n' + checkNum(-c / b), flag, 'x');
      } else if (a === 0) {
        formOutput('There are no solutions to this equation', flag, 'err');
      }
    } else {
      if (lPart.length === 0) {
        formOutput('All real numbers are solutions to this equation', flag, 'x');
      } else {
        formOutput('There are no solutions to this equation', flag, 'err');
      }
    }
  }
};

const isDigit = (c) => c >= '0' && c <= '9';

const turnToStr = (equat) => {
  let txt; const x = ' * X^';

  if (equat.length !== 0) {
    txt = equat[0][0] + x + equat[0][1];
    equat.map((elt, position) => {
      if (position !== 0) {
        txt = txt + (elt[0] > 0 ? ' + ' : ' - ') + (elt[0] > 0 ? elt[0] : -elt[0]);
        txt = txt + x + elt[1];
      } else {
        return '';
      }
    });
  } else {
    txt = '0 * X^0';
  }
  return txt;
};

const checkAndAdd = (last, now) => {
  if (now instanceof Array) {
    last.push(now);
  }
  return last;
};

const combineArrays = (last, now) => {
  if (last[now[1]] != null) {
    last[now[1]] = last[now[1]] + now[0];
  } else {
    last[now[1]] = now[0];
  }
  return last;
};

const turnToShort = (equat) => {
  let result;
  const arrA = new Array();
  const arrB = new Array();
  let newEquat = equat.reduce(combineArrays, arrA);

  newEquat = newEquat.map((value, idx) => [value, idx]);
  result = newEquat.reduce(checkAndAdd, arrB);

  return result;
};

const showMsg = (mode = 'use', deg) => {
  if (mode === 'use') {
    const useTxt = 'Usage:\n./computor [--flag] ["polynomial = polynomial"]' +
        '\n___________________________________________________________________';
    const flagList = 'Flags:\n--usage, --help, --redocs,\n' +
        '--colorb, --colorw, --wiki,\n--web, --nat, --det\n' +
        '___________________________________________________________________';
    const useCmt = 'Only one flag at a time & ' +
        'a well formatted input are allowed!\n' +
        'For a detailed manual about flags:\n ./computor --help';
    formOutput(useTxt, flag, 'warn');
    formOutput(flagList, flag, 'warn');
    formOutput(useCmt, flag, 'warn');
  } else if (mode === 'err') {
    const errorTxt = 'Polynomial degree is ' + deg +
        '. It\'s not a quadratic or a linear equation so I cannot solve it!';
    formOutput(errorTxt, flag, 'err');
  }
  process.exit(0);
};

const analyzePart = (equat) => {
  let len; let result;

  const glue = (a, b) => a.concat(b);
  const getNotEmptyElem = (value) => value !== '';
  const verifyIdx = (value, idx) => (idx > 0 ? '-' : '') + value;
  const doTask = (task, args) => (value) => value[task].apply(value, args);

  const checkAndHandleValue = (val) => {
    len = val.length;

    if (len === 2) {
      val[0] = val[0] !== '-' ? val[0] : '-1';
      val[0] = val[0] !== '' ? parseFloat(val[0]) : 1;
      val[1] = val[1] !== '' ? parseInt(val[1].substring(1)) : 1;
    } else if (len === 1) {
      val = [parseFloat(val), 0];
    }
    return val;
  };

  equat = equat.split('-').map(verifyIdx).filter(getNotEmptyElem).map(doTask('split', ['+']));
  result = equat.reduce(glue, []).map(doTask('split', ['X'])).map(checkAndHandleValue);

  return result;
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

const isFloat = (num) => {
  if (Number(num) === num && num % 1 !== 0) {
    return true;
  } else {
    return false;
  }
};

const checkNum = (num) => {
  if (isFloat(num)) {
    if (num.toString().split( '.' ).pop().length > 3) {
      num = num.toFixed(6);
    }
  }
  return num;
};

const checkLen = (mainParam) => mainParam.length === 2 ? mainParam : false;

const mainParamRework = (i) => {
  let equation; let mainParam;

  mainParam = process.argv.slice(i).join('').replace(/x/g, 'X');
  equation = mainParam.split(' ').join('').split('=');

  return (checkLen(equation));
};

const checkAndHandleInput = (modePow = 0) => {
  let mainParam;
  let i;

  if (modePow) {
    showMsg('err', modePow);
    process.exit(0);
  } else if (process.argv.length > 4 || process.argv.length < 3) {
    mainParam = false;
  } else if (flag === 0) {
    i = 2;
    mainParam = mainParamRework(i);
  } else {
    i = 3;
    mainParam = mainParamRework(i);
  }
  return mainParam;
};

const transformRightPart = (rPart, lPart) => {
  let idx;

  const addParts = (value) => {
    if (value[0] !== 0) {
      idx = lPart.findIndex((element) => element[1] === value[1]);
      if (idx >= 0) {
        lPart[idx][0] = lPart[idx][0] - value[0];
      } else {
        lPart.push([-value[0], value[1]]);
      }
    } else {
      return '';
    }
  };

  rPart.map(addParts);
};

let flag; let mainParam; let str; let idx; let deg; let bigDeg = -1; const indices = [];
const degreeSign = '^';

const handleFlags = () => {
  if (process.argv[2] === '--help' || process.argv[2] === '--wiki' ||
      process.argv[2] === '--usage') {
    const fs = require('fs');
    if (process.argv[2] === '--help') {
      const textHelp = fs.readFileSync('./computordocs/help.txt', 'utf8');
      formOutput(textHelp);
    } else if (process.argv[2] === '--wiki') {
      const textWiki = fs.readFileSync('./computordocs/quad.txt', 'utf8');
      formOutput(textWiki);
    } else {
      showMsg();
    }
    process.exit(0);
  }

  if (process.argv[2] === '--colorw' ) {
    flag = 1.1;
  } else if (process.argv[2] === '--colorb') {
    flag = 1.2;
  } else if (process.argv[2] === '--nat') {
    flag = 2;
  } else if (process.argv[2] === '--det') {
    flag = 3;
  } else {
    flag = 0;
  }
  return flag;
};

flag = handleFlags();

if (flag > 0) {
  str = process.argv[3];
} else {
  str = process.argv[2];
}

const getDegree = (str) => {
  idx = str.indexOf(degreeSign);

  if (idx !== -1) {
    while (idx !== -1) {
      indices.push(idx);
      idx = str.indexOf(degreeSign, idx + 1);
    }
    for (let i = 0; i < indices.length; i++) {
      let j = indices[i] + 1; let num = '';
      while (!isDigit(str[j])) {
        j++;
      }
      for (; isDigit(str[j]); j++) {
        num += str[j];
      }
      deg = parseInt(num);
      if (deg > bigDeg) {
        bigDeg = deg;
      }
    }
  } else if (idx === -1 && (str.indexOf('x') !== -1 || str.indexOf('X') !== -1)) {
    bigDeg = 1;
  } else {
    bigDeg = 0;
  }
  return (bigDeg);
};

mainParam = checkAndHandleInput();

if (mainParam) {
  let rPart; let lPart; let biggestDegree; let shortForm;

  lPart = turnToShort(analyzePart(mainParam[0]));
  rPart = turnToShort(analyzePart(mainParam[1]));

  transformRightPart(rPart, lPart);

  lPart = lPart.filter((x)=> x[0] !== 0);
  shortForm = turnToStr(lPart);
  if (flag === 3) {
    formOutput('Your entered: ' + process.argv[3].replace(/x/g, 'X'));
    formOutput('Regular output:\nReduced form: ' + shortForm + ' = 0', flag);
    formOutput('Natural output:', flag);
  }
  if (flag === 2 || flag === 3) {
    shortForm = shortForm.replace(' * X^0', '').replace('X^1', 'X');
    shortForm = shortForm.replace('1 * ', '');
  }
  formOutput('Reduced form: ' + shortForm + ' = 0', flag);
  biggestDegree = getDegree(str);
  solveEquation(biggestDegree, lPart, shortForm);
} else {
  showMsg();
}
