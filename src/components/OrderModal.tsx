import React, { useState } from 'react';
import { X, Send, Check } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  totalPrice: number;
  onSubmit: (orderData: any) => void;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  items,
  totalPrice,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    delivery: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      customer: formData,
      items,
      totalPrice,
      orderDate: new Date().toLocaleString('uk-UA')
    };

    try {
      // Send directly to Telegram API
      const telegramToken = '8377936609:AAHDIRE3P1NBEqwC4juBH7S-60ua92Ctz7c';
      const chatId = '5058219639';
      
      // Format order items
      const itemsList = orderData.items.map(item => 
        `• ${item.name}\n  Розмір: ${item.size}\n  Кількість: ${item.quantity}\n  Ціна: ${item.price * item.quantity} грн`
      ).join('\n\n');
      
      // Create message text
      const text = `🛍️ НОВЕ ЗАМОВЛЕННЯ ВИШИВАНОК!

👤 Клієнт:
Ім'я: ${orderData.customer.name}
Телефон: ${orderData.customer.phone}${orderData.customer.city ? `\nМісто: ${orderData.customer.city}` : ''}${orderData.customer.delivery ? `\nВідділення: ${orderData.customer.delivery}` : ''}

📦 Замовлення:
${itemsList}

💰 Загальна сума: ${orderData.totalPrice} грн

📅 Дата замовлення: ${orderData.orderDate}

${orderData.customer.comment ? `💬 Коментар: ${orderData.customer.comment}` : ''}`;

      const telegramUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage`;
      const response = await fetch(telegramUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: text,
          parse_mode: 'HTML'
        })
      });

      const result = await response.json();
      
      if (!result.ok) {
        throw new Error('Помилка відправки в Telegram');
      }

      // Call the original onSubmit for any additional processing
      await onSubmit(orderData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ name: '', phone: '', city: '', delivery: '', comment: '' });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
        {isSubmitted ? (
          // Success Message
          <div className="p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-green-600 mb-4" style={{ fontFamily: 'Oswald, sans-serif' }}>
              Дякуємо!
            </h2>
            <p className="text-lg text-gray-700 mb-2">Ваше замовлення прийнято.</p>
            <p className="text-gray-600">Ми зв'яжемося з вами найближчим часом.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
                Оформлення замовлення
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Customer Information */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Контактна інформація</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ім'я *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Введіть ваше ім'я"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Телефон *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="+38 (0XX) XXX-XX-XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ваше місто
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Введіть ваше місто"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Відділення Нової Пошти або номер поштомата
                    </label>
                    <input
                      type="text"
                      name="delivery"
                      value={formData.delivery}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                      placeholder="Наприклад: Відділення №15 або Поштомат №3"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Коментар
                    </label>
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all resize-none"
                      placeholder="Додаткові побажання до замовлення"
                    />
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-amber-900 mb-4">Ваше замовлення</h3>
                <div className="bg-amber-50 rounded-lg p-4">
                  {items.map((item) => (
                    <div key={`${item.id}-${item.size}`} className="flex justify-between items-center py-2 border-b border-amber-200 last:border-b-0">
                      <div>
                        <p className="font-medium text-amber-900">{item.name}</p>
                        <p className="text-sm text-amber-700">Розмір: {item.size} × {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-amber-900">{item.price * item.quantity} грн</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-4 mt-4 border-t border-amber-300">
                    <p className="text-lg font-bold text-amber-900">Загальна сума:</p>
                    <p className="text-xl font-bold text-amber-900">{totalPrice} грн</p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-amber-700 hover:bg-amber-800 text-white hover:shadow-lg transform hover:scale-105'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Відправляємо...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Підтвердити замовлення
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderModal;