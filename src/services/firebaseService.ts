import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs,
  query,
  where,
  serverTimestamp 
} from 'firebase/firestore';
import type { User, Worker, InventoryItem, CheckoutRecord } from '../types';

// Collections
const USERS = 'users';
const WORKERS = 'workers';
const INVENTORY = 'inventory';
const CHECKOUTS = 'checkouts';
const CATEGORIES = 'categories';

// User Services
export const createUser = async (userData: Omit<User, 'id'>) => {
  const docRef = await addDoc(collection(db, USERS), {
    ...userData,
    createdAt: serverTimestamp()
  });
  return { ...userData, id: docRef.id };
};

export const updateUser = async (id: string, data: Partial<User>) => {
  const userRef = doc(db, USERS, id);
  await updateDoc(userRef, { ...data, updatedAt: serverTimestamp() });
};

export const getUsers = async () => {
  const querySnapshot = await getDocs(collection(db, USERS));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
};

// Worker Services
export const createWorker = async (workerData: Omit<Worker, 'id'>) => {
  const docRef = await addDoc(collection(db, WORKERS), {
    ...workerData,
    createdAt: serverTimestamp()
  });
  return { ...workerData, id: docRef.id };
};

export const updateWorker = async (id: string, data: Partial<Worker>) => {
  const workerRef = doc(db, WORKERS, id);
  await updateDoc(workerRef, { ...data, updatedAt: serverTimestamp() });
};

export const getWorkers = async () => {
  const querySnapshot = await getDocs(collection(db, WORKERS));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Worker[];
};

// Inventory Services
export const createInventoryItem = async (itemData: Omit<InventoryItem, 'id'>) => {
  const docRef = await addDoc(collection(db, INVENTORY), {
    ...itemData,
    createdAt: serverTimestamp(),
    lastUpdated: serverTimestamp()
  });
  return { ...itemData, id: docRef.id };
};

export const updateInventoryItem = async (id: string, data: Partial<InventoryItem>) => {
  const itemRef = doc(db, INVENTORY, id);
  await updateDoc(itemRef, { 
    ...data, 
    lastUpdated: serverTimestamp() 
  });
};

export const getInventoryItems = async () => {
  const querySnapshot = await getDocs(collection(db, INVENTORY));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as InventoryItem[];
};

// Checkout Services
export const createCheckoutRecord = async (checkoutData: Omit<CheckoutRecord, 'id'>) => {
  const docRef = await addDoc(collection(db, CHECKOUTS), {
    ...checkoutData,
    checkoutDate: serverTimestamp()
  });
  return { ...checkoutData, id: docRef.id };
};

export const updateCheckoutRecord = async (id: string, data: Partial<CheckoutRecord>) => {
  const recordRef = doc(db, CHECKOUTS, id);
  await updateDoc(recordRef, {
    ...data,
    returnDate: data.status === 'returned' ? serverTimestamp() : null
  });
};

export const getCheckoutRecords = async () => {
  const querySnapshot = await getDocs(collection(db, CHECKOUTS));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as CheckoutRecord[];
};

// Category Services
export const createCategory = async (name: string) => {
  const docRef = await addDoc(collection(db, CATEGORIES), {
    name,
    createdAt: serverTimestamp()
  });
  return { id: docRef.id, name };
};

export const updateCategory = async (id: string, name: string) => {
  const categoryRef = doc(db, CATEGORIES, id);
  await updateDoc(categoryRef, { 
    name,
    updatedAt: serverTimestamp() 
  });
};

export const deleteCategory = async (id: string) => {
  await deleteDoc(doc(db, CATEGORIES, id));
};

export const getCategories = async () => {
  const querySnapshot = await getDocs(collection(db, CATEGORIES));
  return querySnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
};