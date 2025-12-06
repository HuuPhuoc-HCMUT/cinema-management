'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const ShowtimesPage = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [showtimeData, setShowtimeData] = useState({
    movie: '',
    theater: '',
    date: '',
    time: '',
    format: '2D',
    price: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setShowtimeData({
      ...showtimeData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(showtimeData);  // Log data (you can replace this with actual API call later)
    setShowModal(false);  // Close modal after submission
  };

  // Showtime Data with added movies and showtimes
  const showtimes = [
    {
      movie: 'Dune: Part Two',
      theater: 'CGV Vincom Center',
      date: '2024-03-15',
      time: '10:00',
      format: '2D',
      price: '85.000 ₫',
      seatsLeft: 80,
    },
    {
      movie: 'Dune: Part Two',
      theater: 'CGV Vincom Center',
      date: '2024-03-15',
      time: '13:30',
      format: 'IMAX',
      price: '150.000 ₫',
      seatsLeft: 120,
    },
    {
      movie: 'Dune: Part Two',
      theater: 'CGV Vincom Center',
      date: '2024-03-15',
      time: '16:00',
      format: '2D',
      price: '85.000 ₫',
      seatsLeft: 95,
    },
    {
      movie: 'Dune: Part Two',
      theater: 'CGV Vincom Center',
      date: '2024-03-15',
      time: '19:30',
      format: 'IMAX',
      price: '150.000 ₫',
      seatsLeft: 45,
    },
    {
      movie: 'Dune: Part Two',
      theater: 'Lotte Cinema Landmark',
      date: '2024-03-15',
      time: '11:00',
      format: '2D',
      price: '80.000 ₫',
      seatsLeft: 100,
    },
    {
      movie: 'Dune: Part Two',
      theater: 'Lotte Cinema Landmark',
      date: '2024-03-15',
      time: '14:30',
      format: '3D',
      price: '100.000 ₫',
      seatsLeft: 88,
    },
    {
      movie: 'Godzilla x Kong',
      theater: 'CGV Vincom Center',
      date: '2024-03-15',
      time: '12:00',
      format: '4DX',
      price: '180.000 ₫',
      seatsLeft: 60,
    },
    {
      movie: 'Godzilla x Kong',
      theater: 'CGV Vincom Center',
      date: '2024-03-15',
      time: '15:00',
      format: '2D',
      price: '85.000 ₫',
      seatsLeft: 75,
    },
    {
      movie: 'Kung Fu Panda 4',
      theater: 'Galaxy Cinema',
      date: '2024-03-15',
      time: '09:00',
      format: '2D',
      price: '75.000 ₫',
      seatsLeft: 70,
    },
    {
      movie: 'Kung Fu Panda 4',
      theater: 'Galaxy Cinema',
      date: '2024-03-15',
      time: '11:30',
      format: '2D',
      price: '75.000 ₫',
      seatsLeft: 65,
    },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">CineAdmin</div>
        <nav>
          <ul>
            <li>
              <Link href="/staff/dashboard">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Dashboard</button>
              </Link>
            </li>
            <li>
              <Link href="/staff/movies">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Movies</button>
              </Link>
            </li>
            <li>
              <Link href="/staff/showtimes">
                <button className="w-full py-2 px-4 bg-red-600 rounded-md">Showtimes</button>
              </Link>
            </li>
            <li>
              <Link href="/staff/bookings">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Bookings</button>
              </Link>
            </li>
            <li>
              <Link href="/staff/customers">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Customers</button>
              </Link>
            </li>
            {/* Add Combos link here */}
            <li>
              <Link href="/staff/combos">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Combos</button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-[#141414] text-white p-6">
        <h1 className="text-3xl font-semibold mb-6">Showtimes</h1>
        <p className="text-lg text-gray-400 mb-6">Manage movie schedules and screenings</p>

        {/* Add Showtime Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowModal(true)}  // Show modal when clicked
            className="px-6 py-3 bg-red-600 text-white rounded-lg"
          >
            + Add Showtime
          </button>
        </div>

        {/* Showtime Table */}
        <table className="showtime-table w-full text-left text-gray-400">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="py-3 px-4">Movie</th>
              <th className="py-3 px-4">Theater</th>
              <th className="py-3 px-4">Date & Time</th>
              <th className="py-3 px-4">Format</th>
              <th className="py-3 px-4">Price</th>
              <th className="py-3 px-4">Seats</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {showtimes.map((showtime, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="py-3 px-4 text-white">{showtime.movie}</td>
                <td className="py-3 px-4">{showtime.theater}</td>
                <td className="py-3 px-4">{showtime.date} - {showtime.time}</td>
                <td className="py-3 px-4">{showtime.format}</td>
                <td className="py-3 px-4">{showtime.price}</td>
                <td className="py-3 px-4">{showtime.seatsLeft} left</td>
                <td className="py-3 px-4">
                  <button className="text-yellow-400 mr-4">Edit</button>
                  <button className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Add Showtime */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="text-2xl font-semibold mb-4">Add New Showtime</h2>
            <form onSubmit={handleSubmit}>
              {/* Movie Dropdown */}
              <div className="form-group mb-4">
                <label className="block text-white mb-2">Movie</label>
                <select
                  name="movie"
                  value={showtimeData.movie}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                >
                  <option value="">Select movie</option>
                  <option value="Dune: Part Two">Dune: Part Two</option>
                  <option value="Godzilla x Kong">Godzilla x Kong</option>
                  <option value="Kung Fu Panda 4">Kung Fu Panda 4</option>
                </select>
              </div>

              {/* Theater Dropdown */}
              <div className="form-group mb-4">
                <label className="block text-white mb-2">Theater</label>
                <select
                  name="theater"
                  value={showtimeData.theater}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                >
                  <option value="">Select theater</option>
                  <option value="CGV Vincom Center">CGV Vincom Center</option>
                  <option value="Lotte Cinema Landmark">Lotte Cinema Landmark</option>
                  <option value="Galaxy Cinema">Galaxy Cinema</option>
                </select>
              </div>

              {/* Date Input */}
              <div className="form-group mb-4">
                <label className="block text-white mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={showtimeData.date}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              {/* Time Input */}
              <div className="form-group mb-4">
                <label className="block text-white mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={showtimeData.time}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              {/* Format Dropdown */}
              <div className="form-group mb-4">
                <label className="block text-white mb-2">Format</label>
                <select
                  name="format"
                  value={showtimeData.format}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                >
                  <option value="2D">2D</option>
                  <option value="3D">3D</option>
                  <option value="IMAX">IMAX</option>
                  <option value="4DX">4DX</option>
                </select>
              </div>

              {/* Price Input */}
              <div className="form-group mb-4">
                <label className="block text-white mb-2">Price (VND)</label>
                <input
                  type="number"
                  name="price"
                  value={showtimeData.price}
                  onChange={handleChange}
                  className="w-full p-3 bg-gray-700 text-white rounded-md"
                  required
                />
              </div>

              {/* Submit and Cancel Buttons */}
              <div className="flex justify-between mb-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-red-600 text-white rounded-lg"
                >
                  Add Showtime
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .sidebar {
          width: 250px;
          min-width: 250px;
          background-color: #141414;
          color: white;
          padding: 20px;
          display: flex;
          flex-direction: column;
        }

        .logo {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }

        .modal-content {
          background-color: #222;
          padding: 30px;
          border-radius: 8px;
          width: 400px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          color: white;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px;
          background-color: #333;
          color: white;
          border: 1px solid #555;
          border-radius: 8px;
        }

        .bg-gray-700 {
          background-color: #333;
        }

        .bg-red-600 {
          background-color: #e53e3e;
        }

        .bg-gray-500 {
          background-color: #6b7280;
        }

        .text-white {
          color: white;
        }

        .rounded-lg {
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default ShowtimesPage;
