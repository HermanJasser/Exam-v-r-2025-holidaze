import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { LuSearch, LuChevronUp } from 'react-icons/lu';
import VenueCard from '../../components/Home/VenueCard';
import Loading from '../../components/Loading';

export default function SearchedVenues() {
  const location = useLocation();
  const initialQuery = location.state?.query ?? '';
  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [query, setQuery] = useState(initialQuery);
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const observer = useRef();

  // Fetch search results with pagination and filter duplicates
  const fetchVenues = useCallback(async () => {
    if (!query) return;
    setLoading(true);
    setError(null);

    try {
      const limit = 48;
      const url = `https://v2.api.noroff.dev/holidaze/venues/search?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      setVenues(prev => {
        if (page === 1) return json.data;
        const existingIds = new Set(prev.map(v => v.id));
        const newItems = json.data.filter(v => !existingIds.has(v.id));
        return [...prev, ...newItems];
      });

      setHasMore(json.meta ? !json.meta.isLastPage : json.data.length === limit);
    } catch (err) {
      console.error(err);
      setError('Was not able to fetch venues');
    } finally {
      setLoading(false);
    }
  }, [query, page]);

  // Trigger fetch on query or page change
  useEffect(() => {
    if (page === 1) {
      setVenues([]);
      setHasMore(true);
    }
    fetchVenues();
  }, [fetchVenues, page]);

  // IntersectionObserver for infinite scroll
  const lastVenueRef = useCallback(
    node => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prev => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  // Back to top button visibility
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

  const handleSubmit = e => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed && trimmed !== query) {
      setQuery(trimmed);
      setPage(1);
    }
  };

  return (
    <div className="relative max-w-screen-xl mx-auto my-20 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl my-8 mx-auto flex shadow-lg bg-sekBG rounded overflow-hidden"
      >
        <input
          type="text"
          placeholder="Where to?"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="flex-grow px-4 py-3 text-lg outline-none bg-sekBG"
        />
        <button type="submit" className="px-6 flex items-center justify-center">
          <LuSearch className="text-2xl text-primGreen" />
        </button>
      </form>

      {!query && <div className="text-center py-10">No search term provided</div>}
      {error && <div className="text-center py-10 text-redPrim">{error}</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {venues.map((venue, index) => {
          if (venues.length === index + 1) {
            return (
              <div ref={lastVenueRef} key={venue.id}>
                <VenueCard venue={venue} />
              </div>
            );
          }
          return <VenueCard key={venue.id} venue={venue} />;
        })}
      </div>

      {loading && <div className="text-center py-10"><Loading /></div>}
      {!hasMore && !loading && query && (
        <div className="text-center py-10 text-gray-500">
          No more results for “{query}”.
        </div>
      )}

      {/* Back to Top button */}
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