'use client';

import { motion } from 'framer-motion';
import { Tractor, Wrench, Shield, MapPin, Users, Award, Clock } from 'lucide-react';

export default function AboutPage() {
  const services = [
    {
      icon: Wrench,
      title: 'Запасні частини для вашої сільгосптехніки',
      description: 'Пропонуємо оригінальні запчастини для сільгосптехніки від таких світових брендів, як John Deere, Vaderstad, Geringhoff, Hagie, Kramer, Monosem, Mazotti, Sulky, Fast. Гарантуємо швидкі доставки від виробників з Європи та США. На складі маємо понад 15 тисяч найменувань, які постачаємо автотранспортом щотижня.'
    },
    {
      icon: Shield,
      title: 'Професійна сервісна підтримка',
      description: 'Ми не лише постачаємо сільгосптехніку, а й гарантуємо її надійність та ефективність протягом усього терміну служби. Наші фахівці оперативно та якісно реагують на потреби господарств, маючи потужну сервісну інфраструктуру у Києві, Ніжині та Сумах, щоб забезпечити покриття всього регіону.'
    },
    {
      icon: Tractor,
      title: 'Точне землеробство',
      description: 'Agro Solar впроваджує передові технології точного землеробства, щоб допомогти вам оптимізувати та підвищити продуктивність вашого сільськогосподарського бізнесу. Наші рішення, такі як системи GPS-навігації, датчики та автоматичне управління, дозволяють точно визначати потреби полів у волозі, добривах та інших ресурсах.'
    }
  ];

  const features = [
    {
      icon: Users,
      title: '2000+ клієнтів',
      description: 'Довіра сільгосппідприємств по всій Україні'
    },
    {
      icon: Award,
      title: 'Офіційний дилер',
      description: 'John Deere, Väderstad, Geringhoff та інших брендів'
    },
    {
      icon: Clock,
      title: 'Засновано в 2022',
      description: 'Молода, але досвідчена команда'
    },
    {
      icon: MapPin,
      title: '3 філіали',
      description: 'Київська, Сумська та Чернігівська області'
    }
  ];

  const brands = [
    'John Deere', 'Väderstad', 'Geringhoff', 'Hagie', 
    'Kramer', 'Mazzotti', 'Monosem', 'Sulky', 'Fast'
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative text-white py-20" style={{backgroundColor: '#008E4E'}}>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Про нас
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Agro Solar – надійний партнер у світі сільськогосподарської техніки
            </motion.p>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Наша історія
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Ми – офіційний дилер відомих брендів сільгосптехніки, таких як John Deere, 
                Väderstad, Geringhoff, Hagie, Kramer, Mazzotti, Monosem, Sulky та ін.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white rounded-lg shadow-lg p-8 mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                Agro Solar було засновано в 2022 році, і вже отримало довіру понад 2000 
                сільгосппідприємств по всій Україні. Наші філіали розміщені у північному 
                регіоні України: Київська, Сумська та Чернігівська область.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Чому обирають нас
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 text-center"
                style={{backgroundColor: '#008E4E'}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4" style={{backgroundColor: '#FBBA00'}}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-white/90 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
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
          
          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div 
                key={index}
                className="text-white rounded-lg shadow-lg p-8"
                style={{backgroundColor: '#008E4E'}}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-start">
                  <div className="text-white rounded-lg p-3 mr-6 flex-shrink-0" style={{backgroundColor: '#FBBA00'}}>
                    <service.icon className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-white/90 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Бренди, які ми представляємо
            </h2>
            <p className="text-lg text-gray-600">
              Офіційний дилер світових лідерів сільськогосподарської техніки
            </p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                className="text-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300"
                style={{backgroundColor: '#008E4E'}}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3 className="font-semibold text-white">{brand}</h3>
              </motion.div>
            ))}
          </motion.div>
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
            Готові стати нашим партнером?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 text-white/90"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Зв&apos;яжіться з нами для отримання професійної консультації та 
            обговорення умов співпраці
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <a 
              href="/contacts"
              className="inline-block bg-secondary text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-secondary/90 transition-colors duration-300"
            >
              Зв&apos;язатися з нами
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
