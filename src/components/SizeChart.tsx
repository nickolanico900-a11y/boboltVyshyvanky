import React from 'react';
import { X } from 'lucide-react';

interface SizeChartProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSize: (size: string) => void;
}

const SizeChart: React.FC<SizeChartProps> = ({ isOpen, onClose, onSelectSize }) => {
  if (!isOpen) return null;

  const sizes = [
    { size: 'S', obGr: 105, plechi: 43, dovzhPoSpini: 72, dovzhRukava: 63 },
    { size: 'M', obGr: 109, plechi: 44, dovzhPoSpini: 73, dovzhRukava: 63 },
    { size: 'L', obGr: 114, plechi: 46, dovzhPoSpini: 75, dovzhRukava: 64 },
    { size: 'XL', obGr: 119, plechi: 48, dovzhPoSpini: 75, dovzhRukava: 64 },
    { size: '2XL', obGr: 124, plechi: 50, dovzhPoSpini: 75, dovzhRukava: 65 },
    { size: '3XL', obGr: 129, plechi: 51, dovzhPoSpini: 76, dovzhRukava: 66 },
    { size: '4XL', obGr: 134, plechi: 52, dovzhPoSpini: 76, dovzhRukava: 66 },
    { size: '5XL', obGr: 139, plechi: 53, dovzhPoSpini: 76, dovzhRukava: 66 }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[200] flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-4xl w-full my-4" onClick={(e) => e.stopPropagation()}>
        <div className="bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-amber-900" style={{ fontFamily: 'Oswald, sans-serif' }}>
            Розмірна сітка
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-x-auto">
            <table className="w-full border-collapse border-2 border-amber-800">
              <thead>
                <tr className="bg-amber-100">
                  <th className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-amber-900 font-bold text-sm sm:text-lg">
                    Розмір
                  </th>
                  <th className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-amber-900 font-bold text-sm sm:text-lg">
                    Об.гр
                  </th>
                  <th className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-amber-900 font-bold text-sm sm:text-lg">
                    Плечі
                  </th>
                  <th className="border-2 border-amber-800 px-1 sm:px-4 py-2 sm:py-3 text-amber-900 font-bold text-xs sm:text-lg">
                    <span className="block sm:hidden leading-tight">Довж.<br/>по<br/>спині</span>
                    <span className="hidden sm:block">Довж. по спині</span>
                  </th>
                  <th className="border-2 border-amber-800 px-1 sm:px-4 py-2 sm:py-3 text-amber-900 font-bold text-xs sm:text-lg">
                    <span className="block sm:hidden leading-tight">Довж.<br/>рукава</span>
                    <span className="hidden sm:block">Довж. рукава</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sizes.map((row) => (
                  <tr
                    key={row.size}
                    className="hover:bg-amber-50 cursor-pointer transition-colors"
                    onClick={() => {
                      onSelectSize(row.size);
                      onClose();
                    }}
                  >
                    <td className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-center text-amber-900 font-bold text-lg sm:text-xl">
                      {row.size}
                    </td>
                    <td className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-center text-amber-900 text-base sm:text-lg">
                      {row.obGr}
                    </td>
                    <td className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-center text-amber-900 text-base sm:text-lg">
                      {row.plechi}
                    </td>
                    <td className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-center text-amber-900 text-base sm:text-lg">
                      {row.dovzhPoSpini}
                    </td>
                    <td className="border-2 border-amber-800 px-2 sm:px-4 py-2 sm:py-3 text-center text-amber-900 text-base sm:text-lg">
                      {row.dovzhRukava}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          <div className="mt-4 sm:mt-6 bg-amber-50 rounded-lg p-3 sm:p-4">
            <p className="text-xs sm:text-sm text-amber-900">
              <strong>Підказка:</strong> Натисніть на будь-який розмір у таблиці, щоб обрати його
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChart;
