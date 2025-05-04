
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MobileLayout } from '../components/MobileLayout';
import { useToast } from '@/hooks/use-toast';
import { useCart, Product } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

interface CategoryData {
  [key: string]: {
    title: string;
    products: Product[];
  };
}

const categoryData: CategoryData = {
  diodes: {
    title: 'Diodes',
    products: [
      { id: 'd1', name: 'PN Junction diode', price: 10, image: '/img/diode/pnd.png', category: 'diodes' },
      { id: 'd2', name: 'Zener diode', price: 10, image: '/img/diode/z.jpg', category: 'diodes' },
      { id: 'd3', name: 'Gunn diode', price: 10, image: '/img/diode/gunn.jpg', category: 'diodes' },
      { id: 'd4', name: 'Photo diode', price: 10, image: '/img/diode/photo.jpg', category: 'diodes' },
      { id: 'd5', name: 'Laser diode', price: 10, image: '/img/diode/laser.jpg', category: 'diodes' },
      { id: 'd6', name: 'Tunnel diode', price: 10, image: '/img/diode/tunnel.jpg', category: 'diodes' },
      { id: 'd7', name: 'Step recovery diode', price: 10, image: '/img/diode/sr.jpg', category: 'diodes' },
      { id: 'd8', name: 'LED', price: 10, image: '/img/diode/led.jpg', category: 'diodes' },
    ]
  },
  transistors: {
    title: 'Transistors',
    products: [
      { id: 't1', name: 'BJT', price: 10, image: '/img/transistor/bjt.jpg', category: 'transistors' },
      { id: 't2', name: 'FET', price: 10, image: '/img/transistor/fet.jpg', category: 'transistors' },
      { id: 't3', name: 'IGBT', price: 10, image: '/img/transistor/igbt.jpeg', category: 'transistors' },
      { id: 't4', name: 'Special Transistor', price: 10, image: '/img/transistor/st.png', category: 'transistors' },
    ]
  },
  ics: {
    title: 'ICs',
    products: [
      { id: 'ic1', name: 'DDPAK', price: 10, image: '/img/ic/ddpak.png', category: 'ics' },
      { id: 'ic2', name: 'SOP', price: 10, image: '/img/ic/sop.png', category: 'ics' },
      { id: 'ic3', name: 'TSOP', price: 10, image: '/img/ic/tsop.png', category: 'ics' },
      { id: 'ic4', name: 'TO252', price: 10, image: '/img/ic/to252.png', category: 'ics' },
      { id: 'ic5', name: 'SOT23', price: 10, image: '/img/ic/sop23.png', category: 'ics' },
    ]
  },
  microcontrollers: {
    title: 'Microcontrollers',
    products: [
      { id: 'mc1', name: 'Arduino Nano', price: 12, image: '/img/mc/an.webp', category: 'microcontrollers' },
      { id: 'mc2', name: 'ESP8266', price: 8, image: '/img/mc/8266.jpg', category: 'microcontrollers' },
      { id: 'mc3', name: 'ESP32', price: 15, image: '/img/mc/32.webp', category: 'microcontrollers' },
      { id: 'mc4', name: 'Raspberry Pi Pico', price: 10, image: '/img/mc/pico.jpg', category: 'microcontrollers' },
    ]
  },
  sensors: {
    title: 'Sensors',
    products: [
      { id: 's1', name: 'Temperature Sensor', price: 5, image: '/img/sensor/ts.webp', category: 'sensors' },
      { id: 's2', name: 'Humidity Sensor', price: 6, image: '/img/sensor/hs.jpg', category: 'sensors' },
      { id: 's3', name: 'PIR Sensor', price: 8, image: '/img/sensor/pir.jpg', category: 'sensors' },
      { id: 's4', name: 'Ultrasonic Sensor', price: 7, image: '/img/sensor/us.jpg', category: 'sensors' },
    ]
  },
  // Add more categories as needed...
};

const CategoryPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { toast } = useToast();
  const { addItem, items, updateQuantity, removeItem } = useCart();
  
  const category = categoryId && categoryData[categoryId] 
    ? categoryData[categoryId] 
    : { title: 'Category Not Found', products: [] };

  const getItemQuantity = (productId: string): number => {
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };
  
  const handleAddToCart = () => {
    if (selectedProduct) {
      addItem(selectedProduct);
      toast({
        title: "Added to cart",
        description: `${selectedProduct.name} has been added to your cart.`,
      });
    } else {
      toast({
        title: "Select a product",
        description: "Please select a product before adding to cart.",
        variant: "destructive",
      });
    }
  };

  const handleUpdateQuantity = (product: Product, quantity: number) => {
    if (quantity <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity);
    }
  };

  return (
    <MobileLayout showBackButton title={category.title} gradient>
      <div className="bg-zinc-100 min-h-screen pt-6 pb-24">
        {category.products.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 px-6">
            {category.products.map((product) => {
              const quantity = getItemQuantity(product.id);
              
              return (
                <div 
                  key={product.id} 
                  className={`bg-white p-4 rounded-lg flex flex-col items-center ${selectedProduct?.id === product.id ? 'border-2 border-violet-500' : '/img/diode/'}`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="h-24 flex items-center justify-center mb-2">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="max-w-full max-h-full object-contain" 
                    />
                  </div>
                  <h3 className="text-black text-base font-light font-lexend text-center mb-1">
                    {product.name}
                  </h3>
                  <p className="text-black text-base font-normal font-montserrat mb-2">
                    ${product.price}
                  </p>
                  
                  {quantity > 0 && (
                    <div className="flex items-center mt-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateQuantity(product, quantity - 1);
                        }}
                        className="bg-zinc-200 rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="mx-2 text-black font-montserrat">{quantity}</span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleUpdateQuantity(product, quantity + 1);
                        }}
                        className="bg-zinc-200 rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64">
            <p className="text-black/50 text-base font-light font-lexend">
              Coming soon
            </p>
          </div>
        )}
        
        {/* Add to Cart Button */}
        <div className="fixed bottom-28 left-0 w-full flex justify-center">
          <button 
            onClick={handleAddToCart}
            className="bg-violet-400 rounded-[20px] py-5 px-8"
          >
            <span className="text-black text-xl font-normal font-lexend">ADD TO CART</span>
          </button>
        </div>
      </div>
    </MobileLayout>
  );
};

export default CategoryPage;
