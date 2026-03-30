import { createTheme } from '@mui/material/styles';

export function getTheme(mode) {
  const isDark = mode === 'dark';

  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#ff4081',
        light: '#ff79b0',
        dark: '#c60055',
      },
      secondary: {
        main: '#7c4dff',
        light: '#b47cff',
        dark: '#3f1dcb',
      },
      background: {
        default: isDark ? '#0a0a0f' : '#f5f0ff',
        paper: isDark ? '#12121a' : '#ffffff',
      },
      text: {
        primary: isDark ? '#f0e6ff' : '#1a1a2e',
        secondary: isDark ? '#b0a0c0' : '#666680',
      },
    },
    typography: {
      fontFamily: '"Inter", "Poppins", "Roboto", sans-serif',
      h1: { fontWeight: 800, letterSpacing: '-0.02em' },
      h2: { fontWeight: 700, letterSpacing: '-0.01em' },
      h3: { fontWeight: 700 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      button: { fontWeight: 600, letterSpacing: '0.02em' },
    },
    shape: { borderRadius: 16 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            padding: '10px 24px',
            fontSize: '0.95rem',
          },
          containedPrimary: {
            background: 'linear-gradient(135deg, #ff4081 0%, #7c4dff 100%)',
            boxShadow: '0 4px 20px rgba(255, 64, 129, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #ff79b0 0%, #b47cff 100%)',
              boxShadow: '0 6px 30px rgba(255, 64, 129, 0.5)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            background: isDark ? 'rgba(18, 18, 26, 0.8)' : 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 10 },
        },
      },
    },
  });
}
