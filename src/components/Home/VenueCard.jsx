// src/components/VenueCard.jsx
import React from 'react';

export default function VenueCard({ venue }) {
  const { id, media, location, name, maxGuests, price } = venue;
  const imageUrl = media?.[0]?.url;
  const imageAlt = media?.[0]?.alt || name;

  return (
    <a
      href={`/venue/${id}`}
      className="block bg-white hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-primGreen overflow-hidden"
    >
      {/* Bilde */}
      {imageUrl && (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-full h-48 object-cover"
        />
      )}

      <div className="p-4 flex flex-col">
        {/* By, land */}
        <p className="text-textSek text-sm">
          {location.city}, {location.country}
        </p>

        {/* Navn */}
        <h2 className="mt-1 font-semibold text-lg text-textPrim">
          {name}
        </h2>

        {/* Maks gjester */}
        <p className="text-textSek text-sm mt-1">
          {maxGuests} beds
        </p>

        {/* Pris */}
        <div className="mt-auto pt-2">
          <span className="font-bold text-textprim">
            {price} kr
          </span>
          <span className="text-textSek text-sm"> / Night</span>
        </div>
      </div>
    </a>
  );
}
