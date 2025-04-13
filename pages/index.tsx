import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`min-h-screen flex flex-col items-center justify-center p-24 ${inter.className}`}>
      <h1 className="text-4xl font-bold mb-8">Next.js Blazemeter POC</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
        <Link href="/login" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Login Page &rarr;</h2>
          <p>Test the login page performance.</p>
        </Link>
        <Link href="/products" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Products &rarr;</h2>
          <p>Browse our product catalog.</p>
        </Link>
        <Link href="/checkout" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Checkout &rarr;</h2>
          <p>Test the checkout process.</p>
        </Link>
        <Link href="/performance-dashboard" className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-bold mb-2">Performance Dashboard &rarr;</h2>
          <p>View performance metrics.</p>
        </Link>
      </div>
    </main>
  );
}
