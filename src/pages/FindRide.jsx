import React, { useState, useEffect } from 'react';
import { ChevronLeft, MapPin, Calendar, Clock, Star } from 'lucide-react';

import CampusRideFooter from '../assets/CampusRideFooter.jsx';
import CampusRideHeader from '../assets/CampusRideHeader.jsx';

export default function FindRide() {
  const [filters, setFilters] = useState({
    date: '',
    minPrice: '',
    maxPrice: '',
    departureTime: 'Any time',
    rating: [],
    seats: 'Apply Any'
  });

  const resetFilters = () => {
    setFilters({
      date: '',
      minPrice: '',
      maxPrice: '',
      departureTime: 'Any time',
      rating: [],
      seats: 'Apply Any'
    });
  };

  const [rides, setRides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/rides/available")
      .then(response => response.json())
      .then(data => {
        console.log("Fetched rides:", data);
        setRides(data);
      })
      .catch(error => {
        console.error("Error fetching rides:", error);
      });
  }, []);
  console.log(rides);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasPartialStar = rating % 1 !== 0;

    // Render full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`full-${i}`}
          size={14}
          className="text-[#E04F5F]"
          fill="#E04F5F"
        />
      );
    }

    // Render partial star if needed
    if (hasPartialStar) {
      const partialPercentage = Math.round((rating % 1) * 100);
      stars.push(
        <div key="partial" className="relative inline-block">
          <Star
            size={14}
            className="text-gray-300"
            fill="none"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${partialPercentage}%` }}
          >
            <Star
              size={14}
              className="text-[#E04F5F]"
              fill="#E04F5F"
            />
          </div>
        </div>
      );
    }

    // Render empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star
          key={`empty-${i}`}
          size={14}
          className="text-gray-300"
          fill="none"
        />
      );
    }

    return stars;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full width, no margins */}
      <CampusRideHeader />

      {/* Main Content - With page margins */}
      <div className="flex-1 px-6 pl-20" style={{ backgroundColor: '#DEEEED' }}>
        {/* Back button */}
        <div className="py-4 flex items-center gap-3">
          <button onClick={() => window.history.back()} className="flex items-center gap-3 hover:opacity-70 transition-opacity">
            <ChevronLeft size={24} className="font-semibold" />
            <span className="text-lg font-medium">Back to home</span>
          </button>
        </div>

        <div className="py-3">
          <h1 className="text-3xl font-bold">Find Ride</h1>
        </div>

        <div className="flex gap-14">
          {/* Sidebar */}
          <div className="w-80 py-4">
            <div className="rounded-2xl shadow-lg p-6 border border-gray-300 mb-6" style={{ backgroundColor: '#FAFFFF' }}>
              {/* Filters Header */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-xl font-bold">Filters</span>
                <button onClick={resetFilters} className="text-sm font-medium text-gray-600 hover:text-gray-800">Reset</button>
              </div>

              {/* Date */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 block mb-2">Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={filters.date}
                    onChange={(e) => setFilters({ ...filters, date: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm placeholder-gray-500 border border-gray-200"
                    style={{ backgroundColor: '#DEEEED' }}
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 block mb-2">Price Range</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Min"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-center placeholder-gray-500 border border-gray-200"
                      style={{ backgroundColor: '#DEEEED' }}
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Max"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg text-sm text-center placeholder-gray-500 border border-gray-200"
                      style={{ backgroundColor: '#DEEEED' }}
                    />
                  </div>
                </div>
              </div>

              {/* Departure Time */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 block mb-2">Departure Time</label>
                <div className="relative">
                  <select
                    value={filters.departureTime}
                    onChange={(e) => setFilters({ ...filters, departureTime: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none pr-8 border border-gray-200"
                    style={{ backgroundColor: '#DEEEED' }}
                  >
                    <option>Any time</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                  <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Driver Rating */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 block mb-2">Driver Rating</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={filters.rating.includes('5+')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, rating: [...filters.rating, '5+'] })
                        } else {
                          setFilters({ ...filters, rating: filters.rating.filter(r => r !== '5+') })
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">5+</span>
                    <div className="flex">
                      {renderStars(5)}
                    </div>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={filters.rating.includes('4+')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, rating: [...filters.rating, '4+'] })
                        } else {
                          setFilters({ ...filters, rating: filters.rating.filter(r => r !== '4+') })
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">4+</span>
                    <div className="flex">
                      {renderStars(4)}
                    </div>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300"
                      checked={filters.rating.includes('3+')}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, rating: [...filters.rating, '3+'] })
                        } else {
                          setFilters({ ...filters, rating: filters.rating.filter(r => r !== '3+') })
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">3+</span>
                    <div className="flex">
                      {renderStars(3)}
                    </div>
                  </label>
                </div>
              </div>

              {/* Seats Available */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-gray-900 block mb-2">Seats Available</label>
                <div className="relative">
                  <select
                    value={filters.seats}
                    onChange={(e) => setFilters({ ...filters, seats: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-lg text-sm appearance-none pr-8 border border-gray-200"
                    style={{ backgroundColor: '#DEEEED' }}
                  >
                    <option>Apply Any</option>
                    <option>1 Seat</option>
                    <option>2 Seats</option>
                    <option>3+ Seats</option>
                  </select>
                  <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Apply Filter Button */}
              <button
                onClick={() => alert('Filters applied!')}
                className="w-full py-3 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                Apply Filter
              </button>
            </div>

            {/* UIU — Farmgate Card */}
            <div className="rounded-2xl p-6 shadow-lg border border-gray-100" style={{ backgroundColor: '#FFFFFF' }}>
              {/* Title */}
              <div className="text-center mb-4">
                <h2 className="text-lg font-black text-black">UIU → Farmgate</h2>
              </div>

              {/* Discount */}
              <div className="text-left mb-4">
                <p className="text-sm font-bold">
                  <span className="text-black">( </span>
                  <span className="text-red-500 font-black text-base">25%</span>
                  <span className="text-black"> off for UIU</span>
                </p>
                <p className="text-sm font-bold">
                  <span className="text-black">Students )</span>
                </p>
              </div>

              {/* Driver Info */}
              <div className="flex items-start gap-3 mb-4">
                <img
                  src="https://i.pravatar.cc/150?img=11"
                  alt="Sayed Hasan Sami"
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-bold text-sm text-black mb-1">Sayed Hasan Sami</p>
                  <div className="flex">
                    {renderStars(4.5)}
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={() => alert('Booking special UIU ride!')}
                  className="flex-1 py-3 bg-black text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors"
                >
                  Book Ride
                </button>
                <button
                  onClick={() => alert('Contacting Sayed Hasan Sami')}
                  className="flex-1 py-3 bg-white border border-gray-300 text-black rounded-xl text-sm font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 py-4 pr-4">
            {/* From/To/Search Buttons */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button className="px-6 py-2.5 border-2 border-gray-200 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-sm hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FFFFFF' }}>
                <svg width="16" height="18" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 13.5 8 20 8 20C8 20 16 13.5 16 8C16 3.58 12.42 0 8 0ZM8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 11 6.34 11 8C11 9.66 9.66 11 8 11Z" fill="#6B7280" />
                </svg>
                <span>From</span>
              </button>
              <button className="px-6 py-2.5 rounded-lg flex items-center gap-2 text-sm font-semibold shadow-sm border-2 border-gray-200 hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FFFFFF' }}>
                <svg width="16" height="18" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 0C3.58 0 0 3.58 0 8C0 13.5 8 20 8 20C8 20 16 13.5 16 8C16 3.58 12.42 0 8 0ZM8 11C6.34 11 5 9.66 5 8C5 6.34 6.34 5 8 5C9.66 5 11 6.34 11 8C11 9.66 9.66 11 8 11Z" fill="#6B7280" />
                </svg>
                <span>To</span>
              </button>
              <button
                onClick={() => alert('Searching for rides...')}
                className="px-8 py-2.5 bg-gray-900 text-white rounded-lg flex items-center gap-2 text-sm font-semibold hover:bg-gray-800 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M14 14L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span>Search</span>
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Available Rides</h2>
              <select className="px-4 py-2 border rounded-lg text-sm font-medium shadow-sm hover:bg-gray-50 transition-colors" style={{ backgroundColor: '#FFFFFF' }}>
                <option>Newest First</option>
              </select>
            </div>

            {/* Ride Cards */}
            <div className="space-y-4 max-w-3xl">
              {rides.map((ride) => (
                <div key={ride.ride_id} className="rounded-xl p-4 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow w-full" style={{ backgroundColor: '#FFFFFF' }}>
                  <h3 className="font-bold text-base mb-3">
                    {ride.start_location} → {ride.destination}
                  </h3>
                  <div className="flex items-center gap-6 text-sm text-gray-600 mb-3">
                    <span className="flex items-center gap-2 font-medium">
                      <Calendar size={16} />
                      <span>{ride.ride_date.substring(0, 10)}</span>
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <Clock size={16} />
                      <span>
                        {ride.ride_time
                          ? new Date(`2025-06-15T${ride.ride_time}Z`).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                          })
                          : 'N/A'
                        }
                      </span>
                    </span>
                    <span className="flex items-center gap-2 font-medium">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>{ride.seats_available} seats</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4 font-normal leading-relaxed">
                    {ride.pickup_description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://i.pravatar.cc/150?u=${ride.driver_first_name}`}
                        alt={ride.driver_first_name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">{ride.driver_first_name} {ride.driver_last_name}</p>
                        <div className="flex items-center gap-1">
                          {renderStars(ride.driver_rating)}
                          {/* {ride.review_count} tips */}
                          {/* This things are not available on the Database. */}
                          {/* At first i have to add this things on Database then i can use it. */}
                          <span className="text-xs text-gray-500 ml-1 font-normal">({ride.review_count} tips)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 flex-shrink-0">
                      <button
                        onClick={() => alert(`Booking ride with ${ride.driver_first_name} ${ride.driver_last_name}`)}
                        className="px-6 py-2 bg-black text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Book Ride
                      </button>
                      <button
                        onClick={() => alert(`Contacting ${ride.driver_first_name} ${ride.driver_last_name}`)}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-black hover:bg-gray-50 transition-colors flex items-center justify-center"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 mt-8 max-w-3xl">
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Previous</button>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 bg-black text-white rounded text-sm font-medium">1</button>
                <button className="w-8 h-8 text-sm font-medium hover:bg-gray-100 transition-colors rounded">2</button>
                <button className="w-8 h-8 text-sm font-medium hover:bg-gray-100 transition-colors rounded">3</button>
                <span className="px-2 text-sm font-normal">...</span>
                <button className="w-8 h-8 text-sm font-medium hover:bg-gray-100 transition-colors rounded">10</button>
              </div>
              <button className="text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Full width, no margins */}
      <CampusRideFooter />
    </div>
  );
}