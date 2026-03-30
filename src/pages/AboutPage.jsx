import { Container, Typography, Grid, Card, Box, Avatar } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import {
  FiHeart, FiTruck, FiShield, FiHeadphones, FiStar, FiGift, FiClock, FiUsers,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';

const features = [
  { icon: <FiHeart />, title: 'Handpicked with Love', desc: 'Every gift is carefully curated by our team to bring joy and create lasting memories for your loved ones.' },
  { icon: <FiTruck />, title: 'Free Delivery', desc: 'We deliver across India with free shipping on all orders. Your gift arrives safely and beautifully packaged.' },
  { icon: <FiShield />, title: 'Quality Assured', desc: 'Premium materials and craftsmanship. Each gift undergoes rigorous quality checks before shipping to you.' },
  { icon: <FiHeadphones />, title: '7-Day Support', desc: 'Our friendly team is available 7 days a week to help you pick the perfect gift or resolve any concerns.' },
];

const stats = [
  { icon: <FiGift />, value: '5,000+', label: 'Gifts Delivered' },
  { icon: <FiStar />, value: '4.9/5', label: 'Customer Rating' },
  { icon: <FiUsers />, value: '2,000+', label: 'Happy Customers' },
  { icon: <FiClock />, value: '24hrs', label: 'Avg Delivery Time' },
];

const testimonials = [
  { name: 'Priya S.', text: 'Ordered a couple ring set for our anniversary — the quality was amazing and packaging was so beautiful! My partner loved it.', rating: 5 },
  { name: 'Rahul M.', text: 'The photo mug I ordered for my mom\'s birthday turned out perfectly. She was in tears! Great quality and fast delivery.', rating: 5 },
  { name: 'Sneha K.', text: 'I\'ve ordered keychains and message bottles multiple times. Always impressed with the attention to detail. Best gift shop ever!', rating: 5 },
  { name: 'Arjun D.', text: 'The breathing teddy for my girlfriend was a hit! She absolutely loved the soft glow feature. Worth every rupee.', rating: 5 },
];

const story = [
  { title: 'Our Beginning', desc: 'GiftShop started in 2022 from a small room in Hyderabad with just 20 products and a dream to make gifting easier and more meaningful for everyone.' },
  { title: 'Our Mission', desc: 'We believe the right gift can express what words sometimes can\'t. Our mission is to help you celebrate every relationship and occasion with the perfect present.' },
  { title: 'Our Promise', desc: 'From keychains at ₹10 to premium photo gifts, every item is chosen with care, tested for quality, and delivered with love. If you\'re not happy, we\'ll make it right.' },
];

export default function AboutPage() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const headingGradient = isDark
    ? 'linear-gradient(135deg, #fff, #b0a0c0)'
    : 'linear-gradient(135deg, #1a1a2e, #7c4dff)';

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>About Us - GiftShop | Our Story, Mission & Promise</title>
        <meta name="description" content="Learn about GiftShop — Hyderabad's trusted destination for premium, handpicked gifts. 5,000+ gifts delivered, 4.9/5 rating. Quality assured, free delivery across India." />
      </Helmet>

      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="overline" sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', textAlign: 'center' }}>
          Our Story
        </Typography>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' }, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          About GiftShop
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 650, mx: 'auto', mb: 6, lineHeight: 1.8 }}>
          At GiftShop, we believe that the right gift can express what words sometimes can't.
          Whether it's a birthday, anniversary, friendship day, or just a random act of love —
          we have the perfect gift waiting for you.
        </Typography>
      </motion.div>

      {/* Stats */}
      <Grid container spacing={2} sx={{ mb: 8 }}>
        {stats.map((stat, i) => (
          <Grid key={stat.label} size={{ xs: 6, sm: 3 }}>
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Card sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ color: '#ff4081', fontSize: 28, mb: 1, display: 'flex', justifyContent: 'center' }}>{stat.icon}</Box>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary', fontSize: { xs: '1.5rem', md: '2rem' } }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>{stat.label}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Our Story */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="overline" sx={{ color: '#7c4dff', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
          How It Started
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          From a Small Room to Your Doorstep
        </Typography>
        <Grid container spacing={3}>
          {story.map((item, i) => (
            <Grid key={item.title} size={{ xs: 12, md: 4 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Card sx={{ p: 3, height: '100%', borderTop: '3px solid', borderImage: 'linear-gradient(135deg, #ff4081, #7c4dff) 1' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary' }}>{item.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8 }}>{item.desc}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="overline" sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
          Why Choose Us
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          What Makes Us Special
        </Typography>
        <Grid container spacing={3}>
          {features.map((f, i) => (
            <Grid key={f.title} size={{ xs: 12, sm: 6 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
                  <Avatar
                    sx={{
                      width: 56, height: 56, mx: 'auto', mb: 2, fontSize: 24,
                      background: 'linear-gradient(135deg, rgba(255,64,129,0.15), rgba(124,77,255,0.15))',
                      color: '#ff4081',
                    }}
                  >
                    {f.icon}
                  </Avatar>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>{f.title}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{f.desc}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Testimonials */}
      <Box>
        <Typography variant="overline" sx={{ color: '#7c4dff', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
          Testimonials
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          What Our Customers Say
        </Typography>
        <Grid container spacing={3}>
          {testimonials.map((t, i) => (
            <Grid key={t.name} size={{ xs: 12, sm: 6, md: 3 }}>
              <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
                    {[...Array(t.rating)].map((_, j) => (
                      <FiStar key={j} style={{ color: '#ffd54f', fill: '#ffd54f', fontSize: 16 }} />
                    ))}
                  </Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, flexGrow: 1, fontStyle: 'italic' }}>
                    "{t.text}"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#ff4081', fontWeight: 700, mt: 2 }}>— {t.name}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
