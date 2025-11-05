import React from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface ShoppingCartProps {
  items: CartItem[];
  isOpen: boolean;
  onToggle: () => void;
  onUpdateQuantity: (id: number, size: string, quantity: number) => void;
  onRemoveItem: (id: number, size: string) => void;
  onCheckout: () => void;
}

const ShoppingCartComponent: React.FC<ShoppingCartProps> = ({
  items,
  isOpen,
  onToggle,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <>
      {/* Cart Toggle Button */}
      <button
        onClick={onToggle}
        className={`fixed top-20 right-6 z-50 bg-amber-700 hover:bg-amber-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? 'transform rotate-180' : ''
        }`}
      >
        <div className="relative">
          <ShoppingCart className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              {totalItems}
            </span>
          )}
        </div>
      </button>

      {/* Cart Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-amber-200">
            <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Кошик
            </h2>
            <button
              onClick={onToggle}
              className="text-amber-700 hover:text-amber-900 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="text-center text-amber-600 mt-12">
                <ShoppingCart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Кошик порожній</p>
                <p className="text-sm mt-2">Додайте товари для оформлення замовлення</p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="bg-amber-50 rounded-lg p-4 shadow-sm">
                    <div className="flex gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold text-amber-900 mb-1" style={{ fontFamily: 'PT Serif, serif' }}>
                          {item.name}
                        </h4>
                        <p className="text-sm text-amber-700 mb-2">Розмір: {item.size}</p>
                        <p className="font-bold text-amber-900">{item.price} грн</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(item.id, item.size)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                          className="bg-amber-200 hover:bg-amber-300 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="font-semibold text-amber-900 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.size, item.quantity + 1)}
                          className="bg-amber-200 hover:bg-amber-300 text-amber-800 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="font-bold text-amber-900">
                        {item.price * item.quantity} грн
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-amber-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xl font-bold text-amber-900">Загалом:</span>
                <span className="text-2xl font-bold text-amber-900">{totalPrice} грн</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-amber-700 hover:bg-amber-800 text-white py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg transform hover:scale-105"
              >
                Оформити замовлення
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}
    </>
  );
};

export default ShoppingCartComponent;