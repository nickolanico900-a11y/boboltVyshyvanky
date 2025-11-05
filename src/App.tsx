import React from 'react';
import { useState } from 'react';
import { Heart, Award, Phone, Mail, MapPin } from 'lucide-react';
import ProductCard from './components/ProductCard';
import ShoppingCart from './components/ShoppingCart';
import OrderModal from './components/OrderModal';
import Toast from './components/Toast';

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

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

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });

  const products: Product[] = [
    {
      id: 1,
      name: 'Чоловіча вишиванка ручної вишивки. Пасека 1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Білий з червоним',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/ksK6qcFm/untitled-0-10.png'
    },
    {
      id: 2,
      name: 'Чоловіча вишиванка ручної вишивки. Святкова 1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Білий',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/KcxGWG9y/untitled-0-9.png'
    },
    {
      id: 3,
      name: 'Чоловіча вишиванка ручної вишивки. Блакитна нитка',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Білий з блакитним',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/Z1MPkBYv/untitled-0-8.png'
    },
    {
      id: 4,
      name: 'Чоловіча вишиванка ручної вишивки. Пасека',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Білий з червоним',
      sleeveLength: 'Короткий',
      price: 1200,
      image: 'https://i.ibb.co/1G17q12R/untitled-0-6.png'
    },
    {
      id: 5,
      name: 'Чоловіча вишиванка ручної вишивки. Петро',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Чорний з червоним',
      sleeveLength: 'Короткий',
      price: 1200,
      image: 'https://i.ibb.co/9kVwnsMg/untitled-0-7.png'
    },
    {
      id: 6,
      name: 'Чоловіча вишиванка ручної вишивки. Блакитна нитка 1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Білий з блакитним',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/KzcB5NQ5/untitled-0-5.png'
    },
    {
      id: 7,
      name: 'Чоловіча вишиванка ручної вишивки. Хакі',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Хакі',
      sleeveLength: 'Короткий',
      price: 1300,
      image: 'https://i.ibb.co/Y7kCSYD7/untitled-0-4.png'
    },
    {
      id: 8,
      name: 'Чоловіча вишиванка ручної вишивки. Святкова',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Білий',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/jPPJqDB8/untitled-0-3.png'
    },
    {
      id: 9,
      name: 'Чоловіча вишиванка ручної вишивки. Небо 1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Блакитний',
      sleeveLength: 'Короткий',
      price: 1300,
      image: 'https://i.ibb.co/LzcFwC1J/untitled-0-2.png'
    },
    {
      id: 10,
      name: 'Чоловіча вишиванка ручної вишивки. Небо',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Блакитний',
      sleeveLength: 'Довгий',
      price: 1300,
      image: 'https://i.ibb.co/k6BhYTCh/image.png'
    },
    {
      id: 11,
      name: 'Чоловіча вишиванка ручної вишивки. Петро 1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Чорний з червоним',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/PvD1JdXg/untitled-0.png'
    },
    {
      id: 12,
      name: 'Чоловіча вишиванка ручної вишивки. Петро 1',
      sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL'],
      fabric: 'Домоткане полотно. 50% льону, 50% бавовна',
      color: 'Чорний з червоним',
      sleeveLength: 'Довгий',
      price: 1200,
      image: 'https://i.ibb.co/WvkP5bym/photo-2025-11-03-14-39-35-removebg-preview.png'
    }
  ];

  const handleAddToCart = (item: CartItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => 
        cartItem.id === item.id && cartItem.size === item.size
      );

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, item];
      }
    });

    setToast({
      message: 'Товар додано до кошика!',
      type: 'success',
      isVisible: true
    });
  };

  const handleUpdateQuantity = (id: number, size: string, quantity: number) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const handleRemoveItem = (id: number, size: string) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === id && item.size === size))
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsOrderModalOpen(true);
  };

  const handleOrderSubmit = async (orderData: any) => {
    // Just a small delay for UX
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Clear cart after successful order
    setCartItems([]);
    
    console.log('Order submitted:', orderData);
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      {/* Shopping Cart */}
      <ShoppingCart
        items={cartItems}
        isOpen={isCartOpen}
        onToggle={() => setIsCartOpen(!isCartOpen)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Order Modal */}
      <OrderModal
        isOpen={isOrderModalOpen}
        onClose={() => setIsOrderModalOpen(false)}
        items={cartItems}
        totalPrice={totalPrice}
        onSubmit={handleOrderSubmit}
      />

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://i.ibb.co/N2pz8NxH/0-02-05-9b5925fb04cbca04e912f6d11da54029f1af628a281e0d6a2a79c644bc2d51af-4f412d50e2aaeb05.jpg)'
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
          {/* Logo */}
          <div className="mb-8">
            <img 
              src="https://i.ibb.co/FbH9M2F9/image.png" 
              alt="Логотип" 
              className="h-24 mx-auto mb-6 drop-shadow-lg"
            />
          </div>
          
          {/* Decorative line */}
          <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-6 drop-shadow-sm"></div>
          
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-wide" style={{ fontFamily: 'Oswald, sans-serif', textShadow: '3px 3px 6px rgba(0,0,0,0.9)' }}>
            Вишиванка Вишиваночка
          </h1>
          
          {/* Decorative line */}
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-amber-300 to-transparent mx-auto mb-8 drop-shadow-sm"></div>
          
          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-4 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Merriweather, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Ручна та машинна вишивка
          </p>
          <p className="text-lg md:text-xl mb-8 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Merriweather, serif', textShadow: '2px 2px 4px rgba(0,0,0,0.8)' }}>
            Власне виробництво, натуральні тканини, висока якість та уникальний дизайн
          </p>
          <p className="text-lg md:text-xl mb-12 leading-relaxed max-w-2xl mx-auto font-semibold" style={{ fontFamily: 'Merriweather, serif', color: '#FFD700', textShadow: '2px 2px 4px rgba(0,0,0,0.9)' }}>
            Для оптових кліентів є спецпропозиція та знижки
          </p>
          
          {/* CTA Button */}
          <button
            onClick={() => {
              const productsSection = document.getElementById('products-section');
              productsSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-amber-700 hover:bg-amber-800 text-white px-12 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl drop-shadow-lg"
            style={{ fontFamily: 'Inter, sans-serif' }}
          >
            Обрати свою вишиванку
          </button>
        </div>
      </section>

      {/* About Store Section */}
      <section 
        className="py-20 px-4 relative"
        style={{
          backgroundImage: 'url(https://i.ibb.co/PsCzG3ny/0-02-05-3c380090b23b63ca898cab0df1b71919e9aa8a46c3b32bda6b73f9836d22d4b6-9a3aed21733761d7.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Very light overlay for better text readability */}
        <div className="absolute inset-0 bg-amber-50 bg-opacity-90"></div>
        
        <div className="max-w-6xl mx-auto">
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 
                className="text-5xl font-bold mb-8"
                style={{ 
                  fontFamily: 'Oswald, sans-serif',
                  color: '#8B0000'
                }}
              >
                Про магазин
              </h2>
              
              {/* Decorative ornament */}
              <div className="flex items-center mb-6">
                <div className="text-2xl mr-4" style={{ color: '#8B0000' }}>
                  ❋❋❋❋❋
                </div>
              </div>
              
              <div className="space-y-6 text-lg leading-relaxed" style={{ color: '#3B2F2F' }}>
                <p className="text-xl font-semibold" style={{ fontFamily: 'PT Serif, serif' }}>
                  «Вишиванка Вишиваночка» — це більше, ніж одяг. Це історія, яку ми носимо з гордістю.
                </p>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Oswald, sans-serif', color: '#8B0000' }}>
                    Наша місія
                  </h3>
                  <p style={{ fontFamily: 'PT Serif, serif' }}>
                    Зберегти спадщину предків і передати її з любов'ю наступним поколінням. Ми прагнемо, щоб кожна вишиванка несла тепло рук майстра і силу української культури.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Oswald, sans-serif', color: '#8B0000' }}>
                    Хто ми
                  </h3>
                  <p style={{ fontFamily: 'PT Serif, serif' }}>
                    З 2014 року ми працюємо в Запоріжжі, об'єднуючи майстрів із різних регіонів України. Кожна сорочка створена вручну — з терпінням, майстерністю і глибоким знанням традицій.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Oswald, sans-serif', color: '#8B0000' }}>
                    Що ми пропонуємо
                  </h3>
                  <p style={{ fontFamily: 'PT Serif, serif' }}>
                    Наші моделі — це поєднання класики та сучасного крою. Ви можете обрати вишиванку для себе або на подарунок — кожна з них буде особливою.
                  </p>
                </div>
              </div>
              
              {/* Feature Icons */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/W44vtCjp/image.png" 
                    alt="Ручна робота" 
                    className="w-16 h-16 mx-auto mb-3 bg-transparent"
                  />
                  <p className="text-sm font-semibold" style={{ color: '#3B2F2F', fontFamily: 'PT Serif, serif' }}>
                    Ручна<br />робота
                  </p>
                </div>
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/sp883s72/image.png" 
                    alt="Зроблено в Україні" 
                    className="w-16 h-16 mx-auto mb-3 bg-transparent"
                  />
                  <p className="text-sm font-semibold" style={{ color: '#3B2F2F', fontFamily: 'PT Serif, serif' }}>
                    Зроблено<br />в Україні
                  </p>
                </div>
                <div className="text-center">
                  <img 
                    src="https://i.ibb.co/hJY1DG8c/image.png" 
                    alt="Натуральні тканини" 
                    className="w-16 h-16 mx-auto mb-3 bg-transparent"
                  />
                  <p className="text-sm font-semibold" style={{ color: '#3B2F2F', fontFamily: 'PT Serif, serif' }}>
                    Натуральні<br />тканини
                  </p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://i.ibb.co/PZFkfGtZ/snapedit-1757347231358.png" 
                  alt="Чоловік у вишиванці" 
                  className="w-full aspect-[4/5] object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products-section" className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-amber-900 mb-12 text-center" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Наші вишиванки
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                openDropdownId={openDropdownId}
                setOpenDropdownId={setOpenDropdownId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="py-16 px-4" style={{ backgroundColor: '#F5F0E6' }}>
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-4xl font-bold mb-12 text-center"
            style={{ 
              fontFamily: 'Oswald, sans-serif',
              color: '#8B0000'
            }}
          >
            Чому ми
          </h2>
          
          <div className="flex flex-wrap gap-10 mt-5">
            <div className="flex-1 min-w-[250px]">
              <ul className="space-y-4" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li className="text-lg leading-relaxed" style={{ color: '#3B2F2F !important', fontFamily: 'PT Serif, serif' }}>
                  <strong>Ручна робота</strong> — кожна вишиванка створена майстром вручну, з увагою до деталей
                </li>
                <li className="text-lg leading-relaxed" style={{ color: '#3B2F2F !important', fontFamily: 'PT Serif, serif' }}>
                  <strong>Натуральні матеріали</strong> — використовуємо домоткане полотно, льон, бавовну
                </li>
                <li className="text-lg leading-relaxed" style={{ color: '#3B2F2F !important', fontFamily: 'PT Serif, serif' }}>
                  <strong>Автентичні орнаменти</strong> — збережені мотиви з різних регіонів України
                </li>
              </ul>
            </div>
            
            <div className="flex-1 min-w-[250px]">
              <ul className="space-y-4" style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                <li className="text-lg leading-relaxed" style={{ color: '#3B2F2F !important', fontFamily: 'PT Serif, serif' }}>
                  <strong>Зроблено в Україні</strong> — підтримуємо локальних майстрів і виробництво
                </li>
                <li className="text-lg leading-relaxed" style={{ color: '#3B2F2F !important', fontFamily: 'PT Serif, serif' }}>
                  <strong>З 2014 року</strong> — маємо досвід, репутацію і постійних клієнтів
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>


      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Контакти</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+380980302700" className="hover:text-amber-200 transition-colors">
                    098 030 27 00
                  </a>
                  <a 
                    href="viber://chat?number=380980302700" 
                    className="ml-2 text-purple-400 hover:text-purple-300 transition-colors"
                    title="Написати у Viber"
                  >
                    <img 
                      src="https://i.ibb.co/KjL2rh92/icons8-viber-48.png" 
                      alt="Viber" 
                      className="w-5 h-5"
                    />
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" />
                  <a href="tel:+380960941922" className="hover:text-amber-200 transition-colors">
                    096 094 19 22
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5" />
                  <span>м. Запоріжжя, просп. Соборний 107</span>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Про нас</h3>
              <p className="text-amber-200">
                Ми зберігаємо українські традиції та передаємо їх через найкрасивіші вишиванки ручної роботи.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Слідкуйте за нами</h3>
              <div className="flex gap-4">
                <a 
                  href="https://instagram.com/vishivanka_vishivanochka.zp" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-amber-800 hover:bg-amber-700 p-3 rounded-full transition-colors"
                  title="Наш Instagram"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-amber-800 mt-8 pt-8 text-center">
            <p className="text-amber-200">© 2024 Українська Вишиванка. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;