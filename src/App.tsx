import { Button, AppBar, Toolbar, Typography, Container } from "@mui/material";

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            🎬 Cinema ML Recommender
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome to Cinema ML Recommender
        </Typography>
        <Button variant="contained" color="primary">
          Get Recommended Movies
        </Button>
      </Container>
    </>
  );
}

export default App;
