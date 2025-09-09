import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="text-white" style={{backgroundColor: '#008E4E'}}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Image
                src="/images/Logo-AS.svg"
                alt="Agro Solar Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <p className="text-sm text-white/80">
              Надійний партнер у світі сільськогосподарської техніки
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Швидкі посилання</h3>
            <div className="space-y-2">
              <Link 
                href="/" 
                className="block text-sm text-white/80 hover:text-secondary transition-colors duration-300"
              >
                Головна
              </Link>
              <Link 
                href="/spare-parts" 
                className="block text-sm text-white/80 hover:text-secondary transition-colors duration-300"
              >
                Запчастини
              </Link>
              <Link 
                href="/contacts" 
                className="block text-sm text-white/80 hover:text-secondary transition-colors duration-300"
              >
                Контакти
              </Link>
              <Link 
                href="/about" 
                className="block text-sm text-white/80 hover:text-secondary transition-colors duration-300"
              >
                Про нас
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Правова інформація</h3>
            <div className="space-y-2">
              <Link 
                href="/privacy" 
                className="block text-sm text-white/80 hover:text-secondary transition-colors duration-300"
              >
                Політика конфіденційності
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-6 text-center">
          <p className="text-sm text-white/60">
            © 2024 Agro Solar. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  );
}
