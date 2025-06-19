import React from 'react';
import { Star, User } from 'lucide-react';

const RideDetailsCard = ({ currentRide, tipAmount }) => {
  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm overflow-hidden">
      <div className="p-6 text-white" style={{background: 'linear-gradient(to right, #17252A, #0f1a1e)'}}>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1">Ride Completed</h3>
            <p className="text-gray-200">Ready for payment</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">৳{currentRide.fare.total + tipAmount}</div>
            <div className="text-gray-200 text-sm">Total Amount</div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {/* Driver Info */}
        <div className="flex items-center gap-4 mb-6 p-4 bg-gray-100 rounded-lg">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-gray-600" />
          </div>
          <div className="flex-1">
            <div className="font-semibold text-gray-900">{currentRide.driver.name}</div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{currentRide.driver.rating}</span>
              <span>•</span>
              <span>{currentRide.driver.phone}</span>
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="mb-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="flex flex-col items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div className="w-0.5 h-8 bg-gray-300"></div>
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <div className="font-medium text-gray-900">{currentRide.route.from}</div>
                <div className="text-sm text-gray-500">Pickup location</div>
              </div>
              <div>
                <div className="font-medium text-gray-900">{currentRide.route.to}</div>
                <div className="text-sm text-gray-500">Drop-off location</div>
              </div>
            </div>
            <div className="text-right text-sm text-gray-600">
              <div>{currentRide.route.distance}</div>
              <div>{currentRide.route.duration}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RideDetailsCard;