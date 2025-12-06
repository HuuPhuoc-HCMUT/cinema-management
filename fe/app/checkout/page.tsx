'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const CheckoutPage = () => {
  // Sample data for the order
  const orderSummary = {
    movie: 'Godzilla x Kong',
    theater: 'CGV Vincom Center',
    cinema: 'Cinema 3',
    date: '2024-03-15',
    time: '15:00',
    seats: ['G10', 'G9'],
    ticketsPrice: 240000,
  };

  // State for payment method
  const [paymentMethod, setPaymentMethod] = useState('credit');

  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(e.target.value);
  };

  // Calculate the total price
  const totalAmount = orderSummary.ticketsPrice;

  return (
    <div className="container mx-auto p-6 bg-[#141414] text-white">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/combo" passHref>
          <button className="flex items-center space-x-2 bg-gray-700 text-white py-2 px-6 rounded-md">
            <span className="text-xl">{'<'}</span>
            <span>Back to Combo</span>
          </button>
        </Link>
      </div>

      {/* Checkout Header */}
      <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
      <p className="text-lg text-gray-400 mb-4">Complete your booking</p>

      {/* Flex container for Order Summary and Payment */}
      <div className="flex justify-between space-x-6">
        {/* Left section (Order Summary) */}
        <section className="bg-black p-6 rounded-lg flex-1">
          <h3 className="text-xl text-white mb-4">Order Summary</h3>
          <div className="flex items-center mb-4">
            <img src="/path/to/movie-poster.jpg" alt={orderSummary.movie} className="w-32 h-48 object-cover mr-6" />
            <div className="movie-info">
              <h4 className="text-xl font-bold">{orderSummary.movie}</h4>
              <p className="text-sm text-gray-400">{orderSummary.theater} - {orderSummary.cinema}</p>
              <p className="text-sm text-gray-400">{orderSummary.date} | {orderSummary.time}</p>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="flex justify-between mb-4">
            <span className="text-white">Tickets (2x)</span>
            <span className="text-white">{totalAmount.toLocaleString()} ₫</span>
          </div>

          {/* Seats Section */}
          <div className="flex justify-between mb-4">
            <span className="text-white">Seats</span>
            <span className="text-white">{orderSummary.seats.join(', ')}</span>
          </div>

          {/* Subtotal Section */}
          <div className="flex justify-between mb-4">
            <span className="text-white">Subtotal</span>
            <span className="text-white">{totalAmount.toLocaleString()} ₫</span>
          </div>
        </section>

        {/* Right section (Payment Method & Total) */}
        <section className="bg-black p-6 rounded-lg flex-1">
          <h3 className="text-xl text-white mb-4">Payment Method</h3>
          <div className="space-y-4">
            <div className={`flex items-center p-4 border rounded-md ${paymentMethod === 'qrpay' ? 'bg-red-600' : 'bg-gray-700'}`}>
              <input
                type="radio"
                name="paymentMethod"
                id="qrpay"
                value="qrpay"
                checked={paymentMethod === 'qrpay'}
                onChange={handlePaymentMethodChange}
                className="mr-4"
              />
              <label htmlFor="qrpay" className="text-white text-lg">QR Pay</label>
            </div>
            <div className={`flex items-center p-4 border rounded-md ${paymentMethod === 'ewallet' ? 'bg-red-600' : 'bg-gray-700'}`}>
              <input
                type="radio"
                name="paymentMethod"
                id="ewallet"
                value="ewallet"
                checked={paymentMethod === 'ewallet'}
                onChange={handlePaymentMethodChange}
                className="mr-4"
              />
              <label htmlFor="ewallet" className="text-white text-lg">E-Wallet (MoMo, ZaloPay, VNPay)</label>
            </div>
            <div className={`flex items-center p-4 border rounded-md ${paymentMethod === 'credit' ? 'bg-red-600' : 'bg-gray-700'}`}>
              <input
                type="radio"
                name="paymentMethod"
                id="creditcard"
                value="credit"
                checked={paymentMethod === 'credit'}
                onChange={handlePaymentMethodChange}
                className="mr-4"
              />
              <label htmlFor="creditcard" className="text-white text-lg">Credit Card (Visa, MasterCard)</label>
            </div>
          </div>

          {/* Total and Pay Button */}
          <div className="text-center mt-6">
            <div className="text-white text-xl mb-4">
              Total: {totalAmount.toLocaleString()} ₫
            </div>
            {/* Link to Booking Confirmation page */}
            <Link href="/bookingconfirm">
              <button className="px-6 py-3 bg-red-600 rounded-lg text-white font-semibold hover:opacity-90 transition">
                Pay {totalAmount.toLocaleString()} ₫
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default CheckoutPage;
