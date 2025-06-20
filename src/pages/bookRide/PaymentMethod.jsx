import { useState } from 'react';
export default function PaymentMethod() {
  const [paymentMethod, setPaymentMethod] = useState('credit');
  return (
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
  );
}