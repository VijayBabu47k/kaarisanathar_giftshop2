import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Grid, Card, CardMedia, Typography, Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';
import products from '../data/products.json';

export default function CategoriesPage() {
  const navigate = useNavigate();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const categoryData = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      if (!map[p.category]) {
        map[p.category] = { name: p.category, image: p.image, count: 0, minPrice: p.price };
      }
      map[p.category].count++;
      if (p.price < map[p.category].minPrice) map[p.category].minPrice = p.price;
    });
    return Object.values(map);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>Categories - GiftShop | Browse All Gift Categories</title>
        <meta name="description" content="Browse gift categories: Keychains, Rings, Photo Gifts, Lighting Gifts, Teddy Collection, Birthday Decoration and more." />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography
          variant="overline"
          sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', textAlign: 'center' }}
        >
          Browse
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 5,
            fontWeight: 800,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            background: isDark
              ? 'linear-gradient(135deg, #fff, #b0a0c0)'
              : 'linear-gradient(135deg, #1a1a2e, #7c4dff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          All Categories
        </Typography>
      </motion.div>

      <Grid container spacing={3}>
        {categoryData.map((cat, i) => (
          <Grid key={cat.name} size={{ xs: 6, sm: 4, md: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8 }}
            >
              <Card
                onClick={() => navigate(`/?category=${encodeURIComponent(cat.name)}`)}
                sx={{
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&:hover .cat-img': { transform: 'scale(1.1)' },
                }}
              >
                <Box sx={{ position: 'relative', pt: '100%', overflow: 'hidden' }}>
                  <CardMedia
                    component="img"
                    image={cat.image}
                    alt={cat.name}
                    className="cat-img"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.8) 100%)',
                    }}
                  />
                  <Box sx={{ position: 'absolute', bottom: 12, left: 12, right: 12 }}>
                    <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.95rem' }}>
                      {cat.name}
                    </Typography>
                    <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem' }}>
                      {cat.count} items · from ₹{cat.minPrice}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
