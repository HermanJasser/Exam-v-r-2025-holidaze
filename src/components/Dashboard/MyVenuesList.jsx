import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Loading from "../Loading";
import Modal from "../Modals/Modal";

export default function MyVenuesList() {
  const navigate = useNavigate();
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteId, setToDeleteId] = useState(null);

  const token = localStorage.getItem("accessToken");
  const user = localStorage.getItem("username");
  const baseUrl = "https://v2.api.noroff.dev/holidaze";
  const API_KEY = import.meta.env.VITE_NOROFF_API_KEY;

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const res = await fetch(`${baseUrl}/profiles/${user}/venues`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": `${API_KEY}`,
          },
        });
        if (!res.ok) throw new Error(`Error ${res.status}`);
        const { data } = await res.json();
        setVenues(data);
      } catch (err) {
        console.error(err);
        setError("Could not load your venues.");
      } finally {
        setLoading(false);
      }
    };
    fetchVenues();
  }, [user, token]);

  const handleEdit = (id) => {
    navigate(`/dashboard/editvenue/${id}`);
  };

  const handleDeleteClick = (id) => {
    setToDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`${baseUrl}/venues/${toDeleteId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": `${API_KEY}`,
        },
      });
      if (!res.ok) throw new Error("Delete failed");
      setVenues((v) => v.filter((venue) => venue.id !== toDeleteId));
    } catch (err) {
      console.error(err);
    } finally {
      setConfirmOpen(false);
      setToDeleteId(null);
    }
  };

  if (loading)
    return (
      <p>
        <Loading />
      </p>
    );
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {venues.map((v) => (
          <div
            key={v.id}
            className="bg-white shadow hover:shadow-lg hover:scale-[1.01] transition overflow-hidden flex flex-col"
          >
            <Link
              to={`/venue/${v.id}`}
              className="block focus:outline-none focus:ring-2 focus:ring-primGreen"
            >
              <img
                src={v.media[0]?.url || "/assets/placeholder-image.jpg"}
                alt={v.media[0]?.alt || v.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 flex flex-col h-full">
                <p className="text-textSek text-sm">
                  {v.location.city}, {v.location.country}
                </p>
                <h2 className="mt-1 font-semibold text-lg text-textPrim">
                  {v.name}
                </h2>
                <p className="text-textSek text-sm mt-1">{v.maxGuests} beds</p>
                <div className="pt-2">
                  <span className="font-bold text-textPrim">{v.price} kr</span>
                  <span className="text-textSek text-sm"> / Night</span>
                </div>
              </div>
            </Link>
            <div className="p-4 pt-0 flex space-x-2">
              <button
                onClick={() => handleEdit(v.id)}
                className="bg-primGreen text-white px-4 py-2 rounded hover:bg-sekGreen transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteClick(v.id)}
                className="bg-redPrim text-white px-4 py-2 rounded hover:bg-redSek transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete venue?"
      >
        <p>Are you sure you want to delete your venue?</p>
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
