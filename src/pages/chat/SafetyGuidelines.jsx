import React from 'react';
import { Shield } from 'lucide-react';

const SafetyGuidelines = () => (
  <div className="border border-gray-300 rounded-lg p-4 mt-6" style={{backgroundColor: '#DEEEED'}}>
    <div className="flex items-start gap-3">
      <Shield className="w-5 h-5 text-gray-600 mt-0.5" />
      <div>
        <h4 className="font-medium text-gray-800 mb-1">Safety Guidelines</h4>
        <p className="text-sm text-gray-700">
          Always verify car details and license plate. Share your trip with trusted contacts.
        </p>
      </div>
    </div>
  </div>
);

export default SafetyGuidelines;