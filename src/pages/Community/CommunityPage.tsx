// ======================== CommunityPage.tsx (PREMIUM) ========================
import { Box, Typography, Button, Fade } from "@mui/material";
import { useState } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { PostCardPremium } from "../../components/Community/PostCardPremium";
import { CreatePostBar } from "../../components/Community/CreatePostBar";
import { CreatePostModal } from "../../components/Community/CreatePostModal";
export const CommunityPage = () => {
  const { posts, createPost, toggleLike, addComment } = useCommunity();
  const [openModal, setOpenModal] = useState(false);

  return (
    <Fade in timeout={500}>
      <Box sx={{ p: 4 }}>
        {/* HEADER */}
        <Typography
          variant="h3"
          sx={{
            color: "#fff",
            fontWeight: 700,
            mb: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          ✨ Cộng đồng điện ảnh – Premium
        </Typography>

        {/* CREATE BAR (sticky) */}
        <CreatePostBar onClick={() => setOpenModal(true)} />

        {/* LIST POSTS */}
        <Box sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4 }}>
          {posts.map((post) => (
            <PostCardPremium
              key={post.id}
              post={post}
              onLike={() => toggleLike(post.id)}
              onComment={(text) => addComment(post.id, text)}
            />
          ))}
        </Box>

        {/* MODAL */}
        <CreatePostModal
          open={openModal}
          onClose={() => setOpenModal(false)}
          onPost={createPost}
        />
      </Box>
    </Fade>
  );
};
