import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { InventoryItem, CheckoutRecord } from '../types';

interface InventoryState {
  items: InventoryItem[];
  checkoutRecords: CheckoutRecord[];
  addItem: (item: Omit<InventoryItem, 'id'>) => void;
  updateItem: (id: string, item: Partial<InventoryItem>) => void;
  checkoutItem: (itemId: string, userId: string, quantity: number) => void;
  returnItem: (recordId: string) => void;
}

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: [],
      checkoutRecords: [],
      addItem: (item) => {
        set((state) => ({
          items: [...state.items, { ...item, id: crypto.randomUUID() }],
        }));
      },
      updateItem: (id, updatedItem) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? { ...item, ...updatedItem, lastUpdated: new Date() }
              : item
          ),
        }));
      },
      checkoutItem: (itemId, userId, quantity) => {
        set((state) => {
          const item = state.items.find((i) => i.id === itemId);
          if (!item || item.quantity < quantity) return state;

          const record: CheckoutRecord = {
            id: crypto.randomUUID(),
            itemId,
            userId,
            checkoutDate: new Date(),
            quantity,
            status: 'checked-out',
          };

          return {
            checkoutRecords: [...state.checkoutRecords, record],
            items: state.items.map((item) =>
              item.id === itemId
                ? { ...item, quantity: item.quantity - quantity, lastUpdated: new Date() }
                : item
            ),
          };
        });
      },
      returnItem: (recordId) => {
        set((state) => {
          const record = state.checkoutRecords.find((r) => r.id === recordId);
          if (!record || record.status === 'returned') return state;

          return {
            checkoutRecords: state.checkoutRecords.map((r) =>
              r.id === recordId
                ? { ...r, status: 'returned', returnDate: new Date() }
                : r
            ),
            items: state.items.map((item) =>
              item.id === record.itemId
                ? { ...item, quantity: item.quantity + record.quantity, lastUpdated: new Date() }
                : item
            ),
          };
        });
      },
    }),
    {
      name: 'inventory-storage',
    }
  )
);