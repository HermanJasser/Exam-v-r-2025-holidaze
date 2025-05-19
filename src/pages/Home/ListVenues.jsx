// src/components/VenuesList.jsx
// src/components/VenuesList.jsx
import React, { useState, useEffect } from 'react';
import VenueCard from '../../components/Home/VenueCard';
import Loading from '../../components/Loading';

export default function VenuesList() {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://v2.api.noroff.dev/holidaze/venues')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        setVenues(json.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('cant seem to fetch venues');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center py-10"><Loading /></p>;
  if (error)   return <p className="text-center py-10 text-redPrim">{error}</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 p-4 max-w-screen-xl my-20 mx-auto">
      {venues.map(venue => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
}
