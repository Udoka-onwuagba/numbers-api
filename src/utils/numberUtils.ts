export const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  
  if (num % 2 === 0 || num % 3 === 0) return false;
  
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  
  return true;
};

export const isPerfect = (num: number): boolean => {
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
};

export const isArmstrong = (num: number): boolean => {
  const digits = num.toString().split('');
  const power = digits.length;
  const sum = digits.reduce((acc, digit) => 
    acc + Math.pow(parseInt(digit), power), 0
  );
  
  return sum === num;
};

const fetchNumberFact = (num: number): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Create a unique callback name
    const callbackName = `numbersApi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Create global callback function
    (window as any)[callbackName] = (data: string) => {
      // Clean up
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      resolve(data);
    };

    // Create script element
    const script = document.createElement('script');
    // Use HTTPS for the API request
    script.src = `https://cors-anywhere.herokuapp.com/http://numbersapi.com/${num}/math?callback=${callbackName}&notfound=floor`;
    script.onerror = () => {
      // Clean up
      document.body.removeChild(script);
      delete (window as any)[callbackName];
      reject(new Error('Failed to fetch number fact'));
    };

    // Add script to document
    document.body.appendChild(script);
  });
};

export const getNumberProperties = async (num: number) => {
  try {
    const properties = {
      isPrime: isPrime(num),
      isPerfect: isPerfect(num),
      isArmstrong: isArmstrong(num),
      isEven: num % 2 === 0,
      isOdd: num % 2 !== 0
    };

    // Try to fetch from Numbers API first
    let funFact = '';
    try {
      // Try direct fetch first
      const response = await fetch(`https://cors-anywhere.herokuapp.com/http://numbersapi.com/${num}/math`);
      if (!response.ok) {
        throw new Error('API request failed');
      }
      funFact = await response.text();
    } catch (error) {
      // If direct fetch fails, try JSONP as fallback
      try {
        funFact = await fetchNumberFact(num);
      } catch (jsonpError) {
        // If both methods fail, use fallback facts
        const facts = [
          properties.isPrime ? `${num} is a prime number, which means it has exactly two factors: 1 and itself.` : `${num} is not a prime number.`,
          properties.isPerfect ? `${num} is a perfect number! The sum of its proper divisors equals itself.` : null,
          properties.isArmstrong ? `${num} is an Armstrong number! The sum of its digits raised to the power of the number of digits equals itself.` : null,
          `${num} is an ${properties.isEven ? 'even' : 'odd'} number.`
        ].filter(Boolean);
        funFact = facts[Math.floor(Math.random() * facts.length)] || `${num} is a fascinating number with unique properties!`;
      }
    }

    // Ensure proper formatting
    funFact = funFact.charAt(0).toUpperCase() + funFact.slice(1);
    if (!funFact.endsWith('.')) {
      funFact += '.';
    }

    return {
      number: num,
      properties,
      funFact
    };
  } catch (error) {
    console.error('Error calculating number properties:', error);
    throw new Error('Failed to calculate number properties. Please try again.');
  }
};