
import React from 'react';
import { LuSearch } from 'react-icons/lu';
import ListVenues from './ListVenues';

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
        <ListVenues />
    </div>

    </div>
  );
}
