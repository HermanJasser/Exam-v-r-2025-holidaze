import React, { useEffect, useState } from 'react';
import EditProfileModal from '../../components/Modals/EditProfileModal';

export default function HostDashboard() {
  const [bannerUrl, setBannerUrl] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [venueManager, setVenueManager] = useState(false);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // separate error for modal
  const [modalError, setModalError] = useState('');

  // form inputs for EditProfileModal
  const [bannerInput, setBannerInput] = useState('');
  const [avatarInput, setAvatarInput] = useState('');
  const [venueManagerInput, setVenueManagerInput] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    const fetchProfile = async () => {
      if (!token || !user) {
        setError('Missing authentication. Please log in.');
        return;
      }
      setUsername(user);

      try {
        const res = await fetch(`${baseUrl}/profiles/${user}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
          }
        });
        if (!res.ok) throw new Error(`Failed to fetch profile: ${res.status}`);
        const { data } = await res.json();

        setBannerUrl(data.banner.url);
        setAvatarUrl(data.avatar.url);
        setEmail(data.email);
        setVenueManager(data.venueManager);
      } catch (err) {
        console.error(err);
        setError('Could not load profile data.');
      }
    };

    fetchProfile();
  }, []);

  const openEditModal = () => {
    setBannerInput(bannerUrl);
    setAvatarInput(avatarUrl);
    setVenueManagerInput(venueManager);
    setModalError('');
    setIsModalOpen(true);
  };

  const saveProfile = async () => {
    const token = localStorage.getItem('accessToken');
    const user = localStorage.getItem('username');
    const baseUrl = 'https://v2.api.noroff.dev/holidaze';

    try {
      const res = await fetch(`${baseUrl}/profiles/${user}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397'
        },
        body: JSON.stringify({
          banner: { url: bannerInput },
          avatar: { url: avatarInput },
          venueManager: venueManagerInput
        })
      });
      if (!res.ok) {
        const errorText = await res.text();
        const apiMessage = JSON.parse(errorText).errors?.[0]?.message || `Status ${res.status}`;
        //console.log(apiMessage);
        throw new Error(apiMessage);
        

      }

      setBannerUrl(bannerInput);
      setAvatarUrl(avatarInput);
      setVenueManager(venueManagerInput);
      setIsModalOpen(false);
    } catch (err) {
      //console.error(err);
      setModalError(err.message || 'Failed to update profile.');
    }
  };

  return (
    <div className="min-h-screen bg-white relative">

      {/* Banner */}
      <div
        className="h-96 bg-cover bg-center max-w-screen-xl mx-auto"
        style={{ backgroundImage: `url(${bannerUrl})` }}
      />

      <div className="container max-w-screen-xl mt-[-100px] mx-auto px-4 pt-6">
        <div className="flex flex-col md:items-end md:justify-between md:flex-row">
          <div className='flex items-end space-x-4 '>
            <img src={avatarUrl} alt="Avatar" className="w-[150px] h-[150px] rounded-full object-cover" />
            <div>
              <h1 className="md:text-2xl text-xl font-bold">{username}</h1>
              <p className="text-gray-600 text-sm md:text-md">{email}</p>
            </div>
          </div>
          <div className="md:ml-auto md:mx-0 mx-auto my-8 md:my-0 space-x-2">
          <a
            href="/dashboard/hostvenue"
            className="inline-flex items-center justify-center bg-primGreen hover:bg-sekGreen transition text-white px-4 py-2 rounded"
          >
            Host venue
          </a>
          <button
            onClick={openEditModal}
            className="inline-flex items-center justify-center bg-primGreen hover:bg-sekGreen transition text-white px-4 py-2 rounded"
          >
            Edit profile
          </button>

          </div>
        </div>

        <div className="mt-8 border-b">
          <nav className="flex space-x-8">
            <button className="pb-2 border-b-2 border-green-700 text-green-700">Booking (0)</button>
            <button className="pb-2 text-gray-600">Venues (0)</button>
            <button className="pb-2 text-gray-600">Bookings to your venue (0)</button>
          </nav>
        </div>

        <div className="mt-6">
          <p className="text-gray-500">(Bookings and venue lists would appear here.)</p>
        </div>
      </div>

      {/* Use EditProfileModal component */}
      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        bannerUrl={bannerInput}
        avatarUrl={avatarInput}
        venueManager={venueManagerInput}
        onBannerChange={setBannerInput}
        onAvatarChange={setAvatarInput}
        onVenueManagerChange={setVenueManagerInput}
        onSave={saveProfile}
        errorMessage={modalError}
      />
    </div>
  );
}

