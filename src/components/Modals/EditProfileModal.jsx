import React from "react";
import Modal from "./Modal";

export default function EditProfileModal({
  isOpen,
  onClose,
  bannerUrl,
  avatarUrl,
  venueManager,
  onBannerChange,
  onAvatarChange,
  onVenueManagerChange,
  onSave,
  errorMessage,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Profile">
      <div className="w-full max-w-xl mx-auto space-y-6">
        {errorMessage && (
          <div className="bg-red-100 text-redPrim p-3 rounded mb-4">
            {errorMessage}
          </div>
        )}

        <label className="block mb-4 w-[500px]"> </label>
        <span className="block font-medium text-textPrim">Banner URL</span>
        <input
          type="text"
          value={bannerUrl}
          onChange={(e) => onBannerChange(e.target.value)}
          className="w-full border rounded p-2"
        />

        <label className="block mb-4 w-[500px]"></label>
        <span className="block font-medium text-textPrim">Avatar URL</span>
        <input
          type="text"
          value={avatarUrl}
          onChange={(e) => onAvatarChange(e.target.value)}
          className="w-full border rounded p-2"
        />

        <label className="inline-flex items-center mb-6">
          <input
            type="checkbox"
            checked={venueManager}
            onChange={(e) => onVenueManagerChange(e.target.checked)}
            className="form-checkbox h-5 w-5 text-primGreen"
          />
          <span className="ml-2 text-gray-700">Enable venue listing</span>
        </label>

        <div className="flex flex-col space-y-4 mx-auto ">
          <button
            onClick={onSave}
            className="px-4 py-2 rounded bg-primGreen text-white hover:bg-sekGreen transition"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="self-start mx-auto text-redPrim underline hover:text-redSek hover:no-underline transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
