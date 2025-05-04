
import React from 'react';
import { BottomNavigation } from './BottomNavigation';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNavigation?: boolean;
  showBackButton?: boolean;
  title?: string;
  gradient?: boolean;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  hideNavigation, 
  showBackButton, 
  title,
  gradient
}) => {
  return (
    <div className="mobile-container">
      {/* Header with status bar safe area */}
      <div className={`${gradient ? 'bg-violet-600/75' : 'bg-white'}`}>
        {/* Status Bar Safe Area */}
        <div className={`h-[env(safe-area-inset-top,20px)] ${gradient ? 'bg-violet-600/75' : 'bg-white'}`}></div>
        
        {/* Header Content */}
        {(showBackButton || title) && (
          <div className={`h-16 flex items-center px-5`}>
            {showBackButton && (
              <button 
                onClick={() => window.history.back()} 
                className="w-10 h-10 mr-4 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 20" fill="none">
                  <path d="M15 10H1M1 10L8 3M1 10L8 17" stroke={gradient ? "white" : "black"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
            {title && <h1 className={`text-2xl font-light font-lexend ${gradient ? 'text-white' : 'text-black'}`}>{title}</h1>}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`flex-1 ${gradient ? 'bg-violet-600/75' : 'bg-zinc-100'}`}>
        {children}
      </div>

      {/* Bottom Navigation */}
      {!hideNavigation && <BottomNavigation />}
    </div>
  );
};
