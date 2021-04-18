const colors = require('colors');

const start = +process.argv[2] >= 2 ? +process.argv[2] : false;
const end = +process.argv[3] > start ? +process.argv[3] : false;

if (!Number.isInteger(start)) {
    throw new Error('Error! Начальный диапазон должен быть положительным числом больше или равен 2!');
}

if (!Number.isInteger(end)) {
    throw new Error('Error! Конечный диапазон должен быть положительным числом и больше начального диапазона!');
}

let numbers = [];
let color = 'green';

nextPrime:
for (let i = start; i <= end; i++) {

  for (let j = 2; j < i; j++) {
    if (0 == i % j) continue nextPrime;
  }
  numbers.push(i);
}

if (0 === numbers.length) {
    console.log(colors.red('В заданом диапазоне простых чисел нет.'));
} else {
    for (let i = 0; i < numbers.length; i++) {
        const element = numbers[i];
        
        switch (color) {
            case 'green':
                console.log(colors.green(element));
                color = 'yellow';
                break;
    
            case 'yellow':
                console.log(colors.yellow(element));
                color = 'red';
                break;
    
            case 'red':
                console.log(colors.red(element));
                color = 'green';
                break;
    
            default:
                console.log('Error color');
                break;
        }
    }
}
