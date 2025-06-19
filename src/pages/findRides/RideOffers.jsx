import { renderStars } from './renderStar.jsx';
export default function RideOffers() {

   
    return (
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
    );
}