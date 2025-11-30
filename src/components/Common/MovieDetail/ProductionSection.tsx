import { Box, Typography, Grid, Paper, Container } from "@mui/material";

interface Production {
  title: string;
  value: string;
}

interface ProductionSectionProps {
  production: Production[];
}

export const ProductionSection = ({ production }: ProductionSectionProps) => {
  return (
    <Container maxWidth="lg" sx={{ py: 6, backgroundColor: "#0f0f1e" }}>
      <Typography
        variant="h4"
        sx={{
          color: "#fff",
          fontWeight: 700,
          mb: 4,
        }}
      >
        Production Info
      </Typography>

      <Grid container spacing={3}>
        {production.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
            <Paper
              sx={{
                backgroundColor: "#1a1a2e",
                p: 3,
                borderRadius: 2,
                border: "1px solid rgba(66, 153, 225, 0.2)",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: "#aaa",
                  mb: 1,
                }}
              >
                {item.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {item.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};
