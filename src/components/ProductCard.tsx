import React, { useState } from 'react';
import { ShoppingCart, Check, Package, Leaf, MapPin, ChevronLeft, ChevronRight } from 'lucide-react';
import SizeChart from './SizeChart';

interface Product {
  id: number;
  name: string;
  sizes: string[];
  fabric: string;
  color: string;
  sleeveLength: string;
  price: number;
  image: string;
  images?: string[];
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
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const showSizes = openDropdownId === product.id;
  const productImages = product.images || [product.image];
  const hasMultipleImages = productImages.length > 1;

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
    setIsSizeChartOpen(false);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
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
    <>
      <SizeChart
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        onSelectSize={handleSizeSelect}
      />

      <div className={`bg-amber-50 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative flex flex-col ${
        showSizes ? 'z-[100]' : 'z-10'
      }`}>
        <div className="aspect-square mb-6 overflow-hidden rounded-lg relative">
          <img
            src={productImages[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
            style={{
              objectPosition: getImagePosition()
            }}
          />

          {/* Product badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-sm" title="Ручна робота">
              <Package className="w-5 h-5 text-amber-700" />
            </div>
            <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-sm" title="Натуральні матеріали">
              <Leaf className="w-5 h-5 text-green-600" />
            </div>
            <div className="bg-white bg-opacity-90 rounded-full p-3 shadow-sm" title="Зроблено в Україні">
              <MapPin className="w-5 h-5 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Image carousel under the image */}
        {hasMultipleImages && (
          <div className="flex items-center justify-center gap-3 mb-6">
            {productImages.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex(index);
                }}
                className={`h-20 w-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? 'border-amber-900 shadow-lg scale-105'
                    : 'border-amber-200 hover:border-amber-500 opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={productImages[index]}
                  alt={`${product.name} - фото ${index + 1}`}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: getImagePosition()
                  }}
                />
              </button>
            ))}
          </div>
        )}
      
      <h3 className="text-2xl font-bold text-amber-900 mb-4" style={{ fontFamily: 'PT Serif, serif' }}>
        {product.name}
      </h3>

      <div className="space-y-2 text-base text-amber-800 mb-5">
        <p><span className="font-semibold">Розмір:</span> {product.sizes.join(', ')}</p>
        <p><span className="font-semibold">Тканина:</span> {product.fabric}</p>
        <p><span className="font-semibold">Колір:</span> {product.color}</p>
        <p><span className="font-semibold">Довжина рукава:</span> {product.sleeveLength}</p>
      </div>
      
      <div className="bg-amber-200 rounded-lg px-6 py-3 inline-block mb-5 mt-auto">
        <span className="text-2xl font-bold text-amber-900">{product.price} грн</span>
      </div>
      
      {/* Size selection */}
      <div className="space-y-3">
        {!selectedSize ? (
          <button
            onClick={() => setIsSizeChartOpen(true)}
            className="w-full bg-amber-700 hover:bg-amber-800 text-white px-6 py-4 rounded-lg text-lg font-semibold transition-colors duration-200"
          >
            Обрати розмір
          </button>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-amber-100 px-5 py-3 rounded-lg">
              <span className="text-lg font-semibold text-amber-900">Розмір: {selectedSize}</span>
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
              className={`w-full px-6 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
                isAdded 
                  ? 'bg-green-600 text-white' 
                  : 'bg-amber-700 hover:bg-amber-800 text-white hover:shadow-lg transform hover:scale-105'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" />
                  Додано!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" />
                  Додати до замовлення
                </>
              )}
            </button>
          </div>
        )}
      </div>
      </div>
    </>
  );
};

export default ProductCard;