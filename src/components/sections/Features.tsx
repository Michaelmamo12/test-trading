import { motion } from 'framer-motion';
import { BarChart3, Target, Laptop2, ArrowRight, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParallaxCard } from '@/components/ui/parallax-card';
import { FloatingElement } from '@/components/ui/floating-element';

const features = [
  {
    icon: LineChart,
    title: 'Trade Logging',
    description: 'Track every trade with detailed entry, exit points, and comprehensive notes.',
  },
  {
    icon: BarChart3,
    title: 'Performance Metrics',
    description: 'Visualize your trading performance with advanced charts and statistics.',
  },
  {
    icon: Target,
    title: 'Strategy Tracking',
    description: 'Monitor and refine your trading strategies with data-driven insights.',
  },
  {
    icon: Laptop2,
    title: 'Multi-Device Support',
    description: 'Access your trading journal seamlessly across all your devices.',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function Features() {
  return (
    <section id="features" className="py-24 bg-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <FloatingElement delay={0} className="absolute top-1/2 left-0 w-72 h-72">
          <div className="w-full h-full bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20" />
        </FloatingElement>
        <FloatingElement delay={2} className="absolute top-1/2 right-0 w-72 h-72">
          <div className="w-full h-full bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20" />
        </FloatingElement>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold sm:text-4xl mb-4"
          >
            Powerful Features for
            <span className="gradient-text"> Serious Traders</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Everything you need to track, analyze, and improve your trading performance
            in one powerful platform.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="relative group"
            >
              <ParallaxCard>
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
                <div className="relative glass-effect p-8 rounded-lg hover:shadow-xl transition-shadow duration-500">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </ParallaxCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient group"
          >
            <span className="flex items-center gap-2">
              Explore All Features
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}