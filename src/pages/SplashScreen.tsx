
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashScreen = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 4000); // Allow the full animation to play before navigating
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="w-full h-full overflow-hidden bg-[#180C21] fixed inset-0 flex flex-col items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Circle animations */}
        <div className="absolute w-[500px] h-[500px] rounded-full bg-violet-600/10 -top-80 -left-60 
                      animate-pulse" style={{animationDuration: '6s'}}></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-pink-500/10 bottom-20 -right-20 
                      animate-pulse" style={{animationDuration: '4s'}}></div>
        
        {/* Horizontal lines that animate from left to right */}
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent top-1/4 left-0 
                      opacity-0 animate-expand" 
             style={{animationDelay: '0.5s', animationDuration: '3s', animationFillMode: 'forwards'}}></div>
        <div className="absolute h-px w-full bg-gradient-to-r from-transparent via-pink-500/50 to-transparent bottom-1/3 left-0 
                      opacity-0 animate-expand" 
             style={{animationDelay: '1s', animationDuration: '3s', animationFillMode: 'forwards'}}></div>
             
        {/* Animated circuit-like paths */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,100 Q150,50 300,100 T600,100" 
                stroke="url(#grad1)" strokeWidth="1" fill="none" 
                strokeDasharray="5,5" strokeDashoffset="0"
                className="animate-dash" />
          <path d="M0,200 Q150,250 300,200 T600,200" 
                stroke="url(#grad1)" strokeWidth="1" fill="none" 
                strokeDasharray="5,5" strokeDashoffset="0"
                className="animate-dash-reverse" />
          
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
              <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
              <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Particles floating effect */}
        <div className="particles-container absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 rounded-full bg-white/70"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0,
                animation: `float ${3 + Math.random() * 3}s ease-in-out ${Math.random() * 2}s infinite, fade-in 1s ease-out forwards`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main logo with animations */}
      <div className="z-10 relative">
        {/* Logo with pulse effect around it */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-violet-500/30 animate-ripple"></div>
          <div className="absolute inset-0 rounded-full bg-violet-500/20 animate-ripple" 
               style={{animationDelay: '0.5s'}}></div>
          
          {/* Logo image */}
          <div className="relative scale-0 animate-scale-in"
               style={{animationDuration: '0.8s', animationDelay: '0.5s', animationFillMode: 'forwards'}}>
            <img 
              src="/lovable-uploads/c37db0fa-376f-469a-be31-92c5237d91fc.png" 
              alt="ElectroKart Logo" 
              className="w-64 h-auto"
              onError={(e) => {
                e.currentTarget.src = "https://placehold.co/300x100/180C21/FFFFFF?text=ElectroKart";
              }}
            />
          </div>
        </div>
        
        {/* Animated line under logo */}
        <div className="mt-4 h-0.5 bg-gradient-to-r from-violet-600 via-pink-500 to-orange-400 rounded-full w-0 animate-expand"
             style={{
               animationDelay: '1.3s',
               animationDuration: '1s',
               animationFillMode: 'forwards',
               maxWidth: '240px'
             }}></div>
        
        {/* Tagline with typewriter effect */}
        <p className="mt-4 text-white text-center font-lexend overflow-hidden whitespace-nowrap w-0 text-sm animate-typewriter"
           style={{
             animationDelay: '2.3s',
             animationDuration: '1s',
             animationFillMode: 'forwards',
             maxWidth: '280px'
           }}>
          Your Electronics Destination
        </p>
        
        {/* Electric zap line across screen */}
        <div className="mt-12 opacity-0 animate-fade-in"
             style={{animationDelay: '3s', animationDuration: '0.5s', animationFillMode: 'forwards'}}>
          <svg width="200" height="20" viewBox="0 0 200 20" className="mx-auto">
            <polyline points="0,10 40,10 50,5 60,15 70,5 80,15 90,5 100,15 110,5 120,15 130,5 140,15 150,5 160,15 170,5 180,15 190,10 200,10"
                    fill="none" stroke="url(#zapGradient)" strokeWidth="2"
                    strokeDasharray="200" strokeDashoffset="200"
                    className="animate-zap" />
            <defs>
              <linearGradient id="zapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="50%" stopColor="#EC4899" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
