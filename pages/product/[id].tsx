import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Link from 'next/link';

type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      // Simulate API fetch with a delay
      setTimeout(() => {
        setProduct({
          id: Number(id),
          name: `Product ${id}`,
          price: 99.99 + Number(id) * 50,
          description: `This is a detailed description for product ${id}. It contains information about features, specifications, and other details a customer might want to know.`,
          image: `/product${id}.jpg`
        });
        setLoading(false);
      }, 1000);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto p-4">Product not found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <Link href="/products" className="text-blue-600 mb-4 inline-block">
        ← Back to Products
      </Link>
      
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="w-full h-72 bg-gray-200"></div>
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-2xl text-gray-700 my-2">${product.price}</p>
          <p className="my-4">{product.description}</p>
          
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
