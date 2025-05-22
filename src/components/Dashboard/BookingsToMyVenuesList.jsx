import React, { useEffect, useState } from 'react';

export default function BookingsToMyVenuesList() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    if (!token || !user) {
      setError('Du må være logget inn.');
      setLoading(false);
      return;
    }

    const fetchMyBookings = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/profiles/${user}/venues?_bookings=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
            }
          }
        );
        if (!res.ok) throw new Error(`Feil ${res.status}`);
        const { data: myVenues } = await res.json();

        const allBookings = myVenues.flatMap((venue) =>
          (venue.bookings || []).map((b) => ({ ...b, venue }))
        );

        setBookings(allBookings);
      } catch (err) {
        console.error(err);
        setError('Kunne ikke hente bookinger.');
      } finally {
        setLoading(false);
      }
    };

    fetchMyBookings();
  }, []);

  if (loading) return <p>Laster bookinger…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  const now = new Date();

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((b) => {
        const isFinished = new Date(b.dateTo) < now;
        return (
          <div
            key={b.id}
            className="relative bg-white  shadow p-0 flex flex-col overflow-hidden"
          >
            {isFinished && (
              <span className="absolute top-2 right-2 bg-redPrim text-white text-xs px-2 py-1">
                Finished
              </span>
            )}
            {/* Venue Image */}
            <img
              src={b.venue.media[0]?.url}
              alt={b.venue.media[0]?.alt || b.venue.name}
              className="w-full h-40 object-cover"
            />

            {/* Content */}
            <div className="p-4 flex flex-col h-full">
              <h2 className="text-xl font-semibold mb-2 text-textPrim">
                {b.venue.name}
              </h2>

              <p className="text-textSek text-sm mb-1">
                {new Date(b.dateFrom).toLocaleDateString('no-NO')} –{' '}
                {new Date(b.dateTo).toLocaleDateString('no-NO')}
              </p>

              <p className="text-textSek text-sm">
                Booket av: <span className="font-medium">{b.customer.name}</span>
              </p>
              <p className="text-textSek text-sm mb-2">
                E-post: <span className="font-medium">{b.customer.email}</span>
              </p>

              <p className="mt-auto text-textPrim font-bold">
                {b.guests} gjester
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
