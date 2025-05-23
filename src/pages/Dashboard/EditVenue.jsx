import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditVenue() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('accessToken');
  const baseUrl = 'https://v2.api.noroff.dev/holidaze';

  const [images, setImages] = useState(['']);
  const [name, setName] = useState('');
  const [maxGuests, setMaxGuests] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [amenities, setAmenities] = useState({ wifi: false, parking: false, breakfast: false, pets: false });
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${baseUrl}/venues/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397',
      },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
        return res.json();
      })
      .then(data => {
        const v = data.data;
        setName(v.name);
        setMaxGuests(v.maxGuests.toString());
        setPrice(v.price.toString());
        setAddress(v.location.address);
        setCity(v.location.city);
        setCountry(v.location.country);
        setDescription(v.description);
        setImages(v.media.map(m => m.url));
        setAmenities(v.meta);
      })
      .catch(err => setError(err.message));
  }, [id]);

  const isValidUrl = url => {
    try { new URL(url); return true; } catch { return false; }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (images.some(u => !u.trim() || !isValidUrl(u))) {
      setError('One or more image URLs are invalid.');
      return;
    }

    const body = {
      name,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests),
      media: images.map(u => ({ url: u, alt: '' })),
      location: { address, city, country },
      meta: amenities,
    };

    try {
      const res = await fetch(`${baseUrl}/venues/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || res.statusText);
      }
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const toggleAmenity = key => setAmenities(a => ({ ...a, [key]: !a[key] }));

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold mb-4">Edit venue</h1>
      <hr className="border-green-700 mb-6" />

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Images */}
        <div className="flex flex-col">
          <h2 className="font-semibold mb-2">Images</h2>
          {images.map((url, i) => (
            <div key={i} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Image ${i + 1} URL`}
                value={url}
                onChange={e => setImages(imgs => imgs.map((u,j) => j === i ? e.target.value : u))}
                className="flex-grow border rounded p-2"
                required
              />
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => setImages(imgs => imgs.filter((_, j) => j !== i))}
                  className="ml-2 text-white bg-redPrim px-3 py-1 rounded hover:bg-redSek transition"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              if (isValidUrl(images[images.length - 1])) setImages(imgs => [...imgs, '']);
            }}
            disabled={!isValidUrl(images[images.length - 1])}
            className={`text-primGreen underline mx-auto hover:text-sekGreen transition hover:no-underline ${
              !isValidUrl(images[images.length - 1]) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Add image
          </button>
        </div>

        {/* Basic Info */}
        <div>
          <label className="block mb-1 font-medium">Venue name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Number of guests</label>
          <input
            type="number"
            value={maxGuests}
            onChange={e => setMaxGuests(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Location */}
        <div>
          <h2 className="font-semibold mb-2">Location</h2>
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={e => setAddress(e.target.value)}
              className="border rounded p-2 flex-1"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={e => setCity(e.target.value)}
              className="border rounded p-2 flex-1"
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="border rounded p-2 flex-1"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full border rounded p-2 h-32"
            required
          />
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="w-32 border rounded p-2"
            required
          />
          <span>kr per night</span>
        </div>

        {/* Amenities */}
        <div>
          <h2 className="font-semibold mb-2">Amenities</h2>
          <div className="flex flex-wrap gap-4">
            {Object.entries(amenities).map(([key, val]) => (
              <label key={key} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={val}
                  onChange={() => toggleAmenity(key)}
                  className="form-checkbox h-5 w-5 text-green-700"
                />
                <span className="capitalize">{key === 'pets' ? 'Pets allowed' : key}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col space-y-4 pt-6">
          <button
            type="submit"
            className="px-4 py-2 w-[300px] mx-auto rounded bg-primGreen text-white hover:bg-sekGreen transition"
          >
            Save
          </button>
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="self-start mx-auto text-redPrim underline hover:text-redSek transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
