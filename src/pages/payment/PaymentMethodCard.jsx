import React from 'react';
import { CheckCircle } from 'lucide-react';

const PaymentMethodCard = ({ 
  method, 
  isSelected, 
  onSelect, 
  showInsufficientBalance = false,
  showCashInfo = false 
}) => {
  const Icon = method.icon;
  
  return (
    <div>
      <div
        onClick={() => onSelect(method.id)}
        className={`p-4 border rounded-lg cursor-pointer transition-all ${
          isSelected ? 'border-gray-900' : 'border-gray-400'
        }`}
        style={isSelected ? {backgroundColor: '#EBF5F5'} : {}}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 ${method.color || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
              <Icon className={`w-5 h-5 ${method.color ? 'text-white' : 'text-gray-600'}`} />
            </div>
            <div>
              <div className="font-semibold text-gray-900 flex items-center gap-2">
                {method.name}
                {method.recommended && (
                  <span className="bg-teal-100 text-teal-800 px-2 py-1 rounded-full text-xs font-medium">
                    Recommended
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-500">
                {method.type === 'wallet' && `Balance: ৳${method.balance}`}
                {method.type === 'cash' && method.description}
                {method.type === 'mobile' && method.number}
                {method.type === 'card' && `${method.cardholderName} ****${method.last4}`}
              </div>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 ${
            isSelected ? 'border-gray-900 bg-gray-900' : 'border-gray-400'
          }`}>
            {isSelected && (
              <CheckCircle className="w-5 h-5 text-white -m-0.5" />
            )}
          </div>
        </div>
      </div>
      
      {/* Warnings and Info */}
      {showInsufficientBalance && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="text-sm text-yellow-800">
            Insufficient wallet balance. Please top up your wallet or choose another payment method.
          </div>
        </div>
      )}
      
      {showCashInfo && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-800">
            You will pay the driver directly with cash upon ride completion.
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodCard;