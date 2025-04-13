import { useState, useEffect } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setProducts([
        { id: 1, name: 'Product 1', price: 99.99, image: '/product1.jpg' },
        { id: 2, name: 'Product 2', price: 149.99, image: '/product2.jpg' },
        { id: 3, name: 'Product 3', price: 199.99, image: '/product3.jpg' },
        { id: 4, name: 'Product 4', price: 249.99, image: '/product4.jpg' },
        { id: 5, name: 'Product 5', price: 299.99, image: '/product5.jpg' },
        { id: 6, name: 'Product 6', price: 349.99, image: '/product6.jpg' },
      ]);
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="border rounded-lg p-4 shadow-sm">
              <div className="w-full h-48 bg-gray-200 mb-4"></div>
              <h2 className="font-bold">{product.name}</h2>
              <p className="text-gray-700">${product.price}</p>
              <Link href={`/product/${product.id}`} className="mt-2 inline-block text-blue-600">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
