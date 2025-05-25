import React, { useState, useEffect, useRef, useCallback } from 'react';
import VenueCard from '../../components/Home/VenueCard';
import Loading from '../../components/Loading';

export default function VenuesList() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();

  // Fetch venues for the given page with duplicate filtering
  const fetchVenues = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const limit = 100; // items per page
      const res = await fetch(
        `https://v2.api.noroff.dev/holidaze/venues?sort=created&sortOrder=desc&page=${page}&limit=${limit}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      setVenues(prev => {
        if (page === 1) {
          return json.data;
        }
        const existingIds = new Set(prev.map(v => v.id));
        const newItems = json.data.filter(v => !existingIds.has(v.id));
        return [...prev, ...newItems];
      });

      setHasMore(json.meta ? !json.meta.isLastPage : json.data.length === limit);
    } catch (err) {
      console.error(err);
      setError('Could not load venues.');
    } finally {
      setLoading(false);
    }
  }, [page]);

 
  useEffect(() => {
    fetchVenues();
  }, [fetchVenues]);

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

  if (error) return <div className="text-center py-10 text-redPrim">{error}</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 max-w-screen-xl my-20 mx-auto">
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

      {loading && <div className="col-span-full text-center py-10"><Loading /></div>}

      {!hasMore && !loading && (
        <div className="col-span-full text-center py-10 text-textSek">
          No more venues to display.
        </div>
      )}
    </div>
  );
}
