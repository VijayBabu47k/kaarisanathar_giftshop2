import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, Grid, Box, Typography, Card, Avatar, Button, Chip } from '@mui/material';
import {
  FiHeart, FiStar, FiTruck, FiGift, FiShield, FiClock,
} from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroSection from '../components/HeroSection';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import ProductCard from '../components/ProductCard';
import { useThemeMode } from '../context/ThemeContext';
import products from '../data/products.json';

const occasions = [
  { label: 'Birthday', emoji: '🎂', search: 'Birthday' },
  { label: 'Anniversary', emoji: '💍', search: 'Couple' },
  { label: 'Valentine\'s Day', emoji: '❤️', search: 'Heart' },
  { label: 'Friendship Day', emoji: '🤝', search: 'Friends' },
  { label: 'Raksha Bandhan', emoji: '🪢', search: 'Brother' },
  { label: 'Diwali', emoji: '🪔', search: 'Light' },
  { label: 'Wedding', emoji: '💒', search: 'Couple Ring' },
  { label: 'Housewarming', emoji: '🏠', search: 'Frame' },
];

const howItWorks = [
  { icon: <FiGift />, title: 'Choose a Gift', desc: 'Browse our 500+ handpicked gifts across 13 categories. Use filters to find the perfect match.' },
  { icon: <BsWhatsapp />, title: 'Order via WhatsApp', desc: 'Add to cart, fill your details, and place your order directly on WhatsApp. It\'s that simple!' },
  { icon: <FiTruck />, title: 'We Deliver', desc: 'We carefully pack and deliver your gift. Same-day delivery available in Hyderabad!' },
  { icon: <FiHeart />, title: 'Spread Smiles', desc: 'Watch your loved one\'s face light up with the perfect gift. That\'s our reward!' },
];

const trustBadges = [
  { icon: <FiShield />, label: 'Quality Guaranteed' },
  { icon: <FiTruck />, label: 'Free Delivery' },
  { icon: <FiClock />, label: 'Same Day Available' },
  { icon: <FiStar />, label: '4.9/5 Rating' },
];

