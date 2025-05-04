
import React, { useState, useEffect } from 'react';
import { MobileLayout } from '../components/MobileLayout';
import { Link } from 'react-router-dom';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  
  useEffect(() => {
    // Fetch orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <MobileLayout showBackButton title="My Orders" gradient>
      <div className="bg-zinc-100 min-h-screen pt-6 pb-24">
        <div className="px-6 space-y-4">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div 
                key={order.id} 
                className="bg-white rounded-lg overflow-hidden shadow-sm"
              >
                <div className="p-4 border-b border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-lexend text-lg">{order.id}</h3>
                      <p className="text-gray-500 text-sm">
                        {new Date(order.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(order.status)}`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="space-y-2 mb-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span className="font-lexend">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-montserrat">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between border-t border-gray-100 pt-2 mt-3">
                    <span className="font-lexend font-medium">Total</span>
                    <span className="font-montserrat font-medium">${order.total.toFixed(2)}</span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-3 flex justify-end border-t border-gray-100">
                  <Link 
                    to="#" 
                    className="text-violet-500 text-sm font-medium"
                  >
                    View Order Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 text-gray-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="text-gray-500 mb-4">You haven't placed any orders yet.</p>
              <Link to="/home" className="text-violet-500 font-medium">
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </div>
    </MobileLayout>
  );
};

export default Orders;
