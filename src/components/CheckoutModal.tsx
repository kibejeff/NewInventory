import React, { useState } from 'react';
import { useWorkerStore } from '../store/workerStore';
import { useAuthStore } from '../store/authStore';

interface CheckoutModalProps {
  itemId: string;
  itemName: string;
  maxQuantity: number;
  onCheckout: (workerId: string, quantity: number) => void;
  onClose: () => void;
}

export default function CheckoutModal({
  itemId,
  itemName,
  maxQuantity,
  onCheckout,
  onClose,
}: CheckoutModalProps) {
  const { workers } = useWorkerStore();
  const { user } = useAuthStore();
  const [selectedWorker, setSelectedWorker] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const workerId = user?.role === 'admin' ? selectedWorker : user?.id;
    if (workerId) {
      onCheckout(workerId, quantity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-medium mb-4">Checkout {itemName}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {user?.role === 'admin' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Assign to Worker
              </label>
              <select
                required
                value={selectedWorker}
                onChange={(e) => setSelectedWorker(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="">Select a worker</option>
                {workers
                  .filter((w) => w.status === 'active')
                  .map((worker) => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name} ({worker.employeeId})
                    </option>
                  ))}
              </select>
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quantity (Max: {maxQuantity})
            </label>
            <input
              type="number"
              required
              min="1"
              max={maxQuantity}
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Confirm Checkout
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}