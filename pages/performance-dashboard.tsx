import { useState, useEffect } from 'react';
import Link from 'next/link';

type TestResult = {
  testName: string;
  date: string;
  avgResponseTime: number;
  p90ResponseTime: number;
  errorRate: number;
  throughput: number;
  status: 'pass' | 'fail';
};

export default function PerformanceDashboard() {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, fetch from an API
    setTimeout(() => {
      setResults([
        {
          testName: 'Login Flow',
          date: '2025-04-12T15:30:00Z',
          avgResponseTime: 850,
          p90ResponseTime: 1250,
          errorRate: 0.5,
          throughput: 25.6,
          status: 'pass',
        },
        {
          testName: 'Product Browsing',
          date: '2025-04-12T15:35:00Z',
          avgResponseTime: 1200,
          p90ResponseTime: 1800,
          errorRate: 0.8,
          throughput: 42.3,
          status: 'pass',
        },
        {
          testName: 'Checkout Process',
          date: '2025-04-12T15:40:00Z',
          avgResponseTime: 1500,
          p90ResponseTime: 2200,
          errorRate: 1.2,
          throughput: 15.7,
          status: 'fail',
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Performance Testing Dashboard</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Test Name</th>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Avg Response Time (ms)</th>
                <th className="px-4 py-2 border">P90 Response Time (ms)</th>
                <th className="px-4 py-2 border">Error Rate (%)</th>
                <th className="px-4 py-2 border">Throughput (req/s)</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td className="px-4 py-2 border">{result.testName}</td>
                  <td className="px-4 py-2 border">{new Date(result.date).toLocaleString()}</td>
                  <td className="px-4 py-2 border">{result.avgResponseTime}</td>
                  <td className="px-4 py-2 border">{result.p90ResponseTime}</td>
                  <td className="px-4 py-2 border">{result.errorRate}</td>
                  <td className="px-4 py-2 border">{result.throughput}</td>
                  <td className="px-4 py-2 border">
                    <span className={`inline-block px-2 py-1 rounded-full text-white ${result.status === 'pass' ? 'bg-green-500' : 'bg-red-500'}`}>
                      {result.status === 'pass' ? 'PASS' : 'FAIL'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Run Performance Tests</h2>
        <div className="flex flex-wrap gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Run Full Test Suite
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Run Login Test
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Run Product Browse Test
          </button>
          <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
            Run Checkout Test
          </button>
        </div>
      </div>
    </div>
  );
}
