import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";
import Modal from "../Modals/Modal";

export default function MyBookings() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const username = localStorage.getItem("username");
  const token = localStorage.getItem("accessToken");
  const baseUrl = "https://v2.api.noroff.dev/holidaze";
  const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch(
          `${baseUrl}/profiles/${username}/bookings?_venue=true`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "X-Noroff-API-Key": `${API_KEY}`,
            },
          },
        );
        if (!res.ok) throw new Error(`Feil ${res.status}`);
        const json = await res.json();
        setBookings(json.data);
      } catch (err) {
        console.error(err);
        setError("Kunne ikke laste dine bookinger.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [username, token]);

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${baseUrl}/bookings/${toDeleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": `${API_KEY}`,
        },
      });
      if (!res.ok) throw new Error("Sletting mislyktes");
      setBookings((bs) => bs.filter((b) => b.id !== toDeleteId));
    } catch (err) {
      console.error(err);
      alert("Kunne ikke slette bookingen.");
    } finally {
      setConfirmOpen(false);
      setToDeleteId(null);
    }
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-600">{error}</p>;
  if (bookings.length === 0) return <p>You have no bookings</p>;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((b) => (
          <div key={b.id} className="bg-white shadow flex flex-col">
            <img
              src={b.venue?.media?.[0]?.url || "/assets/placeholder-image.jpg"}
              alt={b.venue?.name || "Venue image"}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-xl font-semibold mb-1 truncate">
                {b.venue.name}
              </h2>
              <p className="text-gray-600 text-sm">
                {new Date(b.dateFrom).toLocaleDateString("no-NO")} –{" "}
                {new Date(b.dateTo).toLocaleDateString("no-NO")}
              </p>
              <p className="text-gray-800 font-bold mt-2">
                {b.guests} guest(s)
              </p>
              <div className="mt-auto flex space-x-2 pt-4">
                <button
                  onClick={() => handleDeleteClick(b.id)}
                  className="bg-redPrim text-white px-4 py-2 rounded hover:bg-redSek transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete booking?"
      >
        <p>Are you sure you want to delete this booking?</p>
        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={() => setConfirmOpen(false)}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 rounded bg-redPrim text-white hover:bg-redSek"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
}
