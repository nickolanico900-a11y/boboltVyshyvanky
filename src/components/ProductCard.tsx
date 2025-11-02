import React, { useState } from 'react';
import { ShoppingCart, Check, Package, Leaf, MapPin } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  sizes: string[];
  fabric: string;
  color: string;
  sleeveLength: string;
  price: number;
  image: string;
}

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  openDropdownId: number | null;
  setOpenDropdownId: (id: number | null) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, openDropdownId, setOpenDropdownId }) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  const showSizes = openDropdownId === product.id;

  // Close dropdown when clicking outside or when another dropdown opens
  React.useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdownId(null);
    };
    
    if (showSizes) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showSizes, setOpenDropdownId]);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
    setOpenDropdownId(null);
  };

  const handleShowSizes = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (showSizes) {
      setOpenDropdownId(null);
    } else {
      setOpenDropdownId(product.id);
    }
  };

  const handleAddToCart = () => {
    if (selectedSize) {
      const cartItem: CartItem = {
        id: product.id,
        name: product.name,
        size: selectedSize,
        price: product.price,
        quantity: 1,
        image: product.image
      };
      
      onAddToCart(cartItem);
      setIsAdded(true);
      
      // Reset after animation
      setTimeout(() => {
        setIsAdded(false);
        setSelectedSize('');
      }, 2000);
    }
  };

  // Determine image positioning based on product ID
  const getImagePosition = () => {
    if ([1, 3, 4, 5, 6, 8].includes(product.id)) {
      return 'center 10%'; // Show more of the top, crop the bottom
    }
    return 'center 15%'; // Standard positioning
  };

  return (
    <div className={`bg-amber-50 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col ${
      showSizes ? 'z-[100]' : 'z-10'
    }`}>
      <div className="aspect-square mb-6 overflow-hidden rounded-lg relative">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
          style={{ 
            objectPosition: getImagePosition()
          }}
        />
        
        {/* Product badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-sm" title="Ручна робота">
            <Package className="w-4 h-4 text-amber-700" />
          </div>
          <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-sm" title="Натуральні матеріали">
            <Leaf className="w-4 h-4 text-green-600" />
          </div>
          <div className="bg-white bg-opacity-90 rounded-full p-2 shadow-sm" title="Зроблено в Україні">
            <MapPin className="w-4 h-4 text-blue-600" />
          </div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'PT Serif, serif' }}>
        {product.name}
      </h3>
      
      <div className="space-y-1 text-sm text-amber-800 mb-4">
        <p><span className="font-semibold">Розмір:</span> {product.sizes.join(', ')}</p>
        <p><span className="font-semibold">Тканина:</span> {product.fabric}</p>
        <p><span className="font-semibold">Колір:</span> {product.color}</p>
        <p><span className="font-semibold">Довжина рукава:</span> {product.sleeveLength}</p>
      </div>
      
      <div className="bg-amber-200 rounded-lg px-4 py-2 inline-block mb-4 mt-auto">
        <span className="text-lg font-bold text-amber-900">{product.price} грн</span>
      </div>
      
      {/* Size selection */}
      <div className="space-y-3">
        {!selectedSize ? (
          <div className="relative">
            <button
              onClick={handleShowSizes}
              className="w-full bg-amber-700 hover:bg-amber-800 text-white px-4 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              Обрати розмір
            </button>
            
            {showSizes && (
              <div 
                className="absolute top-full left-0 right-0 mt-2 bg-white border border-amber-200 rounded-lg shadow-xl z-50 animate-slideDown"
                style={{
                  top: 'calc(100% + 8px)',
                  left: '0',
                  right: '0'
                }}
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSizeSelect(size);
                    }}
                    className="w-full px-4 py-3 text-left hover:bg-amber-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-amber-900 border-b border-amber-100 last:border-b-0"
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex items-center justify-between bg-amber-100 px-4 py-2 rounded-lg">
              <span className="font-semibold text-amber-900">Розмір: {selectedSize}</span>
              <button
                onClick={() => setSelectedSize('')}
                className="text-amber-700 hover:text-amber-900 text-sm underline"
              >
                Змінити
              </button>
            </div>
            
            <button
              onClick={handleAddToCart}
              disabled={isAdded}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-amber-700 hover:bg-amber-800 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  Додано!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Додати до замовлення
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;