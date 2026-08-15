import React from 'react';

type PageIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  lede: string;
};

export const PageIntro = ({ eyebrow, title, lede }: PageIntroProps) => {
  return (
    <header className="pt-28 pb-10 md:pt-36 md:pb-14 px-6">
      <div className="container mx-auto max-w-3xl">
        <p className="text-xs font-mono uppercase tracking-[0.32em] text-brand/70 mb-4">
          {eyebrow}
        </p>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-[1.08] mb-6 text-balance">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-gray-400 leading-relaxed text-pretty max-w-xl">
          {lede}
        </p>
      </div>
    </header>
  );
};
