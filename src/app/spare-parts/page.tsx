'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Loader2, ShoppingCart, X } from 'lucide-react';

interface SparePart {
  id: number;
  article: string;
  part_name: string;
  spare_part_price: string;
  discount_spare_part_price: string | null;
}

interface ExchangeRate {
  rate: number;
  exchangedate: string;
}

export default function SparePartsPage() {
  const [spareParts, setSpareParts] = useState<SparePart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearchTerm, setActiveSearchTerm] = useState('');
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);
  
  const itemsPerPage = 12;

  // Handle search
  const handleSearch = () => {
    setActiveSearchTerm(searchTerm);
    setCurrentPage(1); // Reset to first page when searching
  };

  // Handle clear search
  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveSearchTerm('');
    setCurrentPage(1);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Fetch exchange rate
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
        const data = await response.json();
        const usdRate = data.find((item: { cc: string }) => item.cc === 'USD');
        if (usdRate) {
          setExchangeRate({
            rate: usdRate.rate,
            exchangedate: usdRate.exchangedate
          });
        }
      } catch (error) {
        console.error('Error fetching exchange rate:', error);
      }
    };

    fetchExchangeRate();
  }, []);

  // Fetch spare parts
  useEffect(() => {
    const fetchSpareParts = async () => {
      try {
        setLoading(true);
        setError(null);
        const offset = (currentPage - 1) * itemsPerPage;
        
        // Build API URL with search parameter
        let apiUrl = `/api/spare-parts?limit=${itemsPerPage}&offset=${offset}`;
        if (activeSearchTerm.trim()) {
          apiUrl += `&search=${encodeURIComponent(activeSearchTerm.trim())}`;
        }
        
        // Use our API route to avoid CORS issues
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('API Response:', data); // Debug log
        
        if (data && data.data) {
          setSpareParts(data.data);
          // Calculate total pages based on actual data
          setTotalPages(Math.ceil(10000 / itemsPerPage)); // Assuming 10k total items
        } else {
          setSpareParts([]);
        }
      } catch (error) {
        console.error('Error fetching spare parts:', error);
        setError(`Помилка завантаження запчастин: ${error instanceof Error ? error.message : 'Невідома помилка'}`);
        setSpareParts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpareParts();
  }, [currentPage, activeSearchTerm]);

  const convertToUAH = (usdPrice: string) => {
    if (!exchangeRate) return 'Завантаження...';
    const price = parseFloat(usdPrice);
    return (price * exchangeRate.rate).toFixed(2);
  };

  // No need for client-side filtering since search is now server-side

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && spareParts.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Завантаження запчастин...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Запасні частини
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Оригінальні запчастини для сільгосптехніки від світових брендів. 
            Швидкі доставки з Європи та США.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div 
          className="max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Пошук за артикулом або назвою..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={handleClearSearch}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
            <button
              onClick={handleSearch}
              className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 flex items-center gap-2"
              style={{backgroundColor: '#008E4E'}}
            >
              <Search className="h-5 w-5" />
              Пошук
            </button>
          </div>
        </motion.div>

        {/* Active Search Info */}
        {activeSearchTerm && (
          <motion.div 
            className="text-center mb-4 p-3 bg-primary/10 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-gray-700">
              Результати пошуку для: <span className="font-semibold text-primary">"{activeSearchTerm}"</span>
              <button
                onClick={handleClearSearch}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-4 w-4 inline" />
              </button>
            </p>
          </motion.div>
        )}

        {/* Exchange Rate Info */}
        {exchangeRate && (
          <motion.div 
            className="text-center mb-8 p-4 bg-secondary/10 rounded-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm text-gray-600">
              Курс НБУ на {exchangeRate.exchangedate}: <span className="font-semibold text-primary">{exchangeRate.rate} грн</span>
            </p>
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {/* Spare Parts Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {spareParts.map((part, index) => (
            <motion.div
              key={part.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Product Image */}
              <div className="mb-4">
                <Image
                  src="/images/no_impage.png"
                  alt={part.part_name}
                  width={300}
                  height={200}
                  className="w-full h-48 object-contain rounded-lg bg-gray-100"
                  priority={false}
                />
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 mb-2">{part.part_name}</h3>
                <p className="text-sm text-gray-600 mb-2">Артикул: {part.article}</p>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Ціна:</span>
                  <span className="font-semibold text-lg" style={{color: '#008E4E'}}>
                    {convertToUAH(part.spare_part_price)} грн
                  </span>
                </div>
                
                {part.discount_spare_part_price && (
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Знижка:</span>
                    <span className="font-semibold text-green-600">
                      {convertToUAH(part.discount_spare_part_price)} грн
                    </span>
                  </div>
                )}
              </div>
              
              <button 
                className="w-full text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-300"
                style={{backgroundColor: '#008E4E'}}
              >
                <ShoppingCart className="h-5 w-5" />
                До кошика
              </button>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div 
            className="flex justify-center items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg ${
                    currentPage === page
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        {/* No Results */}
        {spareParts.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              {activeSearchTerm ? `Запчастини з артикулом "${activeSearchTerm}" не знайдено` : 'Запчастини не знайдено'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
