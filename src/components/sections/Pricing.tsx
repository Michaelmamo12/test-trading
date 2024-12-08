import {motion} from 'framer-motion';
import { Button } from '../ui/button';
import { useAuth } from '@/hooks/use-auth';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    description: 'Perfect for getting started',
    features: [
      'Basic trade logging',
      'Simple performance metrics',
      'Single device access',
      'Community support',
    ],
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Best for active traders',
    features: [
      'Advanced trade logging',
      'Detailed performance analytics',
      'Multi-device sync',
      'Strategy backtesting',
      'Priority support',
      'Custom reports',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For trading teams & institutions',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Custom integrations',
      'API access',
      'Dedicated support',
      'Custom training',
    ],
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

export function Pricing() {
  const { openAuth } = useAuth();

  return (
    <section id="pricing" className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
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
            Simple, Transparent
            <span className="gradient-text"> Pricing</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Choose the perfect plan for your trading journey. No hidden fees.
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={item}
              className="relative group"
            >
              <div className={`absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-25 transition duration-500 ${plan.popular ? 'opacity-75' : 'group-hover:opacity-75'}`}></div>
              <div className={`relative glass-effect p-8 rounded-xl h-full flex flex-col ${plan.popular ? 'shadow-xl' : 'hover:shadow-xl'} transition-shadow duration-500`}>
                {plan.popular && (
                  <div className="absolute top-0 right-6 transform -translate-y-1/2">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-medium px-3 py-1 rounded-full">
                      Most Popular
                    </div>
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-gray-500">{plan.period}</span>
                    )}
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => openAuth('signup')}
                  className={`w-full group ${
                    plan.popular
                      ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover-gradient text-white'
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Started
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}