import { useState } from 'react';
import { CalendarDays, Clock, MapPin, Users, Car, AlertCircle, Shield, Eye, MessageSquare, UserCheck, Info } from 'lucide-react';

import CampusRideFooter from '../assets/CampusRideFooter.jsx';
import CampusRideHeader from '../assets/CampusRideHeader.jsx';

export default function OfferRideForm() {
  const [formData, setFormData] = useState({
    departure: 'United International University',
    destination: 'Hemayetpur',
    date: '',
    time: '',
    stops: '',
    seats: '1 Seat',
    price: '300.00',
    vehicle: 'Prius, Veal, Corolla',
    notes: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header - Full width, no margins */}
      <CampusRideHeader />
      
      {/* Main Content - With page margins */}
      <div className="flex-1 p-4" style={{backgroundColor: '#EBF5F5'}}>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Offer a Ride</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Ride Details Card */}
              <div className="rounded-lg p-6" style={{backgroundColor: '#D7E5E5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ride Details</h2>
                <p className="text-sm text-gray-700 mb-6">Fill in the basic details of your journey to find passengers.</p>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3">Route Information:</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Departure Location
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={formData.departure}
                            onChange={(e) => handleInputChange('departure', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            placeholder="e.g. United International University"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Destination
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            value={formData.destination}
                            onChange={(e) => handleInputChange('destination', e.target.value)}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            placeholder="e.g. Hemayetpur"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">
                            Date
                          </label>
                          <div className="relative">
                            <CalendarDays className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              type="date"
                              value={formData.date}
                              onChange={(e) => handleInputChange('date', e.target.value)}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-900 mb-2">
                            Departure Time
                          </label>
                          <div className="relative">
                            <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <input
                              type="time"
                              value={formData.time}
                              onChange={(e) => handleInputChange('time', e.target.value)}
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">
                          Stops along the way (Optional)
                        </label>
                        <textarea
                          value={formData.stops}
                          onChange={(e) => handleInputChange('stops', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          rows="2"
                          placeholder="List any stops you are willing to make"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Ride Details Card */}
              <div className="rounded-lg p-6" style={{backgroundColor: '#D7E5E5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ride Details</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Available Seats
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <select
                        value={formData.seats}
                        onChange={(e) => handleInputChange('seats', e.target.value)}
                        className="w-full pl-10 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                      >
                        <option>1 Seat</option>
                        <option>2 Seats</option>
                        <option>3 Seats</option>
                        <option>4 Seats</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Price Per Seat (৳)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="300.00"
                      step="0.01"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Vehicle Information
                  </label>
                  <div className="relative">
                    <Car className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      value={formData.vehicle}
                      onChange={(e) => handleInputChange('vehicle', e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      placeholder="e.g. Prius, Veal, Corolla"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-bold text-gray-900 mb-2">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    rows="3"
                    placeholder="Any additional information passengers should know"
                  />
                </div>

                <button className="w-full mt-6 bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 transition duration-200 font-medium">
                  Publish Ride
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6 flex flex-col">
              {/* Guidelines Card */}
              <div className="rounded-lg p-6 flex-1" style={{backgroundColor: '#D7E5E5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Guidelines</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Be clear about your departure time and meeting point.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Set a fair price that covers your gas and vehicle costs.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Provide accurate vehicle information to help passengers identify your car.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Respond promptly to booking requests and messages.</p>
                  </div>
                </div>
              </div>

              {/* Safety Tips Card */}
              <div className="rounded-lg p-6 flex-1" style={{backgroundColor: '#D7E5E5', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'}}>
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="h-5 w-5 mr-2" style={{color: '#5A9B9B'}} />
                  Safety Tips
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <UserCheck className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Only accept passengers with verified university profile details.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MessageSquare className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Share your trip details with a friend or family member.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Eye className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Make pickup/drop-offs in public, well-lit areas.</p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <AlertCircle className="h-5 w-5 mt-0.5 flex-shrink-0" style={{color: '#5A9B9B'}} />
                    <p className="text-base text-gray-800 font-medium">Trust your instinct and cancel if you feel uncomfortable.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer - Full width, no margins */}
      <CampusRideFooter />
    </div>
  );
}