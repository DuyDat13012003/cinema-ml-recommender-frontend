import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { v4 as uuid } from "uuid";

export interface Post {
  id: string;
  author: string;
  avatar: string;
  content: string;
  image?: string;
  likes: number;
  isLiked: boolean;
  comments: { user: string; text: string }[];
  createdAt: string;
}

interface CommunityContextType {
  posts: Post[];
  createPost: (content: string, image?: string) => void;
  toggleLike: (id: string) => void;
  addComment: (id: string, text: string) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  // ⭐ Load posts từ localStorage
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem("community_posts");
    if (saved) return JSON.parse(saved);

    // ⭐ Nếu chưa có localStorage → dùng data mặc định
    return [
      {
        id: uuid(),
        author: "Duyen",
        avatar: "https://i.pravatar.cc/150?img=57",
        content:
          "Hôm qua đi xem Avatar 2 xong cảm giác muốn xem lại liền! Visual đỉnh thật sự 💙🔥",
        image: "https://images.unsplash.com/photo-1574375927938-df81e6f5c3f7?w=1200",
        likes: 32,
        isLiked: false,
        comments: [
          { user: "Minh", text: "Phim công nhận đỉnh thật 😍" },
          { user: "An", text: "Mình khóc đoạn cuối luôn 😭" },
        ],
        createdAt: "2 giờ trước",
      },
    ];
  });

  // ⭐ SAVE posts vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("community_posts", JSON.stringify(posts));
  }, [posts]);

  // ================== CREATE POST ==================
  const createPost = (content: string, image?: string) => {
    const newPost: Post = {
      id: uuid(),
      author: "You",
      avatar: "https://i.pravatar.cc/150?img=12",
      content,
      image,
      likes: 0,
      isLiked: false,
      comments: [],
      createdAt: "Vừa xong",
    };

    setPosts((prev) => [newPost, ...prev]);
  };

  // ================== TOGGLE LIKE ==================
  const toggleLike = (id: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              isLiked: !p.isLiked,
              likes: p.isLiked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  // ================== ADD COMMENT ==================
  const addComment = (id: string, text: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, comments: [...p.comments, { user: "You", text }] }
          : p
      )
    );
  };

  return (
    <CommunityContext.Provider value={{ posts, createPost, toggleLike, addComment }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const ctx = useContext(CommunityContext);
  if (!ctx) throw new Error("useCommunity must be used inside CommunityProvider");
  return ctx;
};
