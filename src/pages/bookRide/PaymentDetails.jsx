export default function PaymentDetails() {
    return (
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
    );
}