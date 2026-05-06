import { create } from 'zustand';
import { dbService } from '../services/dbService';

export const usePortfolioStore = create((set, get) => ({
  portfolio: null,
  loading: false,
  error: null,
  isDirty: false,

  fetchPortfolio: async (uid) => {
    set({ loading: true, error: null });
    try {
      const data = await dbService.getPortfolio(uid);
      set({ portfolio: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateLocalPortfolio: (section, data) => {
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        sections: {
          ...state.portfolio.sections,
          [section]: data
        }
      },
      isDirty: true
    }));
  },

  updateProfile: (data) => {
    set((state) => ({
      portfolio: {
        ...state.portfolio,
        ...data
      },
      isDirty: true
    }));
  },

  savePortfolio: async (uid) => {
    const { portfolio } = get();
    set({ loading: true });
    try {
      await dbService.updatePortfolio(uid, portfolio);
      set({ loading: false, isDirty: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  resetDirty: () => set({ isDirty: false })
}));
