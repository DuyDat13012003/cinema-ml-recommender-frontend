// src/App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { AppRouter } from './router';     // ⚡ Dùng AppRouter mới
import { AuthProvider } from './context/AuthContext';   // ⚡ Thêm AuthProvider

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4299e1',
    },
    background: {
      default: '#0f0f1e',
      paper: '#1a1a2e',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>   {/* 💛 BỌC AUTH Ở ĐÂY */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppRouter />  {/* 💛 DÙNG ROUTER MỚI */}
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
