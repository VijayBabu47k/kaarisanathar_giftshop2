import { useEffect, useState } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useThemeMode } from '../context/ThemeContext';

const slides = [
  {
    title: 'Make Every Moment\nUnforgettable',
    subtitle: 'Discover handpicked gifts for love, friendship, and celebration.',
    image: 'https://images.unsplash.com/photo-1575521669959-4f46e5c12e1c?w=1200&h=800&fit=crop',
    gradient: 'rgba(255,64,129,0.12)',
  },
  {
    title: 'Gifts That Speak\nFrom The Heart',
    subtitle: 'Custom photo gifts, personalized keychains, and so much more.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&h=800&fit=crop',
    gradient: 'rgba(124,77,255,0.12)',
  },
  {
    title: 'Celebrate Love\nWith Perfect Gifts',
    subtitle: 'Couple rings, heart boxes, message bottles — starting at just ₹10.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200&h=800&fit=crop',
    gradient: 'rgba(255,215,0,0.08)',
  },
  {
    title: 'Light Up Their\nSmile Today',
    subtitle: 'LED lamps, neon lights, breathing teddies and more lighting gifts.',
    image: 'https://images.unsplash.com/photo-1513506003901-1e6c229e2d15?w=1200&h=800&fit=crop',
    gradient: 'rgba(0,230,118,0.08)',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  useEffect(() => {
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <Box
      sx={{
        position: 'relative',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: isDark
            ? 'linear-gradient(180deg, rgba(10,10,15,0.85) 0%, rgba(10,10,15,0.7) 50%, rgba(10,10,15,0.95) 100%)'
            : 'linear-gradient(180deg, rgba(245,240,255,0.9) 0%, rgba(245,240,255,0.75) 50%, rgba(245,240,255,0.95) 100%)',
          zIndex: 1,
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${slide.gradient} 0%, transparent 70%)`,
          top: '10%',
          left: '-5%',
          filter: 'blur(40px)',
          zIndex: 2,
          animation: 'pulse 4s ease-in-out infinite',
          '@keyframes pulse': {
            '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
            '50%': { transform: 'scale(1.2)', opacity: 0.8 },
          },
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 3, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <Typography
            variant="overline"
            sx={{ color: '#ff4081', letterSpacing: 6, fontSize: { xs: '0.7rem', md: '0.85rem' }, mb: 2, display: 'block' }}
          >
            Premium Gift Collection
          </Typography>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.2rem', sm: '3.2rem', md: '4.2rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                whiteSpace: 'pre-line',
                background: isDark
                  ? 'linear-gradient(135deg, #ffffff 0%, #ff79b0 50%, #b47cff 100%)'
                  : 'linear-gradient(135deg, #1a1a2e 0%, #c60055 50%, #3f1dcb 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: 'text.secondary',
                fontWeight: 400,
                mb: 5,
                maxWidth: 500,
                mx: 'auto',
                fontSize: { xs: '0.95rem', md: '1.15rem' },
                lineHeight: 1.7,
              }}
            >
              {slide.subtitle}
            </Typography>
          </motion.div>
        </AnimatePresence>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            sx={{ px: 5, py: 1.5, fontSize: '1rem' }}
          >
            Explore Collection
          </Button>
        </motion.div>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mt: 4 }}>
          {slides.map((_, i) => (
            <Box
              key={i}
              onClick={() => setCurrent(i)}
              sx={{
                width: i === current ? 32 : 10,
                height: 10,
                borderRadius: 5,
                background: i === current
                  ? 'linear-gradient(135deg, #ff4081, #7c4dff)'
                  : isDark ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </Box>
      </Container>

      <motion.div
        style={{ position: 'absolute', bottom: 40, zIndex: 3 }}
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <FiChevronDown style={{ fontSize: 36, color: '#b0a0c0' }} />
      </motion.div>
    </Box>
  );
}
