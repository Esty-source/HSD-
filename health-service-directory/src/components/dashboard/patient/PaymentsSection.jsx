import { useState } from 'react';
import { CreditCardIcon, BanknotesIcon, ClockIcon, DocumentTextIcon, ExclamationCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CalendarIcon } from '@heroicons/react/24/outline';

export default function PaymentsSection() {
  const [activeTab, setActiveTab] = useState('history');
  const [showAddPaymentModal, setShowAddPaymentModal] = useState(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    provider: '',
    number: '',
    isDefault: false
  });
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'mobile_money',
      provider: 'MTN Mobile Money',
      number: '+237 6XX XXX XXX',
      isDefault: true
    },
    {
      id: 2,
      type: 'mobile_money',
      provider: 'Orange Money',
      number: '+237 6XX XXX XXX',
      isDefault: false
    }
  ]);

  // Mock data - will be replaced with real API data
  const paymentHistory = [
    {
      id: 1,
      date: '2024-03-15',
      description: 'Consultation - Dr. Sarah Wilson',
      amount: 50000,
      status: 'completed',
      paymentMethod: 'MTN Mobile Money'
    },
    {
      id: 2,
      date: '2024-03-01',
      description: 'Lab Tests - Blood Work',
      amount: 25000,
      status: 'completed',
      paymentMethod: 'Orange Money'
    },
    {
      id: 3,
      date: '2024-02-15',
      description: 'Prescription Medication',
      amount: 15000,
      status: 'pending',
      paymentMethod: 'Pending'
    }
  ];

  const insuranceClaims = [
    {
      id: 1,
      date: '2024-03-15',
      service: 'Consultation',
      amount: 50000,
      status: 'approved',
      claimNumber: 'CLM001'
    },
    {
      id: 2,
      date: '2024-03-01',
      service: 'Lab Tests',
      amount: 25000,
      status: 'pending',
      claimNumber: 'CLM002'
    }
  ];

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('fr-CM', {
      style: 'currency',
      currency: 'XAF'
    }).format(amount);
  };

  const handleAddPaymentMethod = () => {
    if (newPaymentMethod.provider && newPaymentMethod.number) {
      const newMethod = {
        id: paymentMethods.length + 1,
        type: 'mobile_money',
        ...newPaymentMethod
      };
      
      // If this is set as default, update other methods
      if (newMethod.isDefault) {
        setPaymentMethods(prevMethods => 
          prevMethods.map(method => ({ ...method, isDefault: false }))
        );
      }
      
      setPaymentMethods(prevMethods => [...prevMethods, newMethod]);
      setShowAddPaymentModal(false);
      setNewPaymentMethod({ provider: '', number: '', isDefault: false });
    }
  };

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Payments</h2>
        <button 
          onClick={() => setShowAddPaymentModal(true)}
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors duration-200"
        >
          <CreditCardIcon className="h-5 w-5 mr-2" />
          <span className="font-medium">Add Payment Method</span>
        </button>
      </div>

      {/* Add Payment Method Modal */}
      {showAddPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">Add Payment Method</h3>
              <button 
                onClick={() => setShowAddPaymentModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Provider
                </label>
                <select
                  value={newPaymentMethod.provider}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, provider: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">Select Provider</option>
                  <optgroup label="Mobile Money">
                    <option value="MTN Mobile Money">MTN Mobile Money</option>
                    <option value="Orange Money">Orange Money</option>
                  </optgroup>
                  <optgroup label="Bank Cards">
                    <option value="Visa">Visa</option>
                    <option value="Mastercard">Mastercard</option>
                    <option value="American Express">American Express</option>
                  </optgroup>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {newPaymentMethod.provider.includes('Money') ? 'Phone Number' : 'Card Number'}
                </label>
                <input
                  type="text"
                  value={newPaymentMethod.number}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, number: e.target.value })}
                  placeholder={newPaymentMethod.provider.includes('Money') ? "+237 6XX XXX XXX" : "XXXX XXXX XXXX XXXX"}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={newPaymentMethod.isDefault}
                  onChange={(e) => setNewPaymentMethod({ ...newPaymentMethod, isDefault: e.target.checked })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  Set as default payment method
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowAddPaymentModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPaymentMethod}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Payment Method
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex space-x-4 mb-8 w-full overflow-x-auto">
        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'history' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <DocumentTextIcon className="h-5 w-5" />
          <span className="font-medium">Payment History</span>
        </button>
        <button
          onClick={() => setActiveTab('methods')}
          className={`flex items-center space-x-2 px-6 py-3 rounded-xl whitespace-nowrap transition-colors duration-200 ${
            activeTab === 'methods' 
              ? 'bg-blue-600 text-white shadow-sm' 
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
        >
          <CreditCardIcon className="h-5 w-5" />
          <span className="font-medium">Payment Methods</span>
        </button>
      </div>

      {/* Content */}
      <div className="w-full">
        {/* Payment History */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {paymentHistory.map((payment) => (
              <div key={payment.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">{payment.description}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center">
                        <CalendarIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{new Date(payment.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <BanknotesIcon className="h-4 w-4 mr-2 text-blue-500" />
                        <span>{formatAmount(payment.amount)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      payment.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {payment.status}
                    </span>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                      {payment.paymentMethod}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Payment Methods */}
        {activeTab === 'methods' && (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCardIcon className="h-5 w-5 text-blue-500 mr-3" />
                      <h3 className="text-lg font-semibold text-gray-800">{method.provider}</h3>
                    </div>
                    <p className="text-gray-600">{method.number}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {method.isDefault && (
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        Default
                      </span>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 transition-colors duration-200">
                      <span className="font-medium">Edit</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Insurance Claims */}
        {activeTab === 'claims' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900">Insurance Claims</h2>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                Submit New Claim
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Claim Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {insuranceClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {claim.claimNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(claim.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {claim.service}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatAmount(claim.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          claim.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {claim.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <button className="text-blue-600 hover:text-blue-900">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {insuranceClaims.length === 0 && (
              <div className="text-center py-12">
                <ExclamationCircleIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No claims found</h3>
                <p className="mt-1 text-gray-500">You haven't submitted any insurance claims yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 