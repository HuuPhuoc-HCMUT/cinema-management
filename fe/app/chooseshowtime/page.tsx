'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Importing Link component for navigation

const ChooseShowtimePage = () => {
  const [selectedDate, setSelectedDate] = useState<string>('15 Mar');
  const [selectedTheater, setSelectedTheater] = useState<string>('All Theaters');

  const theaters = [
    {
      name: 'CGV Vincom Center',
      location: 'District 1, Ho Chi Minh City',
      showtimes: [
        { time: '10:00', format: '2D', price: '85.000 ₫', seatsLeft: 80, hall: 'Cinema 1' },
        { time: '13:30', format: 'IMAX', price: '150.000 ₫', seatsLeft: 120, hall: 'Cinema 2' },
        { time: '16:00', format: '2D', price: '85.000 ₫', seatsLeft: 95, hall: 'Cinema 1' },
        { time: '19:30', format: 'IMAX', price: '150.000 ₫', seatsLeft: 45, hall: 'Cinema 2' },
      ],
    },
    {
      name: 'Lotte Cinema Landmark',
      location: 'Binh Thanh District',
      showtimes: [
        { time: '11:00', format: '2D', price: '80.000 ₫', seatsLeft: 100, hall: 'Hall A' },
        { time: '14:30', format: '3D', price: '100.000 ₫', seatsLeft: 88, hall: 'Hall B' },
      ],
    },
    {
      name: 'Galaxy Cinema',
      location: 'Tan Binh District',
      showtimes: [
        { time: '12:00', format: '2D', price: '90.000 ₫', seatsLeft: 75, hall: 'Cinema A' },
        { time: '15:00', format: '3D', price: '110.000 ₫', seatsLeft: 100, hall: 'Cinema B' },
      ],
    },
  ];

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleTheaterChange = (theater: string) => {
    setSelectedTheater(theater);
  };

  return (
    <div className="container mx-auto p-6 bg-[#141414] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-black text-white rounded-lg mb-6">
        <h1 className="text-3xl font-semibold">Dune: Part Two</h1>
        <div className="movie-info text-sm">
          <span className="bg-yellow-500 text-black py-1 px-3 rounded-md">2D | 3D | IMAX</span>
        </div>
      </header>

      {/* Showtime Section */}
      <section className="showtime-selection space-y-6">
        {/* Date Selector */}
        <div className="date-selector">
          <h3 className="text-xl text-white mb-4">Select Date</h3>
          <div className="date-options flex space-x-4">
            {['15 Mar', '16 Mar', '17 Mar', '18 Mar', '19 Mar', '20 Mar', '21 Mar'].map((date) => (
              <button
                key={date}
                className={`px-6 py-3 rounded-lg font-semibold border transition-colors duration-200 ease-in-out ${
                  selectedDate === date ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'
                }`}
                onClick={() => handleDateChange(date)}
              >
                {date}
              </button>
            ))}
          </div>
        </div>

        {/* Theater Selector */}
        <div className="theater-selector">
          <h3 className="text-xl text-white mb-4">Select Theater</h3>
          <div className="theater-options flex space-x-4">
            {['All Theaters', ...theaters.map((theater) => theater.name)].map((theaterName) => (
              <button
                key={theaterName}
                className={`px-6 py-3 rounded-lg font-semibold border transition-colors duration-200 ease-in-out ${
                  selectedTheater === theaterName ? 'bg-red-600 text-white' : 'bg-gray-700 text-white'
                }`}
                onClick={() => handleTheaterChange(theaterName)}
              >
                {theaterName}
              </button>
            ))}
          </div>
        </div>

        {/* Available Showtimes */}
        <div className="available-showtimes space-y-6">
          <h3 className="text-xl mb-4 text-white">Available Showtimes</h3>
          {theaters
            .filter((theater) => selectedTheater === 'All Theaters' || theater.name === selectedTheater)
            .map((theater, index) => (
              <div key={index} className="theater-showtimes bg-[#1d1d1d] p-6 rounded-lg shadow-md mb-6">
                <h4 className="text-lg text-white font-bold">{theater.name}</h4>
                <p className="text-sm text-gray-400">{theater.location}</p>
                <div className="showtime-cards flex space-x-4 mt-4 overflow-x-auto">
                  {theater.showtimes.map((showtime, idx) => (
                    <Link
                      key={idx}
                      href={{
                        pathname: '/chooseseat',
                        query: {
                          theater: theater.name,
                          time: showtime.time,
                          format: showtime.format,
                          price: showtime.price,
                          hall: showtime.hall,
                        },
                      }}
                      className="showtime-card bg-[#2a2a2a] p-4 rounded-lg border border-[#444] w-40"
                    >
                      <div className="text-white text-lg font-semibold">{showtime.time}</div>
                      <div className="text-sm text-gray-400">{showtime.format}</div>
                      <div className="text-sm text-gray-400">{showtime.hall}</div>
                      <div className="mt-2 text-white font-semibold">{showtime.price}</div>
                      <div className="text-sm text-gray-400">{showtime.seatsLeft} seats left</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
};

export default ChooseShowtimePage;
