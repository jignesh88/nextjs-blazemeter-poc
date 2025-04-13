export default function Dashboard() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard!</p>
      
      <div className="mt-8 p-4 bg-white shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Account Summary</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-md">
            <div className="text-blue-500 font-bold text-xl">5</div>
            <div className="text-gray-600">Recent Orders</div>
          </div>
          <div className="p-4 bg-green-50 rounded-md">
            <div className="text-green-500 font-bold text-xl">$349.99</div>
            <div className="text-gray-600">Total Spent</div>
          </div>
          <div className="p-4 bg-purple-50 rounded-md">
            <div className="text-purple-500 font-bold text-xl">12</div>
            <div className="text-gray-600">Saved Items</div>
          </div>
        </div>
      </div>
    </div>
  );
}
