import { Box, Typography, Grid, Card, CardMedia, CardContent, Container } from '@mui/material';

interface Cast {
  id: string;
  name: string;
  character: string;
  imageUrl: string;
}

interface CastSectionProps {
  cast: Cast[];
}

export const CastSection = ({ cast }: CastSectionProps) => {
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
        Cast
      </Typography>

      <Grid container spacing={3}>
        {cast.map((actor) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={actor.id}>
            <Card
              sx={{
                backgroundColor: '#1a1a2e',
                borderRadius: 2,
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <CardMedia
                component="img"
                height="300"
                image={actor.imageUrl}
                alt={actor.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#fff',
                    fontWeight: 600,
                    mb: 1,
                  }}
                >
                  {actor.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#4299e1',
                  }}
                >
                  as {actor.character}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};