import React, { useState } from 'react';
import { CreditCard, Smartphone, Wallet, Plus, Trash2, Edit3, Phone, DollarSign, Calendar } from 'lucide-react';

// Import the existing components you've already created
import PaymentMethodsManagement from '../payment/PaymentMethodsManagement';
import PaymentHistory from '../payment/PaymentHistory';
import PaymentModals from '../payment/PaymentModals';

export default function PaymentProfileSection() {
  const [activeTab, setActiveTab] = useState('methods');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [addPaymentType, setAddPaymentType] = useState('mobile');
  const [editingMethod, setEditingMethod] = useState(null);
  
  const [newPayment, setNewPayment] = useState({
    phoneNumber: '',
    provider: 'bkash',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 'wallet',
      type: 'wallet',
      name: 'CampusRide Wallet',
      balance: 485.50,
      icon: Wallet,
      recommended: true
    },
    {
      id: 'bkash1',
      type: 'mobile',
      name: 'bKash',
      provider: 'bkash',
      number: '+880 1712-345678',
      icon: Phone,
      color: 'bg-pink-500'
    },
    {
      id: 'card1',
      type: 'card',
      name: 'Visa Card',
      last4: '4532',
      cardholderName: 'Sarah Johnson',
      expiryDate: '12/26',
      icon: CreditCard,
      color: 'bg-blue-600'
    }
  ]);

  const mobileProviders = [
    { id: 'bkash', name: 'bKash', color: 'bg-pink-500' },
    { id: 'nagad', name: 'Nagad', color: 'bg-orange-500' },
    { id: 'rocket', name: 'Rocket', color: 'bg-purple-500' },
    { id: 'upay', name: 'Upay', color: 'bg-green-500' }
  ];

  const recentRides = [
    {
      id: 'RIDE-2025-002',
      driver: 'Sarah Khan',
      route: 'Gulshan 1 → Dhanmondi',
      amount: 250,
      date: '2025-01-14',
      status: 'paid',
      method: 'bKash'
    },
    {
      id: 'RIDE-2025-003', 
      driver: 'Mike Rahman',
      route: 'BUET → Shahbag',
      amount: 180,
      date: '2025-01-13',
      status: 'paid',
      method: 'Wallet'
    }
  ];

  const tabs = [
    { id: 'methods', label: 'Payment Methods', icon: CreditCard },
    { id: 'history', label: 'Payment History', icon: Calendar }
  ];

  // Helper functions (copy from your original component)
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

  const handleAddPaymentMethod = () => {
    if (addPaymentType === 'mobile') {
      if (!newPayment.phoneNumber || !newPayment.provider) {
        alert('Please fill in all mobile payment fields');
        return;
      }
      const newMethod = {
        id: `mobile_${Date.now()}`,
        type: 'mobile',
        name: mobileProviders.find(p => p.id === newPayment.provider)?.name,
        provider: newPayment.provider,
        number: newPayment.phoneNumber,
        icon: Phone,
        color: mobileProviders.find(p => p.id === newPayment.provider)?.color
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    } else if (addPaymentType === 'card') {
      if (!newPayment.cardNumber || !newPayment.expiryDate || !newPayment.cvv || !newPayment.cardholderName) {
        alert('Please fill in all card fields');
        return;
      }
      const newMethod = {
        id: `card_${Date.now()}`,
        type: 'card',
        name: 'Credit Card',
        last4: newPayment.cardNumber.slice(-4),
        cardholderName: newPayment.cardholderName,
        expiryDate: newPayment.expiryDate,
        icon: CreditCard,
        color: 'bg-blue-600'
      };
      setPaymentMethods([...paymentMethods, newMethod]);
    }
    
    setNewPayment({
      phoneNumber: '',
      provider: 'bkash',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
    setShowAddPaymentModal(false);
  };

  const handleEditPaymentMethod = (method) => {
    setEditingMethod(method);
    if (method.type === 'mobile') {
      setNewPayment({
        phoneNumber: method.number,
        provider: method.provider,
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        cardholderName: ''
      });
      setAddPaymentType('mobile');
    } else if (method.type === 'card') {
      setNewPayment({
        phoneNumber: '',
        provider: 'bkash',
        cardNumber: '**** **** **** ' + method.last4,
        expiryDate: method.expiryDate,
        cvv: '***',
        cardholderName: method.cardholderName
      });
      setAddPaymentType('card');
    }
    setShowAddPaymentModal(true);
  };

  const handleUpdatePaymentMethod = () => {
    if (!editingMethod) return;
    
    const updatedMethods = paymentMethods.map(method => {
      if (method.id === editingMethod.id) {
        if (addPaymentType === 'mobile') {
          return {
            ...method,
            name: mobileProviders.find(p => p.id === newPayment.provider)?.name,
            provider: newPayment.provider,
            number: newPayment.phoneNumber,
            color: mobileProviders.find(p => p.id === newPayment.provider)?.color
          };
        } else if (addPaymentType === 'card') {
          return {
            ...method,
            cardholderName: newPayment.cardholderName,
            expiryDate: newPayment.expiryDate
          };
        }
      }
      return method;
    });
    
    setPaymentMethods(updatedMethods);
    setEditingMethod(null);
    setNewPayment({
      phoneNumber: '',
      provider: 'bkash',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      cardholderName: ''
    });
    setShowAddPaymentModal(false);
  };

  const handleDeletePaymentMethod = (methodId) => {
    const method = paymentMethods.find(m => m.id === methodId);
    if (method && (method.type === 'wallet' || method.type === 'cash')) {
      alert('Cannot delete default payment methods');
      return;
    }
    if (confirm('Are you sure you want to delete this payment method?')) {
      setPaymentMethods(paymentMethods.filter(method => method.id !== methodId));
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
      {/* Section Header */}
      <div className="p-6 border-b border-gray-300">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Information</h2>
        <p className="text-gray-600">Manage your payment methods and view transaction history</p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-300">
        <div className="flex">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 font-medium text-sm transition-all border-b-3 ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                style={activeTab === tab.id ? {backgroundColor: '#EBF5F5'} : {}}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'methods' && (
          <PaymentMethodsManagement
            paymentMethods={paymentMethods}
            onAddNew={() => setShowAddPaymentModal(true)}
            onEdit={handleEditPaymentMethod}
            onDelete={handleDeletePaymentMethod}
            onAddMoney={() => setShowAddMoneyModal(true)}
            onWithdraw={() => setShowWithdrawModal(true)}
          />
        )}

        {activeTab === 'history' && (
          <PaymentHistory recentRides={recentRides} />
        )}
      </div>

      {/* Modals */}
      <PaymentModals
        showPaymentModal={false}
        showAddPaymentModal={showAddPaymentModal}
        showAddMoneyModal={showAddMoneyModal}
        showWithdrawModal={showWithdrawModal}
        setShowPaymentModal={() => {}}
        setShowAddPaymentModal={setShowAddPaymentModal}
        setShowAddMoneyModal={setShowAddMoneyModal}
        setShowWithdrawModal={setShowWithdrawModal}
        addPaymentType={addPaymentType}
        setAddPaymentType={setAddPaymentType}
        editingMethod={editingMethod}
        setEditingMethod={setEditingMethod}
        newPayment={newPayment}
        setNewPayment={setNewPayment}
        mobileProviders={mobileProviders}
        handleAddPaymentMethod={handleAddPaymentMethod}
        handleUpdatePaymentMethod={handleUpdatePaymentMethod}
        formatCardNumber={formatCardNumber}
      />
    </div>
  );
}