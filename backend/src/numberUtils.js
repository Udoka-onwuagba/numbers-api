export function calculateProperties(num) {
  return {
    isPrime: isPrime(num),
    isPerfect: isPerfect(num),
    isArmstrong: isArmstrong(num),
    isEven: num % 2 === 0,
    isOdd: num % 2 !== 0
  };
}

function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
}

function isPerfect(num) {
  if (num <= 1) return false;
  
  let sum = 1;
  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      sum += i;
      if (i * i !== num) {
        sum += num / i;
      }
    }
  }
  
  return sum === num;
}

function isArmstrong(num) {
  const digits = num.toString().split('');
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => 
    acc + Math.pow(parseInt(digit), power), 0
  );
  
  return sum === num;
}