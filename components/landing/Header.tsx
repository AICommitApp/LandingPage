import React from 'react';
import Image from 'next/image';
import { HelpCircle, Bug, FileText } from 'lucide-react';

export const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#21252f]/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center">
              <Image
                src="/favicon.svg"
                alt="AICommit Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
            </div>
            <span className="font-semibold text-lg leading-none">
              AICommit
            </span>
          </div>
            <a
            href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 bg-[#ded14f] hover:bg-[#ded14f]/90 text-black font-medium 
                rounded-full transition-all duration-200 hidden md:inline-block"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'click_install_plugin', { location: 'nav' });
              }
            }}
            >
            Install Plugin
            </a>
        </div>
        <div className="flex items-center space-x-6 hidden md:flex">
          <a
          href="https://github.com/AICommitApp/community/blob/main/FAQ.md"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
          <HelpCircle className="w-4 h-4" />
          <span>FAQ</span>
          </a>
          <a
          href="https://github.com/AICommitApp/community/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
          <Bug className="w-4 h-4" />
          <span>Bug Report</span>
          </a>
          <a
          href="https://github.com/AICommitApp/community/blob/main/EULA.md"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
          <FileText className="w-4 h-4" />
          <span>EULA</span>
          </a>
        </div>
      </div>
    </nav>
  );
};

