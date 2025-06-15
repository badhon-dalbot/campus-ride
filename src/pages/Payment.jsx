import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Plus, Trash2, Edit3, Shield, Lock, CheckCircle, ArrowLeft, Calendar, DollarSign } from 'lucide-react';

// Mock components for demonstration
const CampusRideHeader = () => (
  <div className="w-full bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-sm">C</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900">CampusRide</h1>
      </div>
      <div className="flex items-center gap-6">
        <button className="text-gray-600 hover:text-gray-900 font-medium">Find Rides</button>
        <button className="text-gray-600 hover:text-gray-900 font-medium">Offer a Ride</button>
        <button className="text-gray-600 hover:text-gray-900 font-medium">My Rides</button>
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-gray-900">Menu</button>
        <button className="text-gray-600 hover:text-gray-900">Profile</button>
      </div>
    </div>
  </div>
);

const CampusRideFooter = () => (
  <div className="w-full bg-gray-900 text-white px-6 py-8 mt-12">
    <div className="max-w-6xl mx-auto">
      <div className="text-center text-sm text-gray-400">
        <p>&copy; 2025 CampusRide. All rights reserved.</p>
      </div>
    </div>
  </div>
);

export default function PaymentPage() {
  const [activeTab, setActiveTab] = useState('methods');
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: '',
    type: 'visa'
  });

  const tabs = [
    { id: 'methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'history', label: 'Transaction History', icon: Calendar },
    { id: 'wallet', label: 'Wallet', icon: Wallet }
  ];

  const paymentMethods = [
    {
      id: 1,
      type: 'card',
      brand: 'Visa',
      last4: '4532',
      expiry: '12/26',
      isDefault: true,
      cardHolder: 'Sarah Johnson'
    },
    {
      id: 2,
      type: 'card',
      brand: 'Mastercard',
      last4: '8901',
      expiry: '08/27',
      isDefault: false,
      cardHolder: 'Sarah Johnson'
    },
    {
      id: 3,
      type: 'mobile',
      provider: 'bKash',
      number: '+880 1712-345678',
      isDefault: false
    },
    {
      id: 4,
      type: 'mobile',
      provider: 'Nagad',
      number: '+880 1812-345678',
      isDefault: false
    }
  ];

  const transactions = [
    {
      id: 1,
      type: 'payment',
      description: 'Ride payment to Mike Chen',
      amount: -150,
      date: '2025-01-14',
      status: 'completed',
      method: 'Visa ****4532'
    },
    {
      id: 2,
      type: 'refund',
      description: 'Refund from cancelled ride',
      amount: 200,
      date: '2025-01-12',
      status: 'completed',
      method: 'bKash'
    },
    {
      id: 3,
      type: 'payment',
      description: 'Ride payment to Sarah Johnson',
      amount: -300,
      date: '2025-01-10',
      status: 'completed',
      method: 'Visa ****4532'
    },
    {
      id: 4,
      type: 'earning',
      description: 'Earnings from ride to Alex Rahman',
      amount: 250,
      date: '2025-01-08',
      status: 'completed',
      method: 'Direct deposit'
    },
    {
      id: 5,
      type: 'payment',
      description: 'Service fee',
      amount: -25,
      date: '2025-01-08',
      status: 'completed',
      method: 'Wallet balance'
    }
  ];

  const handleAddCard = () => {
    setIsAddingCard(false);
    // Handle adding card logic
    setNewCard({
      number: '',
      expiry: '',
      cvv: '',
      name: '',
      type: 'visa'
    });
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const getCardIcon = (brand) => {
    switch (brand.toLowerCase()) {
      case 'visa':
        return <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>;
      case 'mastercard':
        return <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>;
      default:
        return <CreditCard className="w-5 h-5 text-gray-400" />;
    }
  };

  const getMobileIcon = (provider) => {
    const colors = {
      'bKash': 'bg-pink-500',
      'Nagad': 'bg-orange-500',
      'Rocket': 'bg-purple-500'
    };
    return (
      <div className={`w-8 h-8 ${colors[provider] || 'bg-gray-500'} rounded-full text-white text-xs flex items-center justify-center font-bold`}>
        {provider.charAt(0)}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <CampusRideHeader />
      
      {/* Main Content */}
      <div className="flex-1 p-6" style={{backgroundColor: '#EBF5F5'}}>
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4">
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back</span>
            </button>
            <h1 className="text-2xl font-bold text-gray-900 text-center">Payment & Wallet</h1>
          </div>

          {/* Wallet Balance Card */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white mb-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-2">Wallet Balance</p>
                <h2 className="text-3xl font-bold">৳485.50</h2>
                <p className="text-blue-100 text-sm mt-1">Available for rides</p>
              </div>
              <div className="text-right">
                <button className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium">
                  Add Money
                </button>
                <p className="text-blue-100 text-xs mt-2">Last updated: Today</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm mb-6">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-colors border-b-2 ${
                      activeTab === tab.id
                        ? 'bg-gray-50 border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:text-gray-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === 'methods' && (
            <div className="space-y-6">
              {!isAddingCard ? (
                <>
                  {/* Payment Methods List */}
                  <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="p-6 border-b border-gray-200">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900">Saved Payment Methods</h3>
                        <button
                          onClick={() => setIsAddingCard(true)}
                          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
                        >
                          <Plus className="w-4 h-4" />
                          Add New
                        </button>
                      </div>
                    </div>
                    <div className="p-6 space-y-4">
                      {paymentMethods.map((method) => (
                        <div key={method.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              {method.type === 'card' ? getCardIcon(method.brand) : getMobileIcon(method.provider)}
                              <div>
                                {method.type === 'card' ? (
                                  <>
                                    <div className="font-medium text-gray-900">
                                      {method.brand} ****{method.last4}
                                    </div>
                                    <div className="text-sm text-gray-500">
                                      {method.cardHolder} • Expires {method.expiry}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="font-medium text-gray-900">{method.provider}</div>
                                    <div className="text-sm text-gray-500">{method.number}</div>
                                  </>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {method.isDefault && (
                                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                                  Default
                                </span>
                              )}
                              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Security Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900">Secure Payments</h4>
                        <p className="text-blue-700 text-sm mt-1">
                          All payment information is encrypted and secured. We never store your full card details.
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Add New Card Form */
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Add New Payment Method</h3>
                    <button
                      onClick={() => setIsAddingCard(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={formatCardNumber(newCard.number)}
                        onChange={(e) => setNewCard({...newCard, number: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        maxLength="19"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={newCard.expiry}
                          onChange={(e) => setNewCard({...newCard, expiry: e.target.value})}
                          placeholder="MM/YY"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength="5"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={newCard.cvv}
                          onChange={(e) => setNewCard({...newCard, cvv: e.target.value})}
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength="4"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={newCard.name}
                        onChange={(e) => setNewCard({...newCard, name: e.target.value})}
                        placeholder="Sarah Johnson"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Lock className="w-4 h-4" />
                      <span>Your card information is encrypted and secure</span>
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleAddCard}
                        className="flex-1 bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        Add Card
                      </button>
                      <button
                        onClick={() => setIsAddingCard(false)}
                        className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Transaction History</h3>
                  <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                    <option>Last 30 days</option>
                    <option>Last 3 months</option>
                    <option>Last year</option>
                  </select>
                </div>
              </div>
              <div className="divide-y divide-gray-200">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          transaction.type === 'payment' ? 'bg-red-100' :
                          transaction.type === 'refund' ? 'bg-green-100' :
                          transaction.type === 'earning' ? 'bg-blue-100' : 'bg-gray-100'
                        }`}>
                          <DollarSign className={`w-5 h-5 ${
                            transaction.type === 'payment' ? 'text-red-600' :
                            transaction.type === 'refund' ? 'text-green-600' :
                            transaction.type === 'earning' ? 'text-blue-600' : 'text-gray-600'
                          }`} />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{transaction.description}</div>
                          <div className="text-sm text-gray-500">
                            {transaction.date} • {transaction.method}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`font-semibold ${
                          transaction.amount > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.amount > 0 ? '+' : ''}৳{Math.abs(transaction.amount)}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-green-600">
                          <CheckCircle className="w-3 h-3" />
                          Completed
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wallet' && (
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Add Money</h3>
                  <p className="text-gray-600 text-sm mb-4">Top up your wallet for faster payments</p>
                  <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    Add Funds
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Withdraw</h3>
                  <p className="text-gray-600 text-sm mb-4">Transfer money to your bank account</p>
                  <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors">
                    Withdraw
                  </button>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Wallet className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Auto-reload</h3>
                  <p className="text-gray-600 text-sm mb-4">Automatically add money when balance is low</p>
                  <button className="w-full bg-purple-500 text-white py-2 rounded-lg hover:bg-purple-600 transition-colors">
                    Enable
                  </button>
                </div>
              </div>

              {/* Wallet Settings */}
              <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Wallet Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Auto-reload</div>
                      <div className="text-sm text-gray-500">Automatically add ৳500 when balance goes below ৳100</div>
                    </div>
                    <button className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                      Disabled
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Spending limit</div>
                      <div className="text-sm text-gray-500">Daily spending limit: ৳2,000</div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium">
                      Modify
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">Transaction notifications</div>
                      <div className="text-sm text-gray-500">Get notified for all wallet transactions</div>
                    </div>
                    <button className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      Enabled
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <CampusRideFooter />
    </div>
  );
}