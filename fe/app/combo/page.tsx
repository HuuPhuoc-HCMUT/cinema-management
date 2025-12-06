'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Importing Link from Next.js for navigation

const ComboPage = () => {
  // Define the combo items with their prices and descriptions
  const combos = [
    {
      name: 'Single Combo',
      description: 'Perfect for solo movie goers',
      price: 79000,
      items: ['1 Medium Popcorn', '1 Medium Drink'],
      quantity: 0,
    },
    {
      name: 'Couple Combo',
      description: 'Share the moment together',
      price: 139000,
      items: ['1 Large Popcorn', '2 Medium Drinks'],
      quantity: 0,
    },
    {
      name: 'Family Combo',
      description: 'Fun for the whole family',
      price: 219000,
      items: ['2 Large Popcorns', '4 Medium Drinks', '1 Nachos'],
      quantity: 0,
    },
    {
      name: 'Premium Snack Box',
      description: 'Elevated cinema experience',
      price: 169000,
      items: ['1 Caramel Popcorn', '2 Premium Drinks', '1 Hot Dog'],
      quantity: 0,
    },
  ];

  // State for tracking combo quantities
  const [selectedCombos, setSelectedCombos] = useState(combos);

  // Handle increasing or decreasing combo quantity
  const handleQuantityChange = (index: number, change: number) => {
    setSelectedCombos((prevCombos) => {
      const updatedCombos = [...prevCombos];
      const updatedQuantity = updatedCombos[index].quantity + change;
      updatedCombos[index].quantity = Math.max(0, updatedQuantity);
      return updatedCombos;
    });
  };

  // Calculate total price based on selected combos
  const calculateTotal = () => {
    return selectedCombos.reduce((total, combo) => total + combo.price * combo.quantity, 0);
  };

  return (
    <div className="container mx-auto p-6 bg-[#141414] text-white">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/chooseseat" passHref>
          <button className="flex items-center space-x-2 bg-gray-700 text-white py-2 px-6 rounded-md">
            <span className="text-xl">{'<'}</span>
            <span>Back to Seats</span>
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

      {/* Combo Section */}
      <section className="combo-selection space-y-6">
        <h3 className="text-xl text-white mb-4">Select Combo</h3>

        {/* Render all combo items */}
        <div className="combo-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {selectedCombos.map((combo, index) => (
            <div key={index} className="combo-card bg-[#1d1d1d] p-6 rounded-lg shadow-md">
              <h4 className="text-lg font-bold text-white">{combo.name}</h4>
              <p className="text-gray-400">{combo.description}</p>
              <ul className="list-disc text-gray-400 ml-6 mt-2">
                {combo.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="flex items-center mt-4">
                <span className="text-lg text-white mr-4">{combo.price.toLocaleString()} ₫</span>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(index, -1)} // Decrease quantity by 1
                    className="px-3 py-1 bg-gray-600 rounded-md text-white"
                  >
                    -
                  </button>
                  <span className="text-white">{combo.quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(index, 1)} // Increase quantity by 1
                    className="px-3 py-1 bg-gray-600 rounded-md text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Price and Checkout Button */}
        <div className="mt-6 text-center">
          <div className="text-white text-xl mb-4">
            Total: {calculateTotal().toLocaleString()} ₫
          </div>
          <Link href="/checkout">
            <button className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
              Continue to Checkout
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ComboPage;
