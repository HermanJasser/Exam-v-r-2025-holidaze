// src/components/Header.jsx
import React, { useState, useEffect } from 'react';
import { LuMapPinned, LuUser, LuMenu, LuX } from 'react-icons/lu';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Lytter på scroll for å sette bakgrunn
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lytter på resize og lukker menyen når bredden blir >= 768px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    // Kjør en gang ved mount for å sikre korrekt state
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isOpaque = scrolled || menuOpen;

  return (
    <header
      className={[
        'fixed top-0 left-0 w-full z-50 transition-colors duration-300',
        isOpaque ? 'bg-primBG shadow-md' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between h-[80px] px-4 md:px-6">
        {/* Logo */}
        <a href="/">
          <img
            src="/assets/Holidaze.svg"
            alt="Holidaze logo"
            className="h-[25px] md:h-[35px] hover:scale-[1.01] transition-transform duration-200"
          />
        </a>

        {/* Desktop-navigasjon */}
        <nav className="hidden md:flex items-center gap-20">
          <a
            href="/venues"
            className="flex items-center text-2xl font-medium font-dmsans transition hover:text-textSek hover:scale-[1.01]"
          >
            <LuMapPinned className="text-4xl mr-[2px]" />
            Venues
          </a>
          <button
            className="flex items-center text-2xl font-medium font-dmsans transition hover:text-textSek hover:scale-[1.01]"
            onClick={() => {/* åpne login-modal */}}
          >
            <LuUser className="text-4xl mr-[2px]" />
            Log in
          </button>
        </nav>

        {/* Hamburger-knapp på mobil */}
        <button
          className="md:hidden p-2 text-3xl"
          onClick={() => setMenuOpen(open => !open)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <LuX /> : <LuMenu />}
        </button>
      </div>

      {/* Mobil-meny (under header) */}
      {menuOpen && (
        <div className="fixed md:hidden top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-primBG z-0 flex flex-col p-4 space-y-4">
          <a
            href="/venues"
            className="w-fit flex items-center text-2xl font-medium font-dmsans hover:text-textSek transition hover:scale-[1.01]"
            onClick={() => setMenuOpen(false)}
          >
            <LuMapPinned className="text-4xl mr-2" />
            Venues
          </a>
          <button
            className="w-fit flex items-center text-2xl font-medium font-dmsans hover:text-textSek transition hover:scale-[1.01]"
            onClick={() => {
              setMenuOpen(false);
              /* åpne login-modal */
            }}
          >
            <LuUser className="text-4xl mr-2" />
            Log in
          </button>
        </div>
      )}
    </header>
  );
}
