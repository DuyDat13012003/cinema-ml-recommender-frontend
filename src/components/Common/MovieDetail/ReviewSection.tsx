import { Box, Typography, TextField, Button, Card, CardContent, Avatar, Rating, Container, IconButton } from '@mui/material';
import { useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface Review {
  id: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  content: string;
  likes: number;
}

interface ReviewSectionProps {
  reviews: Review[];
  onSubmitReview?: (content: string, rating: number) => void;
}

export const ReviewSection = ({ reviews, onSubmitReview }: ReviewSectionProps) => {
  const [reviewText, setReviewText] = useState('');
  const [ratingValue, setRatingValue] = useState(5);

  const handleSubmit = () => {
    if (reviewText.trim() && onSubmitReview) {
      onSubmitReview(reviewText, ratingValue);
      setReviewText('');
      setRatingValue(5);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        sx={{
          color: '#fff',
          fontWeight: 700,
          mb: 4,
        }}
      >
        Reviews & Comments
      </Typography>

      {/* Write Review */}
      <Card
        sx={{
          backgroundColor: '#1a1a2e',
          p: 3,
          borderRadius: 2,
          mb: 4,
          border: '1px solid rgba(66, 153, 225, 0.2)',
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#fff',
            fontWeight: 600,
            mb: 2,
          }}
        >
          Write a Review
        </Typography>

        <Box sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#aaa', mb: 1 }}>
            Your Rating
          </Typography>
          <Rating
            value={ratingValue}
            onChange={(_, value) => setRatingValue(value || 5)}
            sx={{
              '& .MuiRating-iconFilled': {
                color: '#FFD700',
              },
            }}
          />
        </Box>

        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="Share your thoughts about this movie..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          sx={{
            mb: 2,
            '& .MuiOutlinedInput-root': {
              backgroundColor: '#0f0f1e',
              color: '#fff',
              '& fieldset': {
                borderColor: '#333',
              },
              '&:hover fieldset': {
                borderColor: '#4299e1',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4299e1',
              },
            },
            '& .MuiOutlinedInput-input::placeholder': {
              color: '#aaa',
              opacity: 0.7,
            },
          }}
        />

        <Button
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            backgroundColor: '#4299e1',
            color: '#fff',
            fontWeight: 600,
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#3182ce',
            },
          }}
          onClick={handleSubmit}
        >
          Post Review
        </Button>
      </Card>

      {/* Reviews List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {reviews.map((review) => (
          <Card
            key={review.id}
            sx={{
              backgroundColor: '#1a1a2e',
              p: 3,
              borderRadius: 2,
              border: '1px solid rgba(66, 153, 225, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Avatar
                  src={review.avatar}
                  alt={review.author}
                  sx={{ width: 48, height: 48 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#fff',
                      fontWeight: 600,
                    }}
                  >
                    {review.author}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    <Rating value={review.rating} readOnly size="small" sx={{ '& .MuiRating-iconFilled': { color: '#FFD700' } }} />
                    <Typography variant="body2" sx={{ color: '#aaa' }}>
                      {review.date}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <IconButton size="small" sx={{ color: '#aaa' }}>
                <MoreVertIcon />
              </IconButton>
            </Box>

            <Typography
              variant="body2"
              sx={{
                color: '#ddd',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              {review.content}
            </Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button size="small" sx={{ color: '#4299e1', textTransform: 'none' }}>
                👍 Helpful ({review.likes})
              </Button>
              <Button size="small" sx={{ color: '#aaa', textTransform: 'none', '&:hover': { color: '#ff6b6b' } }}>
                👎 Not Helpful
              </Button>
            </Box>
          </Card>
        ))}
      </Box>
    </Container>
  );
};