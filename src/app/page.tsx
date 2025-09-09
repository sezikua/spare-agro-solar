'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Tractor, MapPin, Clock, Users } from 'lucide-react';
import VideoBackground from '@/components/VideoBackground';

export default function Home() {
  const videos = ['/video/01.mp4', '/video/02.mp4'];

  return (
    <div className="bg-white">
      {/* Hero Section with Video Background */}
      <VideoBackground 
        videos={videos}
        className="flex items-center"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Agro Solar
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Надійний партнер у світі сільськогосподарської техніки
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <Link 
                href="/spare-parts"
                className="inline-block bg-secondary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/90 transition-colors duration-300"
              >
                Переглянути запчастини
              </Link>
            </motion.div>
          </div>
        </div>
      </VideoBackground>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Про нас
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-700 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ми – офіційний дилер відомих брендів сільгосптехніки, таких як John Deere, 
              Väderstad, Geringhoff, Hagie, Kramer, Mazzotti, Monosem, Sulky та ін.
            </motion.p>
            <motion.p 
              className="text-lg text-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Agro Solar було засновано в 2022 році, і вже отримало довіру понад 2000 
              сільгосппідприємств по всій Україні.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Наші послуги
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Spare Parts */}
            <motion.div 
              className="text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{backgroundColor: '#008E4E'}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
            <Image
                  src="/images/icon.svg"
                  alt="Icon"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold text-white">Запасні частини</h3>
              </div>
              <p className="text-white/90 mb-4">
                Оригінальні запчастини для сільгосптехніки від світових брендів. 
                Швидкі доставки з Європи та США.
              </p>
              <Link 
                href="/spare-parts"
                className="text-secondary hover:text-secondary/80 font-medium"
              >
                Детальніше →
              </Link>
            </motion.div>

            {/* Service Support */}
            <motion.div 
              className="text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{backgroundColor: '#008E4E'}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
          <Image
                  src="/images/icon.svg"
                  alt="Icon"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold text-white">Сервісна підтримка</h3>
              </div>
              <p className="text-white/90 mb-4">
                Професійна сервісна підтримка з потужною інфраструктурою 
                у Києві, Ніжині та Сумах.
              </p>
              <Link 
                href="/contacts"
                className="text-secondary hover:text-secondary/80 font-medium"
              >
                Контакти →
              </Link>
            </motion.div>

            {/* Precision Agriculture */}
            <motion.div 
              className="text-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              style={{backgroundColor: '#008E4E'}}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4">
          <Image
                  src="/images/icon.svg"
                  alt="Icon"
                  width={32}
                  height={32}
                  className="mr-3"
                />
                <h3 className="text-xl font-semibold text-white">Точне землеробство</h3>
              </div>
              <p className="text-white/90 mb-4">
                Передові технології GPS-навігації, датчики та автоматичне 
                управління для оптимізації виробництва.
              </p>
              <Link 
                href="/about"
                className="text-secondary hover:text-secondary/80 font-medium"
              >
                Детальніше →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Tractor className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Широкий вибір техніки</h3>
              <p className="text-gray-700 text-sm">
                Трактори, комбайни, сівалки та обприскувачі від світових лідерів
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Оперативне постачання</h3>
              <p className="text-gray-700 text-sm">
                Системи точного землеробства та надійний сервіс
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Регіональне покриття</h3>
              <p className="text-gray-700 text-sm">
                Філіали у Київській, Сумській та Чернігівській областях
              </p>
            </motion.div>

            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-primary text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">2000+ клієнтів</h3>
              <p className="text-gray-700 text-sm">
                Довіра сільгосппідприємств по всій Україні
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white" style={{backgroundColor: '#008E4E'}}>
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Готові розпочати співпрацю?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Зв&apos;яжіться з нами для отримання професійної консультації
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/contacts"
              className="inline-block bg-secondary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/90 transition-colors duration-300"
            >
              Зв&apos;язатися з нами
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
