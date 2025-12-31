import React from 'react';
import { Star } from 'lucide-react';

export const HalfStar = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="halfFill" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop
          offset="50%"
          className="fill-yellow-400"
          style={{ stopColor: "#facc15" }}
        />
        <stop
          offset="50%"
          className="fill-gray-600"
          style={{ stopColor: "#4b5563" }}
        />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="url(#halfFill)"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

interface RatingProps {
  score: number;
}

export const Rating = ({ score }: RatingProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex">
        {[1, 2, 3, 4, 5].map((starPosition) => {
          if (starPosition <= Math.floor(score)) {
            return (
              <Star
                key={starPosition}
                className="w-5 h-5 text-yellow-400 fill-yellow-400"
              />
            );
          } else if (
            starPosition === Math.ceil(score) &&
            !Number.isInteger(score)
          ) {
            return <HalfStar key={starPosition} />;
          } else {
            return (
              <Star key={starPosition} className="w-5 h-5 text-gray-600" />
            );
          }
        })}
      </div>
      <span className="text-lg font-medium">{score}/5</span>
    </div>
  );
};

