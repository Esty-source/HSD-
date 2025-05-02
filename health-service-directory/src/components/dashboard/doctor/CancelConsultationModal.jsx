import React from 'react';

export default function CancelConsultationModal({ open, onCancel, onConfirm, consultation }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 relative z-50">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Cancellation</h3>
        <p className="mb-6">Are you sure you want to cancel the consultation with <span className="font-bold">{consultation?.patientName}</span>? This action cannot be undone.</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
          >
            No, Go Back
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
