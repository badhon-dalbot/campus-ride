import React from 'react';
import { Plus, Upload, Download, Edit3, Trash2 } from 'lucide-react';

const PaymentMethodsManagement = ({ 
  paymentMethods, 
  onAddNew, 
  onEdit, 
  onDelete, 
  onAddMoney, 
  onWithdraw 
}) => {
  return (
    <div style={{backgroundColor: '#D7E5E5'}} className="rounded-xl border border-gray-300 shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-900">Manage Payment Methods</h3>
        <button
          onClick={onAddNew}
          className="flex items-center gap-2 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          style={{backgroundColor: '#17252A'}}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#0f1a1e';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#17252A';
          }}
        >
          <Plus className="w-4 h-4" />
          Add New
        </button>
      </div>
      
      <div className="space-y-4">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          return (
            <div key={method.id} className="flex items-center justify-between p-4 border border-gray-400 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 ${method.color || 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${method.color ? 'text-white' : 'text-gray-600'}`} />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{method.name}</div>
                  <div className="text-sm text-gray-500">
                    {method.type === 'wallet' && `Balance: ৳${method.balance}`}
                    {method.type === 'cash' && method.description}
                    {method.type === 'mobile' && method.number}
                    {method.type === 'card' && `${method.cardholderName} ****${method.last4}`}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.type === 'wallet' ? (
                  <>
                    <button
                      onClick={onAddMoney}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Add Money"
                    >
                      <Upload className="w-4 h-4" />
                    </button>
                    <button
                      onClick={onWithdraw}
                      className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Withdraw"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </>
                ) : method.type === 'cash' ? (
                  <span className="text-sm text-gray-500 italic">Default payment method</span>
                ) : (
                  <>
                    <button
                      onClick={() => onEdit(method)}
                      className="p-2 text-gray-400 hover:text-gray-700 transition-colors"
                      title="Edit"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(method.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentMethodsManagement;