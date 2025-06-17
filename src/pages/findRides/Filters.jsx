import { useState } from 'react';
import { renderStars } from './renderStar.jsx';
export default function Filters() {
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

    
    return (
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
    );
}