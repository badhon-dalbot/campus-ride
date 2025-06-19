import React, { useState } from 'react';
export default function MessageBox() {
    const [message, setMessage] = useState('');
    return (
         <div className="bg-[#D4E4E4] rounded-lg p-5 border border-black shadow-lg">
                <h3 className="text-base font-semibold mb-3 text-gray-800">Message to Driver</h3>
                <textarea
                  placeholder="Let the driver know if you have any special request"
                  className="w-full p-3 border border-gray-300 rounded-lg resize-none h-16 text-sm bg-white mb-3"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
                <div className="flex justify-end">
                  <button className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                    Send
                  </button>
                </div>
        </div>
    );
}