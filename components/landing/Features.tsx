import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Zap, Code, Lock } from 'lucide-react';

export const Features = () => {
  const shouldReduceMotion = useReducedMotion();
  const features = [
    {
      icon: <Zap className="w-6 h-6 text-[#ded14f]" />,
      title: "Smart Commit Messages",
      description:
        "Advanced diff analysis for precise, meaningful commits automatically generated based on your changes.",
    },
    {
      icon: <Code className="w-6 h-6 text-[#ded14f]" />,
      title: "Multi-Platform AI",
      description:
        "Seamless integration with OpenAI, Azure, and Google Gemini for flexible AI processing options.",
    },
    {
      icon: <Lock className="w-6 h-6 text-[#ded14f]" />,
      title: "Privacy First",
      description:
        "Your code stays secure with local processing and encrypted communications.",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              {...(!shouldReduceMotion ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, viewport: { once: true } } : {})}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 
                     hover:bg-white/10 transition-colors duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


