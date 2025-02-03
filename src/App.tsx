import React, { useState } from 'react';
import { Calculator, AlertCircle } from 'lucide-react';
import { getNumberProperties } from './utils/numberUtils';

interface NumberProperties {
  number: number;
  properties: {
    isPrime: boolean;
    isPerfect: boolean;
    isArmstrong: boolean;
    isEven: boolean;
    isOdd: boolean;
  };
  funFact: string;
}

function App() {
  const [number, setNumber] = useState<string>('');
  const [result, setResult] = useState<NumberProperties | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const num = parseInt(number);
    if (isNaN(num) || num < 0 || num > 999999) {
      setError('Please enter a valid number between 0 and 999,999');
      setLoading(false);
      return;
    }

    try {
      const properties = await getNumberProperties(num);
      setResult(properties);
    } catch (err) {
      setError('Failed to fetch number properties. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <Calculator className="mx-auto h-12 w-12 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-bold text-gray-900">Number Classification API</h1>
          <p className="mt-2 text-lg text-gray-600">Discover the mathematical properties of any number</p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Enter a number
              </label>
              <div className="mt-1">
                <input
                  type="number"
                  id="number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  placeholder="Enter a number (0-999,999)"
                  min="0"
                  max="999999"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              {loading ? 'Analyzing...' : 'Analyze Number'}
            </button>
          </form>

          {error && (
            <div className="mt-4 p-4 bg-red-50 rounded-md flex items-start">
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
              <p className="ml-3 text-sm text-red-700">{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-6 space-y-4">
              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-900">Number Properties</h2>
                <dl className="mt-3 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div className="border-l-4 border-indigo-400 pl-4">
                    <dt className="text-sm font-medium text-gray-500">Prime Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.properties.isPrime ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  <div className="border-l-4 border-indigo-400 pl-4">
                    <dt className="text-sm font-medium text-gray-500">Perfect Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.properties.isPerfect ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  <div className="border-l-4 border-indigo-400 pl-4">
                    <dt className="text-sm font-medium text-gray-500">Armstrong Number</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.properties.isArmstrong ? 'Yes' : 'No'}
                    </dd>
                  </div>
                  <div className="border-l-4 border-indigo-400 pl-4">
                    <dt className="text-sm font-medium text-gray-500">Even/Odd</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {result.properties.isEven ? 'Even' : 'Odd'}
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="border-t pt-4">
                <h2 className="text-lg font-semibold text-gray-900">Fun Fact</h2>
                <p className="mt-2 text-sm text-gray-600">{result.funFact}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;