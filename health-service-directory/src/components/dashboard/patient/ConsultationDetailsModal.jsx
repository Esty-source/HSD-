import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, ClockIcon, CalendarIcon, UserCircleIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ConsultationDetailsModal({ isOpen, onClose, consultation }) {
  const cancelButtonRef = useRef(null);

  if (!consultation) return null;

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                  <button
                    type="button"
                    className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    <span className="sr-only">Close</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                    <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-900 border-b pb-3">
                      Consultation Details
                    </Dialog.Title>
                    
                    <div className="mt-4 space-y-6">
                      {/* Doctor Information */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Doctor Information</h4>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center">
                            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                              <UserCircleIcon className="h-8 w-8" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{consultation.doctorName}</p>
                              <p className="text-sm text-gray-500">{consultation.specialty}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Appointment Details */}
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 mb-2">Appointment Details</h4>
                        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                          <div className="flex items-center">
                            <CalendarIcon className="h-5 w-5 text-blue-500 mr-3" />
                            <span className="text-gray-700">Date: {formatDate(consultation.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <ClockIcon className="h-5 w-5 text-blue-500 mr-3" />
                            <span className="text-gray-700">Time: {consultation.time}</span>
                          </div>
                          <div className="flex items-center">
                            <UserCircleIcon className="h-5 w-5 text-blue-500 mr-3" />
                            <span className="text-gray-700">Duration: {consultation.duration} minutes</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Consultation Summary */}
                      {consultation.summary && (
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Consultation Summary</h4>
                          <div className="bg-blue-50 rounded-lg p-4">
                            <div className="flex">
                              <DocumentTextIcon className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-1" />
                              <p className="text-gray-700">{consultation.summary}</p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Notes */}
                      {consultation.notes && (
                        <div>
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Notes</h4>
                          <div className="bg-gray-50 rounded-lg p-4">
                            <p className="text-gray-700">{consultation.notes}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-2"
                    onClick={() => {
                      // Navigate to book follow-up
                      onClose();
                      // This would typically navigate to appointments page with pre-filled data
                    }}
                  >
                    Book Follow-up
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:col-start-1 sm:mt-0"
                    onClick={onClose}
                    ref={cancelButtonRef}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
