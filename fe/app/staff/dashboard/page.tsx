'use client';

import React from 'react';
import Link from 'next/link';

const StaffDashboard = () => {
  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="logo">CineAdmin</div>
        <nav>
          <ul>
            <li>
              <Link href="/staff/dashboard">
                <button className="w-full py-2 px-4 bg-red-600 rounded-md">Dashboard</button>
              </Link>
            </li>
            <li>
              <Link href="/staff/movies">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Movies</button>
              </Link>
            </li>
            <li>
              <Link href="/staff/showtimes">
                <button className="w-full py-2 px-4 bg-gray-700 rounded-md">Showtimes</button>
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
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        <p className="text-lg text-gray-400 mb-6">Welcome back! Here's your cinema overview.</p>

        {/* Stats Section */}
        <div className="stats-container mb-6">
          <div className="stats-card">
            <div className="icon">💰</div>
            <h2>Total Revenue</h2>
            <p className="value">883.000 ₫</p>
            <p className="percentage">+12% from last week</p>
          </div>
          <div className="stats-card">
            <div className="icon">🎟️</div>
            <h2>Tickets Sold</h2>
            <p className="value">5</p>
            <p className="percentage">+8% from last week</p>
          </div>
          <div className="stats-card">
            <div className="icon">🎬</div>
            <h2>Active Movies</h2>
            <p className="value">3</p>
            <p className="percentage">Total Movies</p>
          </div>
          <div className="stats-card">
            <div className="icon">👥</div>
            <h2>Total Customers</h2>
            <p className="value">1,234</p>
            <p className="percentage">+5% from last week</p>
          </div>
        </div>

        {/* Recent Bookings & Top Performing Movies Section */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          {/* Recent Bookings */}
          <div className="bg-black p-6 rounded-lg">
            <h3 className="text-xl text-white mb-4">Recent Bookings</h3>
            <ul>
              <li className="text-white">
                <strong>Dune: Part Two</strong> - F5, F6 - 19:30 <span className="text-gray-400">CGV2024031501</span>
              </li>
              <li className="text-white">
                <strong>Kung Fu Panda 4</strong> - D3, D4, D5 - 11:30 <span className="text-gray-400">CGV2024030901</span>
              </li>
            </ul>
          </div>

          {/* Top Performing Movies */}
          <div className="bg-black p-6 rounded-lg">
            <h3 className="text-xl text-white mb-4">Top Performing Movies</h3>
            <ul>
              <li className="text-white">
                <strong>1. Dune: Part Two</strong> - 8.8 Rating
              </li>
              <li className="text-white">
                <strong>2. Godzilla x Kong</strong> - 7.5 Rating
              </li>
              <li className="text-white">
                <strong>3. Kung Fu Panda 4</strong> - 7.2 Rating
              </li>
              <li className="text-white">
                <strong>4. Deadpool 3</strong> - 0 Rating
              </li>
              <li className="text-white">
                <strong>5. Furiosa</strong> - 0 Rating
              </li>
            </ul>
          </div>
        </div>
      </div>

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

        .sidebar nav ul {
          list-style: none;
          padding: 0;
        }

        .sidebar nav ul li {
          margin-bottom: 10px;
        }

        .sidebar nav ul li a {
          color: white;
          text-decoration: none;
          font-size: 18px;
          display: block;
          padding: 10px;
          border-radius: 5px;
        }

        .sidebar nav ul li a:hover {
          background-color: #333;
        }

        .stats-container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .stats-card {
          background-color: #1f1f1f;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .stats-card .icon {
          font-size: 30px;
          color: #f00;
        }

        .stats-card h2 {
          font-size: 20px;
          margin-top: 10px;
        }

        .stats-card p {
          font-size: 18px;
          color: #a9a9a9;
          margin-top: 5px;
        }

        .stats-card .value {
          font-size: 32px;
          font-weight: bold;
          margin-top: 10px;
        }

        .stats-card .percentage {
          font-size: 14px;
          color: green;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .bg-black {
          background-color: #1f1f1f;
        }

        .rounded-lg {
          border-radius: 8px;
        }

        .p-6 {
          padding: 20px;
        }

        /* Adjust layout for smaller screens */
        @media (max-width: 768px) {
          .stats-container {
            grid-template-columns: 1fr 1fr;
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default StaffDashboard;
