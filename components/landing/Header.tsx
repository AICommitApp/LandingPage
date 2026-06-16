import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';
import { HelpCircle, Bug, FileText, ChevronRight, Menu, X } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const navLinks = [
  { label: 'Features', href: '#features', external: false },
  { label: 'Showcase', href: '#showcase', external: false },
  { label: 'Reviews', href: '#reviews', external: false },
  { label: 'FAQ', href: '#compatibility-faq', external: false },
];

const externalLinks = [
  { label: 'FAQ', href: 'https://github.com/AICommitApp/community/blob/main/FAQ.md', icon: HelpCircle },
  { label: 'Bug Report', href: 'https://github.com/AICommitApp/community/', icon: Bug },
  { label: 'EULA', href: 'https://github.com/AICommitApp/community/blob/main/EULA.md', icon: FileText },
];

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // Trap focus inside the open mobile drawer: Escape closes, Tab cycles within.
  useEffect(() => {
    if (!isMenuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const root = drawerRef.current;
      if (!root) return;
      const focusables = root.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    // Move focus into the drawer once it has mounted.
    const raf = requestAnimationFrame(() => {
      drawerRef.current?.querySelector<HTMLElement>('a[href], button')?.focus();
    });

    return () => {
      window.removeEventListener('keydown', onKey);
      cancelAnimationFrame(raf);
    };
  }, [isMenuOpen]);

  // Return focus to the toggle button when the drawer closes.
  useEffect(() => {
    if (wasOpen.current && !isMenuOpen) toggleRef.current?.focus();
    wasOpen.current = isMenuOpen;
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#21252f]/50 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-6 h-16 flex justify-between items-center">

        {/* Left — Logo + name */}
        <a href="#" className="flex items-center gap-3" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <Image
            src="/favicon.svg"
            alt="AICommit Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="font-semibold text-lg leading-none">AICommit</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="text-sm text-gray-400 hover:text-white transition-colors"
              onClick={(e) => !external && handleNavClick(e, href)}
            >
              {label}
            </a>
          ))}

          <a
            href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand hover:bg-brand/90 text-black
                       text-sm font-semibold rounded-full transition-colors duration-200 active:scale-[0.97]"
            onClick={() => trackEvent('click_install_plugin', { location: 'nav' })}
          >
            Install Plugin
            <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          className="md:hidden p-3 -mr-1 text-gray-400 hover:text-white transition-colors"
          aria-label="Toggle navigation"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            ref={drawerRef}
            id="mobile-nav"
            className="md:hidden absolute top-16 left-0 right-0 z-40 border-b border-white/10 bg-[#21252f]/95 backdrop-blur-md"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -8 }}
            // ease-out entering, ease-in leaving (enter vs exit asymmetry)
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0, transition: { duration: 0.18, ease: [0, 0, 0.2, 1] } }}
            exit={shouldReduceMotion ? {} : { opacity: 0, y: -8, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
          >
            <div className="container mx-auto px-6 py-4 flex flex-col gap-3">
              {navLinks.map(({ label, href, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="flex items-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={(e) => !external ? handleNavClick(e, href) : setIsMenuOpen(false)}
                >
                  <span>{label}</span>
                </a>
              ))}
              <div className="border-t border-white/10 my-1" />
              {externalLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </a>
              ))}
              <a
                href="https://plugins.jetbrains.com/plugin/21289-aicommit/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-brand hover:bg-brand/90 text-black
                           text-sm font-semibold rounded-full transition-colors duration-200 mt-1"
                onClick={() => {
                  setIsMenuOpen(false);
                  trackEvent('click_install_plugin', { location: 'nav_mobile' });
                }}
              >
                Install Plugin
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
