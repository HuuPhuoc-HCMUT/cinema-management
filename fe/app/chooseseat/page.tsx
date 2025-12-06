'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Importing Link from Next.js for navigation

const ChooseSeatPage = () => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  // Seat data with types like Standard, VIP, Sweetbox
  const seatRows = [
    { row: 'A', seats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
    { row: 'B', seats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
    { row: 'C', seats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
    { row: 'D', seats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
    { row: 'E', seats: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
  ];

  // Toggle seat selection on click
  const toggleSeatSelection = (seat: string) => {
    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat) // Remove from selected if already selected
        : [...prevSelectedSeats, seat] // Add to selected if not selected
    );
  };

  // Determine the seat's background color
  const getSeatColor = (seat: string) => {
    return selectedSeats.includes(seat) ? 'bg-red-600' : 'bg-gray-600'; // Red if selected, gray if not
  };

  return (
    <div className="container mx-auto p-6 bg-[#141414] text-white">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/chooseshowtime" passHref>
          <button className="flex items-center space-x-2 bg-gray-700 text-white py-2 px-6 rounded-md">
            <span className="text-xl">{'<'}</span>
            <span>Back to Showtimes</span>
          </button>
        </Link>
      </div>

      {/* Movie Info Section */}
      <div className="flex items-center bg-black p-6 rounded-lg mb-6">
        <img src="/path/to/movie-poster.jpg" alt="Dune: Part Two" className="w-32 h-48 object-cover mr-6" />
        <div className="movie-info">
          <h1 className="text-3xl font-semibold">Dune: Part Two</h1>
          <p className="text-lg text-gray-400">CGV Vincom Center - Cinema 1</p>
          <p className="text-sm text-gray-400">2024-03-15 | 10:00</p>
          <span className="bg-yellow-500 text-black py-1 px-3 rounded-md mt-2 inline-block">2D</span>
        </div>
      </div>

      {/* Screen Section */}
      <section className="mt-6 space-y-6">
        {/* Screen Label and Line */}
        <div className="text-center mb-6">
          <span className="bg-red-600 text-white py-1 px-3 rounded-full text-lg">SCREEN</span>
          <div className="h-1 mt-2 bg-red-600 w-1/4 mx-auto"></div>
        </div>

        {/* Seating Chart */}
        <div className="seating-chart">
          {seatRows.map((row) => (
            <div key={row.row} className="flex items-center justify-center mb-4">
              <span className="text-white mr-2">{row.row}</span>
              {row.seats.map((seat) => (
                <button
                  key={`${row.row}${seat}`} // Make sure the key is unique for each seat
                  onClick={() => toggleSeatSelection(`${row.row}${seat}`)} // Toggle seat selection with row and seat number
                  className={`w-12 h-12 m-2 rounded-md ${getSeatColor(`${row.row}${seat}`)} hover:opacity-80`}
                >
                  {seat}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Seat Type Information */}
        <div className="mt-6 text-white text-center">
          <div className="flex justify-center space-x-4 mb-4">
            <div className="bg-gray-600 w-6 h-6 rounded-md"></div>
            <span>Standard</span>
            <div className="bg-yellow-500 w-6 h-6 rounded-md"></div>
            <span>VIP</span>
            <div className="bg-purple-500 w-6 h-6 rounded-md"></div>
            <span>Sweetbox</span>
          </div>
          <div className="mt-4 text-gray-400">
            <p>Sweetsbox: Premium couple seats with extra legroom</p>
            <p>VIP: Best viewing angle with recliner seats</p>
          </div>
        </div>

        {/* Selected Seats Display */}
        <div className="mt-6 text-center text-gray-400">
          <div className="flex justify-center items-center space-x-2">
            <div className="bg-red-600 w-6 h-6 rounded-md"></div>
            <span>Selected</span>
          </div>
          <p className="mt-2">{selectedSeats.length} seats selected</p>
        </div>

        {/* Continue Button */}
        <div className="mt-6 text-center">
          <Link href="/combo">
            <button className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
              Continue ({selectedSeats.length} seats selected)
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ChooseSeatPage;