export default function HomePage() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [search, setSearch] = useState('');
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const headingGradient = isDark
    ? 'linear-gradient(135deg, #fff 0%, #b0a0c0 100%)'
    : 'linear-gradient(135deg, #1a1a2e 0%, #7c4dff 100%)';

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    let result = products;
    if (selectedCategory !== 'All') result = result.filter((p) => p.category === selectedCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
      );
    }
    return result;
  }, [selectedCategory, search]);

  const trending = useMemo(() => [...products].sort(() => 0.5 - Math.random()).slice(0, 4), []);

  const handleOccasion = (occ) => {
    setSelectedCategory('All');
    setSearch(occ.search);
    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>GiftShop - Premium Gifts for Every Occasion | Keychains, Photo Gifts, Couple Rings, Birthday Decoration</title>
        <meta name="description" content="Discover 500+ handpicked premium gifts for love, friendship, and celebration. Keychains from ₹10, custom photo gifts, couple rings, lighting gifts, teddy collection, birthday decorations. Free delivery across India. Same-day delivery in Hyderabad." />
        <meta name="keywords" content="gift shop, gifts online, keychains, couple rings, photo gifts, photo mug, lighting gifts, birthday decoration, teddy bears, message bottles, voice recorder gifts, personalized gifts, custom gifts, Hyderabad, India, same day delivery" />
        <meta property="og:title" content="GiftShop - Premium Gifts for Every Occasion" />
        <meta property="og:description" content="500+ handpicked gifts for love, friendship & celebration. Starting at just ₹10. Free delivery!" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://giftshop.in" />
      </Helmet>

      <HeroSection />

      {/* Trust Badges */}
      <Box sx={{ py: 4, borderBottom: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            {trustBadges.map((badge) => (
              <Grid key={badge.label} size={{ xs: 6, sm: 3 }}>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1, py: 1 }}>
                    <Box sx={{ color: '#ff4081', fontSize: 20, display: 'flex' }}>{badge.icon}</Box>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                      {badge.label}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Shop by Occasion */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: '#7c4dff', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
              Perfect For Every Moment
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Shop by Occasion
            </Typography>
          </motion.div>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
            {occasions.map((occ, i) => (
              <motion.div
                key={occ.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => handleOccasion(occ)}
                  sx={{
                    px: 3, py: 2, cursor: 'pointer', textAlign: 'center', minWidth: 120,
                    '&:hover': { boxShadow: '0 8px 30px rgba(255,64,129,0.15)' },
                  }}
                >
                  <Typography sx={{ fontSize: '2rem', mb: 0.5 }}>{occ.emoji}</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{occ.label}</Typography>
                </Card>
              </motion.div>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Trending */}
      <Box sx={{ py: 6, background: isDark ? 'rgba(124,77,255,0.03)' : 'rgba(124,77,255,0.02)' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
              Popular Right Now
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Trending Gifts
            </Typography>
          </motion.div>
          <Grid container spacing={3}>
            {trending.map((product, i) => (
              <Grid key={product.id} size={{ xs: 6, sm: 6, md: 3 }}>
                <ProductCard product={product} index={i} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* All Products */}
      <Box id="products" sx={{ pt: 10, pb: 4 }}>
        <Container maxWidth="lg">
          <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
          <SearchBar value={search} onChange={setSearch} />

          {filtered.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Typography sx={{ fontSize: 64, mb: 2 }}>😔</Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                No gifts found. Try a different search or category.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filtered.map((product, i) => (
                <Grid key={product.id} size={{ xs: 6, sm: 6, md: 4, lg: 3 }}>
                  <ProductCard product={product} index={i} />
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      </Box>

      {/* How It Works */}
      <Box sx={{ py: 10, background: isDark ? 'rgba(255,64,129,0.03)' : 'rgba(255,64,129,0.02)' }}>
        <Container maxWidth="lg">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Typography variant="overline" sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
              Simple & Easy
            </Typography>
            <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 5, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              How It Works
            </Typography>
          </motion.div>
          <Grid container spacing={3}>
            {howItWorks.map((step, i) => (
              <Grid key={step.title} size={{ xs: 6, sm: 3 }}>
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Avatar
                      sx={{
                        width: 64, height: 64, mx: 'auto', mb: 2, fontSize: 28,
                        background: 'linear-gradient(135deg, rgba(255,64,129,0.15), rgba(124,77,255,0.15))',
                        color: '#ff4081',
                      }}
                    >
                      {step.icon}
                    </Avatar>
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'inline-block', mb: 1, px: 1.5, py: 0.3, borderRadius: 2, fontWeight: 700,
                        background: 'linear-gradient(135deg, #ff4081, #7c4dff)', color: '#fff',
                      }}
                    >
                      Step {i + 1}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                      {step.desc}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Banner */}
      <Box sx={{ py: 8 }}>
        <Container maxWidth="md">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <Card
              sx={{
                p: { xs: 4, md: 6 },
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(255,64,129,0.1) 0%, rgba(124,77,255,0.1) 100%)',
                border: '1px solid rgba(255,64,129,0.2)',
              }}
            >
              <Typography sx={{ fontSize: '3rem', mb: 2 }}>🎁</Typography>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>
                Can't Find the Perfect Gift?
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 3, maxWidth: 450, mx: 'auto', lineHeight: 1.7 }}>
                Tell us who it's for and the occasion — our gift experts will suggest the best options for you!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<BsWhatsapp />}
                onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}?text=${encodeURIComponent('Hi! I need help finding the perfect gift. Can you suggest something?')}`, '_blank')}
                sx={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  '&:hover': { background: 'linear-gradient(135deg, #2be06e, #159e8d)' },
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  px: 4,
                }}
              >
                Ask Our Gift Expert
              </Button>
            </Card>
          </motion.div>
        </Container>
      </Box>
    </>
  );
}
