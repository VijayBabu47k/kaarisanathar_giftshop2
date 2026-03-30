import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Badge, Box, Button,
  Drawer, List, ListItemButton, ListItemText, useMediaQuery, useTheme,
} from '@mui/material';
import { FiShoppingCart, FiMenu, FiX, FiSun, FiMoon, FiHome, FiGrid, FiInfo, FiPhone } from 'react-icons/fi';
import { BsGift } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useThemeMode } from '../context/ThemeContext';

const navLinks = [
  { label: 'Home', path: '/', icon: <FiHome /> },
  { label: 'Categories', path: '/categories', icon: <FiGrid /> },
  { label: 'About', path: '/about', icon: <FiInfo /> },
  { label: 'Contact', path: '/contact', icon: <FiPhone /> },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems } = useCart();
  const { mode, toggleTheme } = useThemeMode();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDark = mode === 'dark';

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          background: isDark ? 'rgba(10,10,15,0.85)' : 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
          boxShadow: isDark ? '0 4px 30px rgba(0,0,0,0.3)' : '0 4px 30px rgba(0,0,0,0.08)',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }}
              onClick={() => navigate('/')}
            >
              <BsGift style={{ color: '#ff4081', fontSize: 28 }} />
              <Typography
                variant="h6"
                sx={{
                  background: 'linear-gradient(135deg, #ff4081, #7c4dff)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontWeight: 800,
                  fontSize: { xs: '1.1rem', md: '1.4rem' },
                }}
              >
                GiftShop
              </Typography>
            </Box>
          </motion.div>

          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1 }}>
              {navLinks.map((link) => (
                <Button
                  key={link.path}
                  startIcon={link.icon}
                  onClick={() => navigate(link.path)}
                  sx={{
                    color: location.pathname === link.path ? '#ff4081' : isDark ? '#b0a0c0' : '#666',
                    fontWeight: location.pathname === link.path ? 700 : 500,
                    '&:hover': { color: '#ff4081' },
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <motion.div whileTap={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <IconButton onClick={toggleTheme} sx={{ color: isDark ? '#ffd54f' : '#7c4dff' }}>
                {isDark ? <FiSun /> : <FiMoon />}
              </IconButton>
            </motion.div>

            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <IconButton onClick={() => navigate('/cart')} sx={{ color: isDark ? '#f0e6ff' : '#1a1a2e' }}>
                <Badge
                  badgeContent={totalItems}
                  sx={{ '& .MuiBadge-badge': { background: 'linear-gradient(135deg, #ff4081, #7c4dff)', color: '#fff', fontWeight: 700 } }}
                >
                  <FiShoppingCart />
                </Badge>
              </IconButton>
            </motion.div>

            {isMobile && (
              <IconButton onClick={() => setMobileOpen(true)} sx={{ color: isDark ? '#f0e6ff' : '#1a1a2e' }}>
                <FiMenu />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        PaperProps={{
          sx: { width: 280, background: isDark ? 'rgba(10,10,15,0.98)' : '#fff', backdropFilter: 'blur(20px)' },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ color: isDark ? '#b0a0c0' : '#666' }}>
            <FiX />
          </IconButton>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.path}
              selected={location.pathname === link.path}
              onClick={() => { navigate(link.path); setMobileOpen(false); }}
              sx={{
                mx: 2, borderRadius: 2, mb: 0.5,
                '&.Mui-selected': { background: 'linear-gradient(135deg, rgba(255,64,129,0.15), rgba(124,77,255,0.15))' },
              }}
            >
              <Box sx={{ mr: 2, color: '#ff4081', display: 'flex' }}>{link.icon}</Box>
              <ListItemText primary={link.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      <Toolbar />
    </>
  );
}
