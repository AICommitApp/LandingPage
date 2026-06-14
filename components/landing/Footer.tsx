import React from 'react';
import Image from 'next/image';
import { SiGithub } from '@icons-pack/react-simple-icons';

const links = [
  { label: 'FAQ', href: 'https://github.com/AICommitApp/community/blob/main/FAQ.md' },
  { label: 'Bug Report', href: 'https://github.com/AICommitApp/community/' },
  { label: 'EULA', href: 'https://github.com/AICommitApp/community/blob/main/EULA.md' },
  { label: 'JetBrains Marketplace', href: 'https://plugins.jetbrains.com/plugin/21289-aicommit/' },
];

export const Footer = () => {
  return (
    <footer className="py-10 px-6 border-t border-white/10">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

          {/* Brand */}
          <div className="flex items-center gap-3">
            <Image src="/favicon.svg" alt="AICommit" width={22} height={22} className="w-5 h-5 opacity-70" />
            <span className="text-sm text-gray-400">© 2026 AICommit. All rights reserved.</span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/AICommitApp/community/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <SiGithub size={16} color="currentColor" />
              GitHub
            </a>
          </nav>

        </div>
      </div>
    </footer>
  );
};
