// src/store/useECIStore.ts
import { create } from "zustand";
import { fetchECINews } from "@/src/services/fetchECI";


type ECINews = {
  id: string;
  title: string;
  description: string;
  link: URL;
  pubDate: string;
  source: string;
  image?: string ;
};

type ECIState = {
  news: ECINews[];
  loading: boolean;
  fetchECI: () => Promise<void>;
};

export const useECIStore = create<ECIState>((set) => ({
  news: [],
  loading: false,

  fetchECI: async () => {
    set({ loading: true });
    try {
      const data = await fetchECINews();
      set({ news: data });
    } finally {
      set({ loading: false });
    }
  },
}));
