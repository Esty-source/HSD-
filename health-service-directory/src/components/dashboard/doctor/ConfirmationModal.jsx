import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';

/**
 * A reusable confirmation modal component for the doctor dashboard
 * @param {Object} props Component props
 * @param {boolean} props.show Whether the modal is visible
 * @param {Function} props.onClose Function to call when closing the modal
 * @param {string} props.title Title of the confirmation
 * @param {string} props.message Message to display in the confirmation
 * @param {string} props.type Type of confirmation (success, warning, error)
 * @param {Object} props.data Additional data to display in the confirmation
 */
export default function ConfirmationModal({ 
  show, 
  onClose, 
  title = "Action Completed", 
  message = "Your action has been completed successfully.", 
  type = "success",
  data = null,
  children
}) {
  if (!show) return null;

  // Determine icon and colors based on type
  let iconColor = "text-green-500";
  let bgColor = "bg-green-100";
  let Icon = CheckCircleIcon;
  
  if (type === "warning") {
    iconColor = "text-yellow-500";
    bgColor = "bg-yellow-100";
  } else if (type === "error") {
    iconColor = "text-red-500";
    bgColor = "bg-red-100";
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="text-center">
          <div className={`mx-auto flex items-center justify-center h-12 w-12 rounded-full ${bgColor} mb-4`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
          <p className="text-sm text-gray-600 mb-4">{message}</p>
          
          {/* Render additional data if provided */}
          {data && (
            <div className="mt-4 bg-gray-50 p-4 rounded-lg text-left">
              {Object.entries(data).map(([key, value]) => (
                <div key={key} className="mb-2 last:mb-0">
                  <span className="text-xs text-gray-500 block">{key}:</span>
                  <span className="text-sm font-medium text-gray-900">{value}</span>
                </div>
              ))}
            </div>
          )}
          
          {children ? (
            children
          ) : (
            <div className="mt-5">
              <button
                type="button"
                onClick={onClose}
                className="w-full inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                OK
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
