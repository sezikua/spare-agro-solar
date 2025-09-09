'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface ExchangeRate {
  rate: number;
  exchangedate: string;
}

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [exchangeRate, setExchangeRate] = useState<ExchangeRate | null>(null);

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="text-white shadow-lg fixed top-0 left-0 right-0 z-50" style={{backgroundColor: '#008E4E'}}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/images/Logo-AS.svg"
              alt="Agro Solar Logo"
              width={50}
              height={50}
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="hover:text-secondary transition-colors duration-300 font-medium"
            >
              Головна
            </Link>
            <Link 
              href="/spare-parts" 
              className="hover:text-secondary transition-colors duration-300 font-medium"
            >
              Запчастини
            </Link>
            <Link 
              href="/contacts" 
              className="hover:text-secondary transition-colors duration-300 font-medium"
            >
              Контакти
            </Link>
            <Link 
              href="/about" 
              className="hover:text-secondary transition-colors duration-300 font-medium"
            >
              Про нас
            </Link>
          </nav>

          {/* Exchange Rate - Right side */}
          <div className="hidden md:flex items-center">
            {exchangeRate && (
              <div className="bg-secondary text-primary py-2 px-4 rounded-lg text-sm font-medium">
                Курс НБУ на {exchangeRate.exchangedate} становить {exchangeRate.rate}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-white/20 pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="hover:text-secondary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Головна
              </Link>
              <Link 
                href="/spare-parts" 
                className="hover:text-secondary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Запчастини
              </Link>
              <Link 
                href="/contacts" 
                className="hover:text-secondary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Контакти
              </Link>
              <Link 
                href="/about" 
                className="hover:text-secondary transition-colors duration-300 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Про нас
              </Link>
              
              {/* Mobile Exchange Rate */}
              {exchangeRate && (
                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="bg-secondary text-primary py-2 px-4 rounded-lg text-sm font-medium text-center">
                    Курс НБУ на {exchangeRate.exchangedate} становить {exchangeRate.rate}
                  </div>
                </div>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
