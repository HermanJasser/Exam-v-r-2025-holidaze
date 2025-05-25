import React, { useState, useEffect } from 'react';
import { LuSearch, LuChevronUp } from 'react-icons/lu';
import ListVenues from './ListVenues';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [query, setQuery] = useState('');
  const [showTopBtn, setShowTopBtn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      navigate('/search/', { state: { query: trimmed } });
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="">
      <div className="relative h-screen pt-[80px] overflow-hidden mt-[-80px]">
      
        <img
          src="/assets/norwegian-valley.jpg"
          alt="norwegian valley"
          className="absolute inset-0 w-full h-full object-cover"
        />

   
        <div className="mt-[-80px] relative z-10 flex flex-col items-center justify-center h-full px-4">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[#013659]">
            Search for your dream destination
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl mt-8 flex shadow-lg bg-sekBG rounded overflow-hidden"
          >
            <input
              type="text"
              placeholder="Where to?"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-grow px-4 py-3 text-lg outline-none bg-sekBG"
            />
            <button
              type="submit"
              className="px-6 flex items-center justify-center transition hover:scale-[1.1]"
            >
              <LuSearch className="text-2xl text-primGreen" />
            </button>
          </form>
        </div>
      </div>

      <div>
        <ListVenues />
      </div>

      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-lg bg-primGreen text-white shadow-lg hover:bg-sekGreen transition"
          aria-label="Scroll to top"
        >
          <LuChevronUp size={24} />
        </button>
      )}
    </div>
  );
}
