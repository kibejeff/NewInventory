import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';
import { 
  createUser, 
  updateUser, 
  getUsers 
} from '../services/firebaseService';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: Omit<User, 'id'>) => Promise<void>;
  updateProfile: (userId: string, data: Partial<User>) => Promise<void>;
  users: User[];
  loadUsers: () => Promise<void>;
}

const ADMIN_CREDENTIALS = {
  id: '1',
  username: 'admin',
  password: 'admin123',
  role: 'admin' as const,
  email: 'admin@powerpay.com',
  name: 'System Administrator',
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      users: [ADMIN_CREDENTIALS],
      loadUsers: async () => {
        const users = await getUsers();
        set({ users: [ADMIN_CREDENTIALS, ...users] });
      },
      login: async (username: string, password: string) => {
        const users = get().users;
        const user = users.find((u) => u.username === username);
        
        if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
          set({
            user: ADMIN_CREDENTIALS,
            isAuthenticated: true,
          });
        } else if (user) {
          set({
            user,
            isAuthenticated: true,
          });
        } else {
          throw new Error('Invalid credentials');
        }
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      register: async (userData) => {
        const users = get().users;
        if (users.some((u) => u.username === userData.username)) {
          throw new Error('Username already exists');
        }

        const newUser = await createUser(userData);
        set((state) => ({
          users: [...state.users, newUser],
        }));
      },
      updateProfile: async (userId, data) => {
        await updateUser(userId, data);
        set((state) => ({
          users: state.users.map((user) =>
            user.id === userId ? { ...user, ...data } : user
          ),
          user: state.user?.id === userId ? { ...state.user, ...data } : state.user,
        }));
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);