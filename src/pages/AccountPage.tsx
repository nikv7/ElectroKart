
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MobileLayout } from '../components/MobileLayout';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const AccountPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been logged out successfully."
    });
    
    // In a real app, you would clear authentication tokens here
    navigate('/login');
  };
  
  return (
    <MobileLayout gradient title="My Account">
      <div className="bg-zinc-100 min-h-screen pt-6 pb-20">
        {/* Profile Card */}
        <div className="w-80 mx-auto bg-white rounded-2xl border border-gray-200 shadow-sm flex items-center p-4 mb-8">
          <div className="w-16 h-16 bg-neutral-300 rounded-full mr-4" />
          <div>
            <h3 className="text-xl font-light font-lexend text-black">Name</h3>
            <p className="text-sm font-light font-lexend text-gray-400">email@email.com</p>
          </div>
        </div>
        
        {/* Account Menu */}
        <div className="w-80 mx-auto bg-white rounded-2xl overflow-hidden shadow-sm">
          {/* Personal Information */}
          <Link to="/personal-information" className="px-6 py-4 border-b border-gray-200 flex items-center">
            <div className="w-6 h-6 mr-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
            <span className="font-lexend text-sm">Personal Information</span>
          </Link>
          
          {/* Orders */}
          <Link to="/orders" className="px-6 py-4 border-b border-gray-200 flex items-center">
            <div className="w-6 h-6 mr-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <span className="font-lexend text-sm">Orders</span>
          </Link>
          
          {/* Addresses */}
          <Link to="/addresses" className="px-6 py-4 border-b border-gray-200 flex items-center">
            <div className="w-6 h-6 mr-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <span className="font-lexend text-sm">Addresses</span>
          </Link>
          
          {/* Payment Methods */}
          <div className="px-6 py-4 flex items-center">
            <div className="w-6 h-6 mr-4 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
            </div>
            <span className="font-lexend text-sm">Payment Methods</span>
          </div>
        </div>
        
        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="w-full mt-16 text-center text-red-500 font-lexend text-sm"
        >
          LOG OUT
        </button>
      </div>
    </MobileLayout>
  );
};

export default AccountPage;
