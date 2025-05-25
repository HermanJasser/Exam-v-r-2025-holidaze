import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import VenueAvailability from '../../components/Modals/VenueAvailability';
import Loading from '../../components/Loading';
import { LuWifi, LuParkingMeter, LuCoffee, LuDog } from 'react-icons/lu';

export default function SingleVenue() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isBookOpen, setIsBookOpen] = useState(false);
  const username = localStorage.getItem('username');
  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    fetch(`https://v2.api.noroff.dev/holidaze/venues/${id}?_owner=true`,)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(json => {
        setVenue(json.data);
        //console.log(json.data);
        setCurrentIndex(0);
      })
      .catch(err => {
        console.error(err);
        setError('Could not fetch venue details.');
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-center py-10 mb-[1000px]"><Loading /></div>;
  if (error)   return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!venue)  return <div className="text-center py-10">Venue not found.</div>;

  const { media = [], name, description, price, maxGuests, meta = {}, location = {}, owner } = venue;


   const hasMedia = Array.isArray(media) && media.length > 0;

  

  const amenities = [
    { key: 'wifi', label: 'WiFi', icon: LuWifi },
    { key: 'parking', label: 'Parking', icon: LuParkingMeter },
    { key: 'breakfast', label: 'Breakfast', icon: LuCoffee },
    { key: 'pets', label: 'Pets allowed', icon: LuDog },
  ];

  return (
    <div className="max-w-4xl mx-auto my-20 p-4 space-y-8">
  
      <div>
        {hasMedia ? (
          <>
            <img
              src={media[currentIndex].url}
              alt={media[currentIndex].alt || name}
              className="w-full sm:h-[600px] h-[400px] object-cover"
            />
            {media.length > 1 && (
              <div className="grid grid-cols-4 gap-4 mt-4">
                {media.map((item, idx) => (
                  <img
                    key={item.url}
                    src={item.url}
                    alt={item.alt || `${name} image ${idx + 1}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={`w-full sm:h-32 h-24 object-cover cursor-pointer ${idx === currentIndex ? 'border-2 border-primGreen' : ''}`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <img
            src="/assets/placeholder-image.jpg"
            alt="No images available"
            className="w-full sm:h-[600px] h-[400px] object-cover"
          />
        )}
      </div>

    
      <div className="flex flex-col  justify-between items-start">
     
          <p className="text-sm text-gray-500 capitalize">
            {location.city}, {location.country}
          </p>
          <h1 className="text-4xl font-bold text-textPrim mt-1 max-w-full whitespace-normal break-words">{name}</h1>
          <p className="text-textSek mt-2">
            {maxGuests} Guest{maxGuests > 1 ? 's' : ''}
          </p>
          <p className="mt-4 text-2xl font-semibold text-textPrim">
            {price} NOK <span className="text-base font-normal text-textSek">/ Night</span>
          </p>
    
          {token && (
          <button 
        onClick={() => setIsBookOpen(true)}
        className="mt-6  px-8 py-3 bg-primGreen text-primBG font-medium rounded-lg">
          Check availability
        </button>)}

        <VenueAvailability
     isOpen={isBookOpen}
      onClose={() => setIsBookOpen(false)}
      venueId={id}
    maxGuests={venue.maxGuests} />
      </div>

      <hr />

     
      <div>
        <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
        <div className="grid grid-cols-2 gap-6">
          {amenities.map(({ key, label, icon: Icon }) => {
            const available = Boolean(meta[key]);
            return (
              <div
                key={key}
                className={`flex items-center space-x-2 ${!available ? 'opacity-50 line-through' : ''}`}
              >
                <Icon size={20} />
                <span>{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <hr />

  
      <div>
        <h2 className="text-2xl font-semibold mb-4">About</h2>
        <p className="text-textPrim leading-relaxed overflow-hidden">{description}</p>
      </div>

      <hr />

  
      {owner && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Venue manager</h2>
          <div className="flex items-center space-x-4">
            {owner.avatar && (
              <img
                src={owner.avatar.url}
                alt={owner.avatar.alt || `${owner.name}'s avatar`}
                className="w-14 h-14 rounded-full object-cover"
              />
            )}
            <span className="text-lg font-medium text-gray-800">
              {owner.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
