import React from 'react'

function ConfirmModal({ isOpen, onClose, onConfirm, title, message }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-slide-up transform">
        <div className="text-center mb-6">
          <div className="text-5xl mb-4">⚠️</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600">{message}</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Quit Quiz
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmModal
