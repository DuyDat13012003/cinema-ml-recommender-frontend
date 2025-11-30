import { Dialog, DialogContent, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
  trailerUrl?: string;
}

export const TrailerModal = ({ open, onClose, trailerUrl }: TrailerModalProps) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          backgroundColor: 'transparent',
          boxShadow: 'none',
        },
      }}
    >
      <DialogContent sx={{ position: 'relative', p: 0 }}>
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: -40,
            right: 0,
            color: '#fff',
            zIndex: 10,
          }}
        >
          <CloseIcon fontSize="large" />
        </IconButton>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '56.25%',
          }}
        >
          <iframe
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '8px',
            }}
            src={trailerUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ'}
            title="Movie Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};