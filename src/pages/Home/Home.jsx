
import React from 'react';
import { LuSearch } from 'react-icons/lu';

export default function Home() {
  return (
    <div className="">
    <div className="relative h-screen pt-[80px] overflow-hidden mt-[-80px]">
      {/* 1) Bakgrunnsbildet */}
      <img
        src="/assets/norwegian-valley.jpeg"
        alt="norwegian valley"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 2) Overlay */}
      <div className=" mt-[-80px] relative z-10 flex flex-col items-center justify-center h-full px-4">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center text-[#013659]">
          Search for your dream destination
        </h1>

        <form className="w-full max-w-2xl mt-8 flex shadow-lg bg-white rounded overflow-hidden">
          <input
            type="text"
            placeholder="Where to?"
            className="flex-grow px-4 py-3 text-lg outline-none"
          />
          <button
            type="submit"
            className="px-6 flex items-center justify-center"
          >
            <LuSearch className="text-2xl text-primGreen" />
          </button>
        </form>
      </div>
    </div>

    <div>
        <div className="container mx-auto text-center py-16">
            <h2 className="text-4xl font-bold mb-8">Discover Amazing Venues</h2>
            <p className="text-lg text-gray-600 mb-4">
            Explore a curated list of stunning venues for your next event.
            </p>
            <button className="bg-primGreen text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 transition duration-300">
            View Venues
            </button>
        </div>
    </div>

    </div>
  );
}
