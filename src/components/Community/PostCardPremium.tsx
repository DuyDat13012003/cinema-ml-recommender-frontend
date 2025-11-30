// ======================== PostCardPremium.tsx ========================
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Card,
  CardMedia,
  TextField,
  Collapse,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import { Post } from "../../context/CommunityContext";

export const PostCardPremium = ({
  post,
  onLike,
  onComment,
}: {
  post: Post;
  onLike: () => void;
  onComment: (text: string) => void;
}) => {
  const [comment, setComment] = useState("");
  const [showComments, setShowComments] = useState(false);

  return (
    <Card
      sx={{
        background: "rgba(255,255,255,0.05)",
        borderRadius: 4,
        p: 3,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255,255,255,0.1)",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      {/* HEADER */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar
          src={post.avatar}
          sx={{ width: 48, height: 48, border: "2px solid #4299e1" }}
        />
        <Box>
          <Typography sx={{ color: "#fff", fontWeight: 700 }}>
            {post.author}
          </Typography>
          <Typography sx={{ color: "#888", fontSize: "0.85rem" }}>
            {post.createdAt}
          </Typography>
        </Box>
      </Box>

      {/* CONTENT */}
      <Typography sx={{ color: "#ddd", mt: 2, mb: 2, lineHeight: 1.6 }}>
        {post.content}
      </Typography>

      {/* IMAGE (optional) */}
      {post.image && (
        <CardMedia
          component="img"
          image={post.image}
          sx={{
            borderRadius: 3,
            maxHeight: 420,
            width: "100%",
            objectFit: "cover",
            cursor: "pointer",
            transition: "0.3s",
            "&:hover": { opacity: 0.9 },
          }}
        />
      )}

      {/* ACTIONS */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 2 }}>
        <IconButton onClick={onLike}>
          {post.isLiked ? (
            <FavoriteIcon sx={{ color: "#ff6b6b", fontSize: 28 }} />
          ) : (
            <FavoriteBorderIcon sx={{ color: "#fff", fontSize: 28 }} />
          )}
        </IconButton>

        <IconButton onClick={() => setShowComments(!showComments)}>
          <ChatBubbleOutlineIcon sx={{ color: "#fff", fontSize: 26 }} />
        </IconButton>

        <IconButton>
          <BookmarkBorderIcon sx={{ color: "#fff", fontSize: 26 }} />
        </IconButton>

        <IconButton>
          <ShareIcon sx={{ color: "#fff", fontSize: 26 }} />
        </IconButton>

        <Typography sx={{ color: "#aaa", ml: "auto" }}>
          ❤️ {post.likes} lượt thích
        </Typography>
      </Box>

      {/* COMMENTS */}
      <Collapse in={showComments}>
        <Box sx={{ mt: 3 }}>
          {post.comments.map((c, i) => (
            <Box key={i} sx={{ mb: 2 }}>
              <Typography sx={{ color: "#ccc", fontWeight: 600 }}>
                {c.user}
              </Typography>
              <Typography sx={{ color: "#aaa", ml: 1 }}>{c.text}</Typography>
            </Box>
          ))}

          {/* INPUT COMMENT */}
          <TextField
            fullWidth
            placeholder="Viết bình luận..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && comment.trim()) {
                onComment(comment);
                setComment("");
              }
            }}
            sx={{
              mt: 2,
              input: { color: "#fff" },
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
              },
            }}
          />
        </Box>
      </Collapse>
    </Card>
  );
};
