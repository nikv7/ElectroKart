
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MobileLayout } from '../components/MobileLayout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  image: string;
}

const categories: Category[] = [
  { id: 'diodes', name: 'Diodes', image: '/img/diode.jpeg' },
  { id: 'transistors', name: 'Transistors', image: '/img/transistor.jpeg' },
  { id: 'ics', name: 'ICs', image: '/img/ic.jpeg' },
  { id: 'microcontrollers', name: 'Microcontrollers', image: '/img/microcontroller.jpeg' },
  { id: 'sensors', name: 'Sensors', image: '/img/sensor.jpg' },
  { id: 'capacitors', name: 'Capacitators', image: '/img/capacitor.jpeg' },
  { id: 'resistors', name: 'Resistor', image: '/img/resistor.jpeg' },
  { id: 'breadboards', name: 'Breadboard', image: '/img/breadboard.jpeg' },
  { id: 'others', name: 'Others', image: '/img/others.jpeg' },
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showGemini, setShowGemini] = useState(false);
  const [geminiPrompt, setGeminiPrompt] = useState('');
  const [geminiResponse, setGeminiResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleGeminiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!geminiPrompt.trim()) {
      toast({
        title: "Empty prompt",
        description: "Please enter a question or prompt",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate API call (in a real app, this would call the Gemini API)
    setTimeout(() => {
      setGeminiResponse(`This is a simulated response to: "${geminiPrompt}"\n\nPlease replace this with your actual Gemini API integration.`);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <MobileLayout>
      <div className="pb-24">
        {/* Search Bar */}
        <div className="pt-6 px-10 pb-8 bg-white">
          <div className="relative">
            <input
              type="text"
              className="w-full h-11 px-10 py-2 bg-white rounded-[70px] border border-stone-300 text-sm font-montserrat"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute left-2 top-1/2 -translate-y-1/2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-stone-300">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>
        </div>

        {/* Categories Header */}
        <h2 className="px-10 py-8 text-2xl font-light font-lexend text-violet-500">CATEGORIES</h2>

        {/* Categories Grid */}
        {filteredCategories.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 px-6">
            {filteredCategories.map((category) => (
              <Link 
                key={category.id} 
                to={`/category/${category.id}`}
                className="flex flex-col items-center"
              >
                <div className="w-20 h-20 rounded-full shadow-md border-[5px] border-indigo-300 overflow-hidden mb-2">
                  <img src={category.image} alt={category.name} className="w-full h-full object-cover" />
                </div>
                <span className="text-black text-base font-light font-lexend text-center">
                  {category.name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-32">
            <p className="text-black/50 text-base font-light font-lexend">
              No categories match your search
            </p>
          </div>
        )}

        {/* Gemini AI Button */}
        <div className="fixed bottom-28 right-6">
          <button 
            onClick={() => setShowGemini(!showGemini)}
            className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
            </svg>
          </button>
        </div>

        {/* Gemini AI Chat */}
        {showGemini && (
          <div className="fixed bottom-40 right-6 w-72 bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-blue-500 px-4 py-2 flex justify-between items-center">
              <h3 className="text-white font-medium">Gemini AI Assistant</h3>
              <button onClick={() => setShowGemini(false)} className="text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-4 h-64 overflow-y-auto bg-gray-50">
              {geminiResponse && (
                <div className="mb-4 p-2 bg-blue-100 rounded-lg">
                  <p className="text-sm whitespace-pre-wrap">{geminiResponse}</p>
                </div>
              )}
              {!geminiResponse && (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500 text-center text-sm">
                    How can I help you with electronic components today?
                  </p>
                </div>
              )}
            </div>
            
            <form onSubmit={handleGeminiSubmit} className="p-2 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask about electronics..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                  value={geminiPrompt}
                  onChange={(e) => setGeminiPrompt(e.target.value)}
                />
                <button 
                  type="submit" 
                  className="px-3 py-2 bg-blue-500 text-white rounded-md disabled:opacity-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </MobileLayout>
  );
};

export default Home;
