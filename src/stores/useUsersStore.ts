import { create } from "zustand";
import type { User } from "@/types/api";
import { ApiService } from "@/services/api";

interface UsersState {
  users: User[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
  hasNextPage: boolean;

  loadUsers: (page?: number) => Promise<void>;
  loadMoreUsers: () => Promise<void>;
  resetToPageOne: () => Promise<void>;
  clearUsers: () => void;
  setError: (error: string | null) => void;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  // Initial state
  users: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
  hasNextPage: false,

  // Actions
  loadUsers: async (page = 1) => {
    set({ isLoading: true, error: null });

    try {
      const response = await ApiService.getUsers({ page, count: 6 });

      if (response.success) {
        const { users } = get();

        set({
          users: page === 1 ? response.users : [...users, ...response.users],
          currentPage: response.page,
          totalPages: response.total_pages,
          hasNextPage: response.links.next_url !== null,
          isLoading: false,
          error: null,
        });
      } else {
        set({
          error: response.message || "Failed to load users",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to load users",
        isLoading: false,
      });
    }
  },

  loadMoreUsers: async () => {
    const { currentPage, hasNextPage, isLoading } = get();

    if (!hasNextPage || isLoading) return;

    await get().loadUsers(currentPage + 1);
  },

  resetToPageOne: async () => {
    set({
      users: [],
      currentPage: 1,
      hasNextPage: false,
      error: null,
    });

    await get().loadUsers(1);
  },

  clearUsers: () => {
    set({
      users: [],
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      error: null,
    });
  },

  setError: (error: string | null) => {
    set({ error, isLoading: false });
  },
}));
