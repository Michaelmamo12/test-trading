import { useState } from 'react';
import { Menu, X, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';

const navItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { openAuth } = useAuth();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.button
            onClick={scrollToTop}
            className="flex items-center group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
              <LineChart className="relative h-8 w-8 text-indigo-600" />
            </div>
            <span className="ml-2 text-xl font-bold gradient-text">TradingJournal</span>
          </motion.button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 hover:after:w-full after:bg-indigo-600 after:transition-all after:duration-300"
                whileHover={{ y: -2 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                {item.name}
              </motion.button>
            ))}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => openAuth('signin')}
                className="hover:text-indigo-600 hover:bg-indigo-50"
              >
                Sign In
              </Button>
              <Button
                onClick={() => openAuth('signup')}
                className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient text-white shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Sign Up
              </Button>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 transition-colors duration-300"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 glass-effect">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.href)}
              className="block w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 transition-all duration-300 text-left"
            >
              {item.name}
            </button>
          ))}
          <div className="px-3 py-2 space-y-2">
            <Button
              variant="ghost"
              onClick={() => {
                openAuth('signin');
                setIsOpen(false);
              }}
              className="w-full justify-start hover:text-indigo-600 hover:bg-indigo-50"
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                openAuth('signup');
                setIsOpen(false);
              }}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.header>
  );
}