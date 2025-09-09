'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Clock } from 'lucide-react';
import MapComponent from '@/components/MapComponent';

export default function ContactsPage() {
  const branches = [
    {
      id: 1,
      name: 'Дилерський центр, Київська область',
      address: 'смт. Глеваха, вул. Сулими, 11',
      services: [
        { type: 'Сервіс', phone: '+38 (050) 327 24 80' },
        { type: 'Запчастини', phone: '+38 (050) 220 99 52' },
        { type: 'Техніка', phone: '+38 (050) 010 52 20' }
      ]
    },
    {
      id: 2,
      name: 'Дилерський центр, Сумська область',
      address: 'вул. Київська 50, с. Сад, Сумський район, Сумська область, Україна, 42343',
      services: [
        { type: 'Сервіс', phone: '+38 (050) 407 29 73' },
        { type: 'Запчастини', phone: '+38 (050) 307 37 04' },
        { type: 'Техніка', phone: '+38 (050) 407 99 22' }
      ]
    },
    {
      id: 3,
      name: 'Дилерський центр, Чернігівська область',
      address: 'м. Ніжин, вул. Березанська, 159а',
      services: [
        { type: 'Сервіс', phone: '+38 (050) 307 38 65' },
        { type: 'Запчастини', phone: '+38 (050) 407 90 46' },
        { type: 'Техніка', phone: '+38 (050) 308 18 50' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Контакти
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Наші філіали розміщені у північному регіоні України. 
            Зв&apos;яжіться з нами для отримання професійної консультації.
          </p>
        </motion.div>

        {/* Branches */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {branches.map((branch, index) => (
            <motion.div
              key={branch.id}
              className="text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              style={{backgroundColor: '#008E4E'}}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="text-white rounded-full p-2 mr-3" style={{backgroundColor: '#FBBA00'}}>
                    <MapPin className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {branch.name}
                  </h3>
                </div>
                
                <div className="flex items-start mb-4">
                  <MapPin className="h-5 w-5 text-white/70 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-white/90 text-sm leading-relaxed">
                    {branch.address}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white mb-3">Контактні телефони:</h4>
                {branch.services.map((service, serviceIndex) => (
                  <div key={serviceIndex} className="flex items-center">
                    <Phone className="h-4 w-4 text-white/70 mr-2 flex-shrink-0" />
                    <span className="text-sm text-white/90 mr-2 min-w-[80px]">
                      {service.type}:
                    </span>
                    <a 
                      href={`tel:${service.phone}`}
                      className="text-yellow-300 hover:text-yellow-200 font-medium text-sm"
                    >
                      {service.phone}
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Map Section */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Наші локації на карті
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Знайдіть найближчий до вас дилерський центр на інтерактивній карті
            </p>
          </div>
          <MapComponent />
        </motion.div>

        {/* Contact Form */}
        <motion.div 
          className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Надішліть нам повідомлення
          </h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Ім&apos;я *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Ваше ім&apos;я"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Телефон *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="+38 (0XX) XXX XX XX"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                Тема
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Оберіть тему</option>
                <option value="spare-parts">Запчастини</option>
                <option value="service">Сервіс</option>
                <option value="equipment">Техніка</option>
                <option value="precision-agriculture">Точне землеробство</option>
                <option value="other">Інше</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Повідомлення *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Опишіть ваше питання або потребу..."
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors duration-300"
            >
              Надіслати повідомлення
            </button>
          </form>
        </motion.div>

        {/* Working Hours */}
        <motion.div 
          className="mt-12 text-white rounded-lg p-8 text-center"
          style={{backgroundColor: '#008E4E'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Clock className="h-8 w-8 mr-3" />
            <h3 className="text-2xl font-bold">Графік роботи</h3>
          </div>
          <p className="text-lg text-white/90">
            Пн-Пт: 8:00 - 18:00<br />
            Сб: 9:00 - 15:00<br />
            Нд: Вихідний
          </p>
        </motion.div>
      </div>
    </div>
  );
}
