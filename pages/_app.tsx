import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Link from 'next/link';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <header className="bg-white shadow-sm">
        <div className="container mx-auto p-4">
          <nav className="flex justify-between items-center">
            <Link href="/" className="font-bold text-xl">NextShop</Link>
            <div className="space-x-4">
              <Link href="/products" className="text-gray-700 hover:text-blue-600">Products</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
              <Link href="/checkout" className="text-gray-700 hover:text-blue-600">Checkout</Link>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <Component {...pageProps} />
      </main>
    </>
  );
}
