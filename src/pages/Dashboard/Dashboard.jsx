import React, { useEffect, useState } from 'react';

export default function HostDashboard() {
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    const fetchProfile = async () => {

      setUsername(user);

      try {
        const res = await fetch(`${baseUrl}/profiles/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
          }
        });

        console.log('Response:', res);

        if (!res.ok) {
          throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
        }

        const json = await res.json();
        const data = json.data;
        setBannerUrl(data.banner.url);
        setAvatarUrl(data.avatar.url);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Banner */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      />

      <div className="container mx-auto px-4 pt-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{username}</h1>
            <p className="text-gray-600">{username}@holidaze.com</p>
          </div>
          <div className="ml-auto space-x-2">
            <button className="bg-green-700 text-white px-4 py-2 rounded">
              Host venue
            </button>
            <button className="bg-green-700 text-white px-4 py-2 rounded">
              Edit profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-8 border-b">
          <nav className="flex space-x-8">
            <button className="pb-2 border-b-2 border-green-700 text-green-700">
              Booking (0)
            </button>
            <button className="pb-2 text-gray-600">Venues (0)</button>
            <button className="pb-2 text-gray-600">
              Bookings to your venue (0)
            </button>
          </nav>
        </div>

        {/* Content Placeholder */}
        <div className="mt-6">
          <p className="text-gray-500">(Bookings and venue lists would appear here.)</p>
        </div>
      </div>
    </div>
  );
}

