import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function MyVenuesList() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    if (!token || !user) {
      setError('Missing authentication.');
      setLoading(false);
      return;
    }

    const fetchVenues = async () => {
      try {
        const res = await fetch(`${baseUrl}/profiles/${user}/venues`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
          }
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const { data } = await res.json();
        setVenues(data);
      } catch (err) {
        console.error(err);
        setError('Could not load your venues.');
      } finally {
        setLoading(false);
      }
    };

    fetchVenues();
  }, []);

  const handleEdit = (id) => {
    navigate(`/dashboard/editvenue/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Er du sikker på at du vil slette dette venue?')) return;
    const token = localStorage.getItem('accessToken');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';
    try {
      const res = await fetch(`${baseUrl}/venues/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
        }
      });
      if (!res.ok) throw new Error('Delete failed');
      setVenues((v) => v.filter((venue) => venue.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Laster venues…</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {venues.map((v) => (
        <div key={v.id} className="bg-white shadow hover:shadow-lg hover:scale-[1.01] transition overflow-hidden flex flex-col">
          {/* Link for image and details */}
          <Link to={`/venue/${v.id}`} className="block focus:outline-none focus:ring-2 focus:ring-primGreen">
            <img
              src={v.media[0]?.url}
              alt={v.media[0]?.alt || v.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col h-full">
              <p className="text-textSek text-sm">
                {v.location.city}, {v.location.country}
              </p>
              <h2 className="mt-1 font-semibold text-lg text-textPrim">
                {v.name}
              </h2>
              <p className="text-textSek text-sm mt-1">
                {v.maxGuests} beds
              </p>
              <div className="pt-2">
                <span className="font-bold text-textPrim">
                  {v.price} kr
                </span>
                <span className="text-textSek text-sm"> / Night</span>
              </div>
            </div>
          </Link>
          {/* Buttons outside link so always visible */}
          <div className="p-4 pt-0 flex space-x-2">
            <button
              onClick={() => handleEdit(v.id)}
              className="bg-primGreen text-white px-4 py-2 rounded hover:bg-sekGreen transition"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(v.id)}
              className="bg-redPrim text-white px-4 py-2 rounded hover:bg-redSek transition"
            >
              Slett
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
