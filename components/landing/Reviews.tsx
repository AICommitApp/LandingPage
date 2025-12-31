import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Rating } from '@/components/ui/Rating';

export const Reviews = () => {
  const shouldReduceMotion = useReducedMotion();
  
  const reviews = [
    {
      text: "The plugin experience is incredibly smooth. With just one click, the commit is done - it's remarkably efficient and precise.",
      author: "dag***830, Software Engineer",
    },
    {
      text: "Excellent plugin! It's not just for commits - the code reading experience is seamless. With the recent GPT-4 integration, the overall experience has reached a new level.",
      author: "dd***ch, Software Engineer",
    },
    {
      text: "Very powerful and easy to use",
      author: "Jim Kim, Software Engineer",
    },
    {
      text: "Found that students and teachers can use it for free, thanks",
      author: "ki***us,student",
    },
  ];

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <div className="inline-flex flex-col items-center gap-4">
            <Rating score={4.5} />
            <p className="text-gray-400">
              Based on 12000+ Downloads on JetBrains Marketplace
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              {...(!shouldReduceMotion ? { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } } : {})}
              className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <p className="text-lg mb-4">&quot;{review.text}&quot;</p>
              <p className="text-gray-400">— {review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};


