import Link from 'next/link';
import React from 'react';

const citeClass = 'text-gray-200 underline decoration-white/20 hover:text-brand';

type SourceCiteProps = {
  href: string;
  label: string;
};

export const SourceCite = ({ href, label }: SourceCiteProps) => {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={citeClass}>
        {label}
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={citeClass}>
      {label}
    </a>
  );
};
