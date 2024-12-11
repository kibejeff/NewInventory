import React, { useState } from 'react';
import { format } from 'date-fns';
import ReactPaginate from 'react-paginate';
import { useInventoryStore } from '../store/inventoryStore';
import { useAuthStore } from '../store/authStore';
import CheckoutModal from './CheckoutModal';
import type { InventoryItem } from '../types';
import { Edit2, ShoppingCart } from 'lucide-react';

const ITEMS_PER_PAGE = 10;

export default function InventoryTable() {
  const { items, checkoutItem, updateItem } = useInventoryStore();
  const { user } = useAuthStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [checkoutItem_, setCheckoutItem] = useState<InventoryItem | null>(null);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

  const offset = currentPage * ITEMS_PER_PAGE;
  const pageCount = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems = items.slice(offset, offset + ITEMS_PER_PAGE);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const handleCheckout = (workerId: string, quantity: number) => {
    if (checkoutItem_) {
      checkoutItem(checkoutItem_.id, workerId, quantity);
      setCheckoutItem(null);
    }
  };

  const handleUpdateItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      updateItem(editingItem.id, editingItem);
      setEditingItem(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last Updated
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentItems.map((item: InventoryItem) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${item.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {format(new Date(item.lastUpdated), 'MMM d, yyyy HH:mm')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2">
                    {user?.role === 'admin' && (
                      <button
                        onClick={() => setEditingItem(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                    )}
                    {item.quantity > 0 && (
                      <button
                        onClick={() => setCheckoutItem(item)}
                        className="text-green-600 hover:text-green-900"
                      >
                        <ShoppingCart className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ReactPaginate
        previousLabel="Previous"
        nextLabel="Next"
        pageCount={pageCount}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center gap-2 mt-4"
        previousClassName="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        nextClassName="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        pageClassName="px-3 py-1 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
        activeClassName="bg-indigo-600 text-white hover:bg-indigo-700"
        disabledClassName="opacity-50 cursor-not-allowed"
      />

      {checkoutItem_ && (
        <CheckoutModal
          itemId={checkoutItem_.id}
          itemName={checkoutItem_.name}
          maxQuantity={checkoutItem_.quantity}
          onCheckout={handleCheckout}
          onClose={() => setCheckoutItem(null)}
        />
      )}

      {editingItem && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium mb-4">Edit Item</h2>
            <form onSubmit={handleUpdateItem} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  required
                  value={editingItem.name}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({ ...editingItem, description: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={editingItem.quantity}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      quantity: parseInt(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      price: parseFloat(e.target.value),
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}