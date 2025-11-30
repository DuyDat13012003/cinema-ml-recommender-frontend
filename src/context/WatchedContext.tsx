// ======================= WatchedContext.tsx =======================
import { createContext, useContext, useState } from "react";

export interface WatchedMovie {
  id: string;
  title: string;
  posterUrl: string;
  rating: number;
  genres: string[];
  releaseDate?: string;
  watchedAt: number;  // ⭐ NEW
}

interface WatchedContextType {
  watched: WatchedMovie[];
  addWatched: (movie: Omit<WatchedMovie, "watchedAt">) => void;
  removeWatched: (id: string) => void;
  clearWatched: () => void;
  hasWatched: (id: string) => boolean;
}

const WatchedContext = createContext<WatchedContextType | undefined>(undefined);

export const WatchedProvider = ({ children }: { children: React.ReactNode }) => {
  const [watched, setWatched] = useState<WatchedMovie[]>(() => {
    const saved = localStorage.getItem("watchedMovies");
    return saved ? JSON.parse(saved) : [];
  });

  const addWatched = (movie: Omit<WatchedMovie, "watchedAt">) => {
    setWatched((prev) => {
      if (prev.some((m) => m.id === movie.id)) return prev;

      const newMovie: WatchedMovie = {
        ...movie,
        watchedAt: Date.now(),
      };

      const updated = [newMovie, ...prev];
      localStorage.setItem("watchedMovies", JSON.stringify(updated));
      return updated;
    });
  };

  const removeWatched = (id: string) => {
    const updated = watched.filter((m) => m.id !== id);
    localStorage.setItem("watchedMovies", JSON.stringify(updated));
    setWatched(updated);
  };

  const clearWatched = () => {
    localStorage.removeItem("watchedMovies");
    setWatched([]);
  };

  const hasWatched = (id: string) => watched.some((m) => m.id === id);

  return (
    <WatchedContext.Provider
      value={{ watched, addWatched, removeWatched, clearWatched, hasWatched }}
    >
      {children}
    </WatchedContext.Provider>
  );
};

export const useWatched = () => {
  const ctx = useContext(WatchedContext);
  if (!ctx) throw new Error("useWatched must be used inside WatchedProvider");
  return ctx;
};
