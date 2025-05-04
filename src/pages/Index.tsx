
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Always start the app from the splash screen
    navigate('/splash', { replace: true });
  }, [navigate]);
  
  return null; // No need to render anything as we're redirecting immediately
};

export default Index;
