import React, { useState, useEffect } from 'react';
import { LuMapPinned, LuUser, LuMenu, LuX } from 'react-icons/lu';
import LoginModal    from '../Modals/LoginModal';
import RegisterModal from '../Modals/RegisterModal';

export default function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [showLogin, setShowLogin]     = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener('resize', onResize);
    onResize();
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const isOpaque = scrolled || menuOpen || showLogin || showRegister;

  return (
    <>
      <header
        className={
          `fixed top-0 left-0 w-full z-50 transition-colors duration-300 ` +
          (isOpaque ? 'bg-primBG shadow-md' : 'bg-transparent')
        }
      >
        <div className="w-full max-w-screen-xl mx-auto flex items-center justify-between h-[80px] px-4 md:px-6">
          <a href="/"><img src="/assets/Holidaze.svg" alt="logo"
            className="h-[25px] md:h-[35px] hover:scale-[1.01]" /></a>

          <nav className="hidden md:flex items-center gap-20">
            <a href="/venues" className="flex items-center text-2xl font-medium font-dmsans hover:text-textSek hover:scale-[1.01] transition">
              <LuMapPinned className="text-4xl mr-2"/> Venues
            </a>
            <button onClick={() => setShowLogin(true)}
              className="flex items-center text-2xl font-medium font-dmsans hover:text-textSek hover:scale-[1.01] transition">
              <LuUser className="text-4xl mr-2"/> Log in
            </button>
          </nav>

          <button className="md:hidden p-2 text-3xl" onClick={() => setMenuOpen(o => !o)}>
            {menuOpen ? <LuX/> : <LuMenu/>}
          </button>
        </div>

        {menuOpen && (
          <div className="fixed md:hidden top-[80px] left-0 w-full h-[calc(100vh-80px)] bg-primBG z-0 flex flex-col p-4 items-center">
            <a href="/venues" onClick={() => setMenuOpen(false)}
              className="text-2xl font-medium font-dmsans hover:text-textSek transition mb-4">
              <LuMapPinned className="inline mr-2"/> Venues
            </a>
            <button onClick={() => { setMenuOpen(false); setShowLogin(true); }}
              className="text-2xl font-medium font-dmsans hover:text-textSek transition">
              <LuUser className="inline mr-2"/> Log in
            </button>
          </div>
        )}
      </header>

      {/* Modaler */}
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onLoginSuccess={tok => console.log('Logged in:', tok)}
        onOpenRegister={() => setShowRegister(true)}
      />
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onRegisterSuccess={tok => console.log('Registered:', tok)}
        onOpenLogin={() => setShowLogin(true)}  
      />
    </>
  );
}
