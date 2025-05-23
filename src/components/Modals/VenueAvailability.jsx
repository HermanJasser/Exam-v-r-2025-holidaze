import React, { useState } from 'react';
import Modal from './Modal'; // your existing modal wrapper

export default function VenueAvailability({ 
  isOpen, 
  onClose, 
  venueId, 
  maxGuests 
}) {
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo]       = useState('');
  const [guests, setGuests]       = useState(1);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');
  const token = localStorage.getItem('accessToken');
  const baseUrl = 'https://v2.api.noroff.dev/holidaze';

  const handleApply = async () => {
    setError(''); 
    setSuccess('');

    if (!dateFrom || !dateTo) {
      setError('Vennligst velg både fra- og til-dato.');
      return;
    }
    if (new Date(dateTo) <= new Date(dateFrom)) {
      setError('Til-dato må være etter fra-dato.');
      return;
    }
    if (guests < 1 || guests > maxGuests) {
      setError(`Antall gjester må være mellom 1 og ${maxGuests}.`);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/bookings`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Noroff-API-Key': '3d9461d4-d476-4b79-8364-62104fda6397',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          dateFrom,
          dateTo,
          guests,
          venueId
        })
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(JSON.parse(txt).errors?.[0]?.message || res.statusText);
      }
      setSuccess('Booking bekreftet!');
      // optionally close after a delay:
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking">
      <div className="space-y-6">
        {/* Dates */}
        <div>
          <h3 className="font-medium">When are you staying?</h3>
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={e => setDateFrom(e.target.value)}
                className="mt-1 border rounded p-2"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600">To</label>
              <input
                type="date"
                value={dateTo}
                onChange={e => setDateTo(e.target.value)}
                className="mt-1 border rounded p-2"
              />
            </div>
          </div>
        </div>

        {/* Guests */}
        <div>
          <h3 className="font-medium">How many guests?</h3>
          <input
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={e => setGuests(Number(e.target.value))}
            className="mt-2 w-full border rounded p-2"
          />
          <p className="text-sm text-gray-500 mt-1">
            Max allowed: {maxGuests}
          </p>
        </div>

        {/* Error / Success */}
        {error && <div className="text-red-700 bg-red-100 p-3 rounded">{error}</div>}
        {success && <div className="text-green-700 bg-green-100 p-3 rounded">{success}</div>}

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 rounded bg-black text-white hover:bg-gray-900"
          >
            Apply
          </button>
        </div>
      </div>
    </Modal>
  );
}
