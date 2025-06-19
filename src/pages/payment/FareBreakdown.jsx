import React from 'react';

const FareBreakdown = ({ currentRide, tipAmount, setTipAmount }) => {
  const suggestedTips = [0, 20, 50, 100];

  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm p-6">
      {/* Fare Breakdown */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Fare Breakdown</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Base fare</span>
            <span>৳{currentRide.fare.base}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance ({currentRide.route.distance})</span>
            <span>৳{currentRide.fare.distance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Time ({currentRide.route.duration})</span>
            <span>৳{currentRide.fare.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Service fee</span>
            <span>৳{currentRide.fare.serviceFee}</span>
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>৳{currentRide.fare.total}</span>
          </div>
        </div>
      </div>

      {/* Tip Section */}
      <div className="border-t border-gray-200 pt-6 mb-6">
        <h4 className="font-semibold text-gray-900 mb-4">Add Tip (Optional)</h4>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {suggestedTips.map((tip) => (
            <button
              key={tip}
              onClick={() => setTipAmount(tip)}
              className={`p-3 rounded-lg border font-medium transition-all ${
                tipAmount === tip
                  ? 'border-gray-900 text-gray-900'
                  : 'border-gray-400'
              }`}
              style={tipAmount === tip ? {backgroundColor: '#EBF5F5'} : {}}
            >
              {tip === 0 ? 'No tip' : `৳${tip}`}
            </button>
          ))}
        </div>
        <input
          type="number"
          placeholder="Custom tip amount"
          value={tipAmount || ''}
          onChange={(e) => setTipAmount(Number(e.target.value) || 0)}
          className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
      </div>

      {/* Total */}
      {tipAmount > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center text-lg font-bold">
            <span>Total with tip</span>
            <span style={{color: '#17252A'}}>৳{currentRide.fare.total + tipAmount}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default FareBreakdown;