import { create } from "zustand";

/* ---------------- TYPES ---------------- */

export type Article = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
};

type ECINews = {
  id: string;
  title: string;
  description: string;
  link: string;
  pubDate: string;
  source: string;
  image?: string ;
};


/* ---------------- STORE ---------------- */

type LearnStore = {
  hindiArticles: Article[];
  translatedArticles: Article[] | null;
  news_: ECINews[];
  loading: boolean;

  setHindiArticles: (articles: Article[]) => void;
  setTranslatedArticles: (articles: Article[]) => void;
  setLoading: (value: boolean) => void;
  setNews_: (news_: ECINews[]) => void;

  reset: () => void;
};

/* ---------------- IMPLEMENTATION ---------------- */

export const useLearnStore = create<LearnStore>((set) => ({
  news_: [],
  hindiArticles: [],
  translatedArticles: null,
  loading: false,

  setHindiArticles: (hindiArticles) =>
    set({ hindiArticles }),

  setTranslatedArticles: (translatedArticles) =>
    set({ translatedArticles }),

  setNews_: (news_) =>
    set({ news_ }),

  setLoading: (loading) =>
    set({ loading }),

  /* 🔄 Used by pull-to-refresh */
  reset: () =>
    set({
      hindiArticles: [],
      translatedArticles: null,
      loading: false,
    }),
    
}));
