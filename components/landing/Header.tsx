import React from 'react';
import Image from 'next/image';
import { HelpCircle, Bug, FileText, ChevronRight } from 'lucide-react';

export const Header = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-[#21252f]/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">

        {/* Left — Logo + name */}
        <div className="flex items-center space-x-3">
          <Image
            src="/favicon.svg"
            alt="AICommit Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg leading-none">AICommit</span>
        </div>

        {/* Right — Nav links + CTA */}
        <div className="hidden md:flex items-center gap-6">
          <a
            href="https://github.com/AICommitApp/community/blob/main/FAQ.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </a>
          <a
            href="https://github.com/AICommitApp/community/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <Bug className="w-4 h-4" />
            <span>Bug Report</span>
          </a>
          <a
            href="https://github.com/AICommitApp/community/blob/main/EULA.md"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span>EULA</span>
          </a>

          <a
            href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#ded14f] hover:bg-[#ded14f]/90 text-black
                       text-sm font-semibold rounded-full transition-colors duration-200 active:scale-[0.97]"
            onClick={() => {
              if (typeof window !== 'undefined' && (window as any).gtag) {
                (window as any).gtag('event', 'click_install_plugin', { location: 'nav' });
              }
            }}
          >
            Install Plugin
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </nav>
  );
};
