
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would send a password reset email
    toast({
      title: "Reset link sent",
      description: "If an account with that email exists, we've sent a password reset link",
    });
    
    setIsSubmitted(true);
  };

  return (
    <div className="w-full h-full bg-white overflow-hidden">
      <div className="flex flex-col items-center pt-16">
        <h1 className="text-4xl font-normal font-gugi text-black mt-16">ElectroKart</h1>
        
        {!isSubmitted ? (
          <>
            <div className="mt-16 inline-flex flex-col items-center">
              <h2 className="text-3xl font-bold text-zinc-800 text-center">Reset Password</h2>
              <p className="mt-4 text-center text-zinc-600 max-w-xs">
                Enter the email address associated with your account, and we'll send you a link to reset your password.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="mt-12 w-80">
              <div className="flex flex-col gap-px bg-white rounded-lg shadow">
                <div className="h-14 px-3.5 py-4 bg-white rounded-lg border border-gray-100 flex items-center">
                  <div className="w-4 h-4 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" stroke="#375dfb" strokeWidth="1.3">
                      <rect x="2" y="3.33" width="12" height="9.33" rx="1" />
                    </svg>
                  </div>
                  <Input 
                    type="email"
                    className="flex-1 text-sm font-medium outline-none border-none shadow-none"
                    placeholder="Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full h-12 mt-10 bg-gradient-to-b from-violet-600 to-violet-700 rounded-lg text-white text-sm font-medium"
              >
                Send Reset Link
              </Button>
              
              <button 
                type="button"
                onClick={() => navigate('/login')} 
                className="w-full mt-6 text-center text-xs font-medium text-neutral-950/70 underline"
              >
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <div className="mt-16 inline-flex flex-col items-center px-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-800 text-center">Check Your Email</h2>
            <p className="mt-4 text-center text-zinc-600">
              We've sent a password reset link to <strong>{email}</strong>. The link will expire in 30 minutes.
            </p>
            <Button 
              onClick={() => navigate('/login')} 
              className="mt-8 bg-gradient-to-b from-violet-600 to-violet-700"
            >
              Return to Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
