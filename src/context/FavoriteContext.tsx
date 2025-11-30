// ======================= FavoriteContext.tsx =======================
import { createContext, useContext, useState } from "react";

export interface FavoriteMovie {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  genres: string[];
  releaseDate?: string;
  ageRating: string;
  addedAt: number; // ⭐ THÊМ
}

interface FavoriteContextType {
  favorites: FavoriteMovie[];
  toggleFavorite: (movie: Omit<FavoriteMovie, "addedAt">) => void;
  isFavorite: (id: string) => boolean;
  clearFavorites: () => void;
  removeFavorite: (id: string) => void;
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider = ({ children }: { children: React.ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (movie: Omit<FavoriteMovie, "addedAt">) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);

      if (exists) {
        const updated = prev.filter((m) => m.id !== movie.id);
        localStorage.setItem("favorites", JSON.stringify(updated));
        return updated;
      }

      const newMovie: FavoriteMovie = {
        ...movie,
        addedAt: Date.now(),
      };

      const updated = [newMovie, ...prev];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((m) => m.id !== id);
    localStorage.setItem("favorites", JSON.stringify(updated));
    setFavorites(updated);
  };

  const clearFavorites = () => {
    localStorage.removeItem("favorites");
    setFavorites([]);
  };

  const isFavorite = (id: string) => favorites.some((m) => m.id === id);

  return (
    <FavoriteContext.Provider
      value={{ favorites, toggleFavorite, isFavorite, clearFavorites, removeFavorite }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoriteContext);
  if (!ctx) throw new Error("useFavorites must be used inside FavoriteProvider");
  return ctx;
};
