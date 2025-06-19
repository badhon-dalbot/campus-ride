import React from 'react';
import { Car, CheckCircle } from 'lucide-react';

const PaymentHistory = ({ recentRides }) => {
  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm">
      <div className="p-6 border-b border-gray-300">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-900">Payment History</h3>
          <select className="px-4 py-2 border border-gray-400 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {recentRides.map((ride) => (
          <div key={ride.id} className="p-6 transition-colors hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-teal-700" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{ride.route}</div>
                  <div className="text-sm text-gray-500">
                    Driver: {ride.driver} • {ride.date}
                  </div>
                  <div className="text-xs text-green-600">Paid via {ride.method}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-bold text-lg text-gray-900">৳{ride.amount}</div>
                <div className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  Paid
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;