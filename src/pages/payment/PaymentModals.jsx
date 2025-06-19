import React from 'react';
import { CheckCircle, Phone, CreditCard } from 'lucide-react';

const PaymentModals = ({
  showPaymentModal,
  showAddPaymentModal,
  showAddMoneyModal,
  showWithdrawModal,
  setShowPaymentModal,
  setShowAddPaymentModal,
  setShowAddMoneyModal,
  setShowWithdrawModal,
  addPaymentType,
  setAddPaymentType,
  editingMethod,
  setEditingMethod,
  newPayment,
  setNewPayment,
  mobileProviders,
  handleAddPaymentMethod,
  handleUpdatePaymentMethod,
  formatCardNumber
}) => {
  const resetPaymentForm = () => {
    setNewPayment({
      phoneNumber: '',
      provider: 'bkash',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
    setEditingMethod(null);
  };

  return (
    <>
      {/* Payment Processing Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl p-8 text-center max-w-md mx-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600 animate-pulse" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we process your payment...</p>
            <div className="mt-4 text-sm text-green-600">Secured by SSL Commerz</div>
          </div>
        </div>
      )}

      {/* Add/Edit Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">
                  {editingMethod ? 'Edit Payment Method' : 'Add New Payment Method'}
                </h3>
                <button
                  onClick={() => {
                    setShowAddPaymentModal(false);
                    resetPaymentForm();
                  }}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              {/* Payment Type Selection */}
              {!editingMethod && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Payment Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setAddPaymentType('mobile')}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        addPaymentType === 'mobile'
                          ? 'border-gray-900 text-gray-900'
                          : 'border-gray-400'
                      }`}
                      style={addPaymentType === 'mobile' ? {backgroundColor: '#EBF5F5'} : {}}
                    >
                      <Phone className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-medium">Mobile Banking</div>
                    </button>
                    <button
                      onClick={() => setAddPaymentType('card')}
                      className={`p-4 border rounded-lg text-center transition-all ${
                        addPaymentType === 'card'
                          ? 'border-gray-900 text-gray-900'
                          : 'border-gray-400'
                      }`}
                      style={addPaymentType === 'card' ? {backgroundColor: '#EBF5F5'} : {}}
                    >
                      <CreditCard className="w-6 h-6 mx-auto mb-2" />
                      <div className="font-medium">Credit/Debit Card</div>
                    </button>
                  </div>
                </div>
              )}

              {/* Mobile Banking Form */}
              {addPaymentType === 'mobile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
                    <select
                      value={newPayment.provider}
                      onChange={(e) => setNewPayment({...newPayment, provider: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      {mobileProviders.map(provider => (
                        <option key={provider.id} value={provider.id}>{provider.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={newPayment.phoneNumber}
                      onChange={(e) => setNewPayment({...newPayment, phoneNumber: e.target.value})}
                      placeholder="+880 1712-345678"
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                </div>
              )}

              {/* Card Form */}
              {addPaymentType === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      value={formatCardNumber(newPayment.cardNumber)}
                      onChange={(e) => setNewPayment({...newPayment, cardNumber: e.target.value})}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                      maxLength="19"
                      disabled={editingMethod}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        value={newPayment.expiryDate}
                        onChange={(e) => setNewPayment({...newPayment, expiryDate: e.target.value})}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        maxLength="5"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        value={newPayment.cvv}
                        onChange={(e) => setNewPayment({...newPayment, cvv: e.target.value})}
                        placeholder="123"
                        className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                        maxLength="4"
                        disabled={editingMethod}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      value={newPayment.cardholderName}
                      onChange={(e) => setNewPayment({...newPayment, cardholderName: e.target.value})}
                      placeholder="Sarah Johnson"
                      className="w-full px-3 py-2 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-6">
                <button
                  onClick={editingMethod ? handleUpdatePaymentMethod : handleAddPaymentMethod}
                  className="flex-1 text-white py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                  style={{backgroundColor: '#17252A'}}
                >
                  {editingMethod ? 'Update' : 'Add'} Payment Method
                </button>
                <button
                  onClick={() => {
                    setShowAddPaymentModal(false);
                    resetPaymentForm();
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium transition-colors hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Money Modal */}
      {showAddMoneyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Add Money to Wallet</h3>
                <button
                  onClick={() => setShowAddMoneyModal(false)}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {[100, 500, 1000, 2000, 5000, 10000].map((amount) => (
                    <button
                      key={amount}
                      className="p-3 border border-gray-400 rounded-lg font-medium transition-colors hover:bg-gray-100"
                    >
                      ৳{amount}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  placeholder="Custom amount"
                  className="w-full px-4 py-3 border border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <button
                onClick={() => {
                  setShowAddMoneyModal(false);
                  alert('Redirecting to SSL Commerz for payment...');
                }}
                className="w-full text-white py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                style={{backgroundColor: '#17252A'}}
              >
                Add Money via SSL Commerz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-300">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Withdraw from Wallet</h3>
                <button
                  onClick={() => setShowWithdrawModal(false)}
                  className="text-gray-500 text-2xl hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-4">Available Balance: ৳485.50</div>
                <input
                  type="number"
                  placeholder="Enter withdrawal amount"
                  max="485.50"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 mb-4"
                />
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500">
                  <option>Select withdrawal method</option>
                  <option>Bank Transfer</option>
                  <option>bKash</option>
                  <option>Nagad</option>
                </select>
              </div>
              <button
                onClick={() => {
                  setShowWithdrawModal(false);
                  alert('Withdrawal request submitted!');
                }}
                className="w-full text-white py-3 rounded-lg font-medium transition-colors hover:opacity-90"
                style={{backgroundColor: '#17252A'}}
              >
                Request Withdrawal
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModals;