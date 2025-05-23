import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');


  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    const fetchBookings = async () => {

      try {
        const res = await fetch(
          `${baseUrl}/profiles/${username}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
            }
          }
        );
        if (!res.ok) throw new Error(`Feil ${res.status}`);
        console.log('STATUS', res.status, 'OK?', res.ok);
        const json = await res.json();
        console.log(res);
        setBookings(json.data);
       //console.log(json.data[0]); 
      } catch (err) {
        console.error(err);
        setError('Kunne ikke laste dine bookinger.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [username]);

  const handleEdit = (id) => {
    navigate(`/dashboard/editbooking/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Er du sikker på at du vil slette denne bookingen?')) return;
    const token = localStorage.getItem('accessToken');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    try {
      const res = await fetch(`${baseUrl}/bookings/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
        }
      });
      if (!res.ok) throw new Error('Sletting mislyktes');
      setBookings((bs) => bs.filter((b) => b.id !== id));
    } catch (err) {
      console.error(err);
      alert('Kunne ikke slette bookingen.');
    }
  };

  if (loading) return <p>Loading bookings…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (bookings.length === 0) return <p>No bookings found</p>;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {bookings.map((b) => (
        <div key={b.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
          {/* Venue image */}
          <img
            src={b.venue.media[0].url}
            alt={b.venue.name}
            className="w-full h-40 object-cover rounded mb-4"
          />

          {/* Venue name */}
          <h2 className="text-xl font-semibold mb-1">{b.venue.name}</h2>

          {/* Dates */}
          <p className="text-gray-600 text-sm">
            {new Date(b.dateFrom).toLocaleDateString('no-NO')} –{' '}
            {new Date(b.dateTo).toLocaleDateString('no-NO')}
          </p>

          {/* Guests */}
          <p className="text-gray-800 font-bold mt-2">{b.guests} gjest(er)</p>

          {/* Actions */}
          <div className="mt-auto flex space-x-2 pt-4">
            <button
              onClick={() => handleEdit(b.id)}
              className="bg-primGreen text-white px-4 py-2 rounded hover:bg-sekGreen transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(b.id)}
              className="bg-redPrim text-white px-4 py-2 rounded hover:bg-redSek transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
