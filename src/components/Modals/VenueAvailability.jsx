import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import Modal from "./Modal";
import DateRangeSelector from "./DateRangeSelector";

export default function VenueAvailability({
  isOpen,
  onClose,
  venueId,
  maxGuests,
}) {
  const [range, setRange] = useState({
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    key: "selection",
  });
  const [disabledRanges, setDisabledRanges] = useState([]);
  const [guests, setGuests] = useState(1);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const token = localStorage.getItem("accessToken");
  const baseUrl = "https://v2.api.noroff.dev/holidaze";
  const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;

  useEffect(() => {
    if (!isOpen) return;
    fetch(`${baseUrl}/venues/${venueId}/bookings`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Noroff-API-Key": `${API_KEY}`,
      },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((json) => {
        //console.log(json.data)
        setDisabledRanges(
          json.data.map((b) => ({
            startDate: new Date(b.dateFrom),
            endDate: new Date(b.dateTo),
          })),
        );
      })
      .catch(() => {
        setDisabledRanges([]);
      });
  }, [isOpen, venueId, token]);

  const handleBook = async () => {
    setError("");
    setSuccess("");
    const { startDate, endDate } = range;
    if (endDate <= startDate) {
      setError("“To” date must come after “From.”");
      return;
    }
    if (guests < 1 || guests > maxGuests) {
      setError(`Guests must be between 1 and ${maxGuests}.`);
      return;
    }

    try {
      const res = await fetch(`${baseUrl}/bookings`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": `${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          dateFrom: startDate.toISOString(),
          dateTo: endDate.toISOString(),
          guests,
          venueId,
        }),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(JSON.parse(txt).errors?.[0]?.message || res.statusText);
      }
      setSuccess("Booking confirmed!");
      setTimeout(onClose, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking">
      <div className="space-y-6">
        <p className="text-gray-600">When are you staying?</p>
        <DateRangeSelector
          range={range}
          onChange={(sel) => setRange(sel)}
          disabledRanges={disabledRanges}
        />

        <div>
          <label className="block font-medium">How many guests?</label>
          <input
            type="number"
            min={1}
            max={maxGuests}
            value={guests}
            onChange={(e) => setGuests(+e.target.value)}
            className="mt-1 w-full border rounded p-2"
          />
          <p className="text-xs text-gray-500">Max allowed: {maxGuests}</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-3 rounded">
            {success}
          </div>
        )}

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleBook}
            className="px-4 py-2 rounded bg-primGreen text-white hover:bg-sekGreen"
          >
            Book
          </button>
        </div>
      </div>
    </Modal>
  );
}
