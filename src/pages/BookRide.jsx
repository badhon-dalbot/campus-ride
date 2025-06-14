import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Clock, User } from 'lucide-react';

export default function RideBookingApp() {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [message, setMessage] = useState('');

  return (
    <div className="min-h-screen bg-[#E8F1F1] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2 text-gray-600" />
            <span className="text-gray-600 text-sm">Back to ride details</span>
          </div>
          <h1 className="text-xl font-semibold text-gray-800">Book Your Ride</h1>
          <div></div>
        </div>

        <div className="flex gap-6">
          {/* Left Column */}
          <div className="flex-1 space-y-4">
            {/* Ride Summary */}
            <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
              <h2 className="text-base font-semibold mb-4 text-gray-800">Ride Summary</h2>
              
              {/* Driver Info */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800 text-sm">John Doe</div>
                    <div className="text-xs text-gray-600 flex items-center">
                      ⭐ 4.6 · 35 trips
                    </div>
                  </div>
                </div>
                <div className="text-base font-bold text-gray-800">৳150</div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Trip Details */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPin className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-gray-800">Pickup</div>
                      <div className="text-xs text-gray-600">UIU campus</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <MapPin className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-gray-800">Drop Off</div>
                      <div className="text-xs text-gray-600">Dhanmondi</div>
                    </div>
                  </div>
                </div>

                {/* Date and Time */}
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-gray-800">Date</div>
                      <div className="text-xs text-gray-600">Today</div>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="w-3 h-3 text-gray-600 mr-2 mt-0.5" />
                    <div>
                      <div className="text-xs font-medium text-gray-800">Time</div>
                      <div className="text-xs text-gray-600">4:30 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Message to Driver */}
            <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Message to Driver</h3>
              <textarea
                placeholder="Let the driver know if you have any special request"
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-16 text-sm bg-white mb-3"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex justify-end">
                <button className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                  Send
                </button>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
              <h3 className="text-base font-semibold mb-3 text-gray-800">Payment method</h3>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                  <div className="relative mr-3">
                    <div className="w-5 h-5 border-2 border-black rounded-full bg-white flex items-center justify-center">
                      {paymentMethod === 'credit' && (
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === 'credit'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-gray-800 text-sm">Credit/Debit card</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                  <div className="relative mr-3">
                    <div className="w-5 h-5 border-2 border-black rounded-full bg-white flex items-center justify-center">
                      {paymentMethod === 'mobile' && (
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="mobile"
                    checked={paymentMethod === 'mobile'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-gray-800 text-sm">Mobile banking</span>
                </label>
                
                <label className="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer bg-white hover:bg-gray-50">
                  <div className="relative mr-3">
                    <div className="w-5 h-5 border-2 border-black rounded-full bg-white flex items-center justify-center">
                      {paymentMethod === 'cash' && (
                        <div className="w-2.5 h-2.5 bg-black rounded-full"></div>
                      )}
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="sr-only"
                  />
                  <span className="text-gray-800 text-sm">Cash</span>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column - Price Details */}
          <div className="w-64">
            <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
              <h3 className="text-base font-semibold mb-4 text-gray-800">Price Details</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Ride fare</span>
                  <span className="text-gray-800 font-medium text-sm">৳150</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Service fee</span>
                  <span className="text-gray-800 font-medium text-sm">৳15</span>
                </div>
                
                <hr className="border-gray-400 my-2" />
                
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-800 text-sm">Total</span>
                  <span className="font-bold text-gray-800 text-sm">৳165</span>
                </div>
              </div>

              <button className="w-full bg-gray-800 text-white py-2.5 rounded-lg font-medium hover:bg-gray-900 transition-colors mb-3 text-sm">
                Confirm and pay
              </button>
              
              <p className="text-xs text-gray-600 text-center leading-tight">
                By confirming you agree to the CampusRide terms of service and cancellation policy
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}