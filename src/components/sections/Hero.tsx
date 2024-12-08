import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Scene } from '@/components/3d/Scene';
import { useAuth } from '@/hooks/use-auth';

export function Hero() {
  const { openAuth } = useAuth();

  return (
    <section className="min-h-screen pt-24 pb-12 md:pt-32 md:pb-20 relative overflow-hidden">
      <Scene />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
              <span className="block">Master Your Trades</span>
              <span className="block mt-2 gradient-text">with Confidence</span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="mt-6 max-w-md mx-auto text-lg text-gray-500 sm:text-xl md:mt-8 md:max-w-3xl"
            >
              Track, analyze, and improve your trading performance with our powerful
              journal app. Make data-driven decisions and achieve consistent results.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10 gap-4"
            >
              <Button
                size="lg"
                onClick={() => openAuth('signup')}
                className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient group relative overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-30"></div>
              <div className="relative glass-effect rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=2000"
                  alt="Trading Journal Dashboard"
                  className="w-full rounded-xl shadow-2xl transform hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}