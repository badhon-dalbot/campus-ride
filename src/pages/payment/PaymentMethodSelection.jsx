import React from 'react';
import { Shield, Lock } from 'lucide-react';
import PaymentMethodCard from './PaymentMethodCard';

const PaymentMethodSelection = ({ 
  paymentMethods, 
  selectedPaymentMethod, 
  setSelectedPaymentMethod, 
  totalAmount,
  onPayment 
}) => {
  const selectedMethod = paymentMethods.find(m => m.id === selectedPaymentMethod);
  const isWalletInsufficientBalance = selectedPaymentMethod === 'wallet' && 
    paymentMethods.find(m => m.id === 'wallet')?.balance < totalAmount;
  const isCashPayment = selectedPaymentMethod === 'cash1';

  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Choose Payment Method</h3>
      
      <div className="space-y-3 mb-6">
        {paymentMethods.map((method) => (
          <PaymentMethodCard
            key={method.id}
            method={method}
            isSelected={selectedPaymentMethod === method.id}
            onSelect={setSelectedPaymentMethod}
            showInsufficientBalance={
              selectedPaymentMethod === method.id && 
              method.type === 'wallet' && 
              method.balance < totalAmount
            }
            showCashInfo={
              selectedPaymentMethod === method.id && 
              method.type === 'cash'
            }
          />
        ))}
      </div>

      {/* Payment Button */}
      <button
        onClick={onPayment}
        disabled={isWalletInsufficientBalance}
        className="w-full text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg"
        style={{backgroundColor: '#17252A'}}
        onMouseEnter={(e) => {
          if (!isWalletInsufficientBalance) {
            e.target.style.backgroundColor = '#0f1a1e';
          }
        }}
        onMouseLeave={(e) => {
          if (!isWalletInsufficientBalance) {
            e.target.style.backgroundColor = '#17252A';
          }
        }}
      >
        {isCashPayment ? 'Confirm Cash Payment' : `Pay ৳${totalAmount}`}
      </button>

      <div className="flex items-center justify-center gap-4 text-sm text-gray-500 mt-4">
        <div className="flex items-center gap-1">
          <Shield className="w-4 h-4" style={{color: '#17252A'}} />
          <span>SSL Secured</span>
        </div>
        <div className="flex items-center gap-1">
          <Lock className="w-4 h-4" style={{color: '#17252A'}} />
          <span>256-bit Encryption</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelection;