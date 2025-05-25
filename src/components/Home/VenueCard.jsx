import React from 'react';

export default function VenueCard({ venue }) {
  const { id, media, location, name, maxGuests, price } = venue;
  const imageUrl = media?.[0]?.url;
  const imageAlt = media?.[0]?.alt || name;


  const src = imageUrl || '/assets/placeholder-image.jpg';

  return (
    <a
      href={`/venue/${id}`}
      className="block bg-white shadow hover:shadow-lg hover:scale-[1.01] transition focus:outline-none focus:ring-2 focus:ring-primGreen overflow-hidden"
    >
    
      <img
        src={src}
        alt={imageUrl ? imageAlt : 'No image available'}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col">

        <p className="text-textSek text-sm">
          {location.city}, {location.country}
        </p>

 
        <h2 className="mt-1 font-semibold text-lg text-textPrim truncate">
          {name}
        </h2>


        <p className="text-textSek text-sm mt-1">
          {maxGuests} beds
        </p>

    
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
