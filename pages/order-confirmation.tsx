import Link from 'next/link';

export default function OrderConfirmation() {
  const orderNumber = `ORD-${Math.floor(Math.random() * 1000000)}`;
  
  return (
    <div className="container mx-auto p-4 max-w-2xl text-center">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="w-16 h-16 bg-green-100 flex items-center justify-center rounded-full mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
        <p className="text-gray-600 mb-6">Thank you for your purchase. Your order has been received and is being processed.</p>
        
        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <p className="text-sm text-gray-600">Order Number</p>
          <p className="font-semibold">{orderNumber}</p>
        </div>
        
        <Link href="/" className="text-blue-600 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
