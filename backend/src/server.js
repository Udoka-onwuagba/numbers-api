import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import { calculateProperties } from './numberUtils.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'], 
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Update the endpoint to use query parameters
app.get('/api/classify-number', async (req, res) => {
  try {
    const num = req.query.number;

    // Validate the 'number' query parameter
    const parsedNumber = parseFloat(num);

    // If the value is not a number, return a 400 error
    if (isNaN(parsedNumber)) {
      return res.status(400).json({
        number: num,
        error: true
      });
    }

    // Calculate mathematical properties
    const properties = calculateProperties(parsedNumber);

    // Fetch fun fact from Numbers API
    try {
      const response = await fetch(`http://numbersapi.com/${parsedNumber}/math`);
      if (!response.ok) throw new Error('Numbers API request failed');
      const funFact = await response.text();

      return res.json({
        number: parsedNumber,
        is_prime: properties.isPrime,
        is_perfect: properties.isPerfect,
        properties: [
          ...(properties.isArmstrong ? ['armstrong'] : []),
          ...(properties.isEven ? ['even'] : ['odd']),
        ],
        digit_sum: calculateDigitSum(parsedNumber),
        fun_fact: funFact
      });
    } catch (apiError) {
      console.error('Numbers API Error:', apiError);
      // Fallback to generated fact if API fails
      const funFact = generateFallbackFact(parsedNumber, properties);
      return res.json({
        number: parsedNumber,
        is_prime: properties.isPrime,
        is_perfect: properties.isPerfect,
        properties: [
          ...(properties.isArmstrong ? ['armstrong'] : []),
          ...(properties.isEven ? ['even'] : ['odd']),
        ],
        digit_sum: calculateDigitSum(parsedNumber),
        fun_fact: funFact
      });
    }
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({
      error: true,
      message: 'Failed to process number properties. Please try again.'
    });
  }
});

// Helper to calculate the sum of digits for the number (works for floats as well)
function calculateDigitSum(num) {
  const numStr = Math.abs(num).toString(); // Ensure absolute value for negative numbers
  return numStr.split('').reduce((sum, digit) => {
    return sum + (parseInt(digit) || 0); // Handle non-digit characters
  }, 0);
}

function generateFallbackFact(num, properties) {
  const facts = [
    properties.isPrime ? 
      `${num} is a prime number, which means it has exactly two factors: 1 and itself.` : 
      `${num} is not a prime number.`,
    properties.isPerfect ? 
      `${num} is a perfect number! The sum of its proper divisors equals itself.` : null,
    properties.isArmstrong ? 
      `${num} is an Armstrong number! The sum of its digits raised to the power of the number of digits equals itself.` : null,
    `${num} is an ${properties.isEven ? 'even' : 'odd'} number.`
  ].filter(Boolean);

  return facts[Math.floor(Math.random() * facts.length)] || 
    `${num} is a fascinating number with unique properties!`;
};

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
