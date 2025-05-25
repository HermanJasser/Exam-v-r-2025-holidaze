import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function HostVenue() {
  const token = localStorage.getItem("accessToken");
  const username = localStorage.getItem("username");
  const baseUrl = "https://v2.api.noroff.dev/holidaze";
  const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;


  const [images, setImages] = useState([""]);
  const [name, setName] = useState("");
  const [maxGuests, setMaxGuests] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [amenities, setAmenities] = useState({
    wifi: false,
    parking: false,
    breakfast: false,
    pets: false,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const addImageField = () => {
    const last = images[images.length - 1];
    if (isValidUrl(last)) setImages((imgs) => [...imgs, ""]);
  };

  const removeImageField = (idx) => {
    setImages((imgs) => imgs.filter((_, i) => i !== idx));
  };

  const updateImage = (idx, url) => {
    setImages((imgs) => imgs.map((u, i) => (i === idx ? url : u)));
  };

  const toggleAmenity = (key) => {
    setAmenities((a) => ({ ...a, [key]: !a[key] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");


    const trimmed = images.filter((u) => u.trim());
    const invalidImage = trimmed.find((url) => !isValidUrl(url));
    if (invalidImage) {
      setError("One or more image URLs are invalid. Please correct them.");
      return;
    }

    if (!token || !username) {
      setError("You must be logged in to host a venue.");
      return;
    }

  
    const mediaPayload = trimmed.map((url) => ({ url, alt: "" }));

    const body = {
      name,
      description,
      price: Number(price),
      maxGuests: Number(maxGuests),
      media: mediaPayload,
      location: { address, city, country },
      meta: amenities,
    };

    try {
      const res = await fetch(`${baseUrl}/venues`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": `${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errorText = await res.text();
        const apiMessage = JSON.parse(errorText).errors?.[0]?.message || `Status ${res.status}`;
        throw new Error(apiMessage);
      }
      setSuccess("Venue created successfully!");
      
      navigate("/dashboard");
     


    } catch (err) {
      console.error(err);
      setError(`Failed to create venue: ${err.message}`);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col space-y-6">
      <h1 className="text-3xl font-bold mb-4">Host venue</h1>
      <hr className="border-green-700 mb-6" />


      <form onSubmit={handleSubmit} className="space-y-6">
       
        <div className="flex flex-col">
          <h2 className="font-semibold mb-2">Images</h2>
          {images.map((url, i) => (
            <div key={i} className="flex items-center mb-2">
              <input
                type="text"
                placeholder={`Image ${i + 1} URL`}
                value={url}
                onChange={(e) => updateImage(i, e.target.value)}
                className="flex-grow border rounded p-2"
                required
              />
              {i > 0 && (
                <button
                  type="button"
                  onClick={() => removeImageField(i)}
                  className="ml-2 text-white bg-redPrim px-3 py-1 rounded hover:bg-redSek transition"
                >
                  X
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addImageField}
            disabled={!isValidUrl(images[images.length - 1])}
            className={`text-primGreen text-xl underline mx-auto hover:text-sekGreen transition hover:no-underline ${
              !isValidUrl(images[images.length - 1])
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Add image
          </button>
        </div>

        
        <div>
          <label className="block mb-1 font-medium">Venue name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Number of guests</label>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        {/* Location */}
        <div>
          <h2 className="font-semibold mb-2">Location</h2>
          <div className="flex flex-col w-[300px] sm:w-auto sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border rounded p-2 flex-1"
              required
            />
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border rounded p-2 flex-1"
              required
            />
            <input
              type="text"
              placeholder="Country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="border rounded p-2 flex-1"
              required
            />
          </div>
        </div>


        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2 h-32"
            required
          />
        </div>

    
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-32 border rounded p-2"
            required
          />
          <span>kr per night</span>
        </div>


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
                <span className="capitalize">{key === "pets" ? "Pets allowed" : key}</span>
              </label>
            ))}
          </div>
        </div>


      {error && <div className="mb-4 p-3 bg-red-100 text-red-700">{error}</div>}
      {success && <div className="mb-4 p-3 bg-green-100 text-green-700">{success}</div>}

       
        <div className="flex flex-col space-y-4 pt-6">
          <button
            type="submit"
            className="px-4 py-2 w-[300px] rounded mx-auto bg-primGreen text-white hover:bg-sekGreen transition"
          >
            Post
          </button>
          <a href="/dashboard" className="self-start mx-auto text-redPrim underline hover:text-redSek hover:no-underline transition ">
            Cancel
          </a>
        </div>
      </form>
    </div>
  );
}
