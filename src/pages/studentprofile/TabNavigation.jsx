// components/TabNavigation.jsx
import React from 'react';

export default function TabNavigation({ tabs, activeTab, onTabChange }) {
  return (
    <div className="rounded-lg border border-gray-200 shadow-sm" style={{backgroundColor: '#D7E5E5'}}>
      <div className="grid grid-cols-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onTabChange(tab)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              activeTab === tab
                ? 'border-gray-900 text-gray-900'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
            style={activeTab === tab ? {backgroundColor: '#EBF5F5'} : {}}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}