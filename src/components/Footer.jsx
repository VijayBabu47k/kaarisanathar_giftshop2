import { Box, Container, Typography, IconButton, Grid, Divider } from '@mui/material';
import { FiInstagram, FiYoutube, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import { BsWhatsapp, BsGift } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';

const socials = [
  { icon: <FiInstagram />, color: '#E1306C' },
  { icon: <BsWhatsapp />, color: '#25D366' },
  { icon: <FiYoutube />, color: '#FF0000' },
];

const contacts = [
  { icon: <FiPhone style={{ fontSize: 16 }} />, text: '+91 98765 43210' },
  { icon: <FiMail style={{ fontSize: 16 }} />, text: 'hello@giftshop.in' },
  { icon: <FiMapPin style={{ fontSize: 16 }} />, text: 'Hyderabad, India' },
];

export default function Footer() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box
      component="footer"
      sx={{
        mt: 10,
        pt: 8,
        pb: 4,
        background: isDark
          ? 'linear-gradient(180deg, transparent 0%, rgba(124,77,255,0.05) 100%)'
          : 'linear-gradient(180deg, transparent 0%, rgba(124,77,255,0.03) 100%)',
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 4 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BsGift style={{ color: '#ff4081', fontSize: 24 }} />
                <Typography
                  variant="h6"
                  sx={{
                    background: 'linear-gradient(135deg, #ff4081, #7c4dff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    fontWeight: 800,
                  }}
                >
                  GiftShop
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.8, maxWidth: 300 }}>
                Making every celebration special with handpicked, premium gifts
                for your loved ones. From ₹10 to priceless smiles.
              </Typography>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2, fontSize: '1rem' }}>
                Contact Us
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {contacts.map((item) => (
                  <Box key={item.text} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ color: '#ff4081', display: 'flex' }}>{item.icon}</Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>{item.text}</Typography>
                  </Box>
                ))}
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <Typography variant="h6" sx={{ color: 'text.primary', mb: 2, fontSize: '1rem' }}>
                Follow Us
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {socials.map((social, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.2, y: -3 }} whileTap={{ scale: 0.9 }}>
                    <IconButton
                      sx={{
                        background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                        color: 'text.secondary',
                        '&:hover': { background: social.color, color: '#fff' },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </motion.div>
                ))}
              </Box>
            </motion.div>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4 }} />
        <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center', opacity: 0.6 }}>
          © 2026 GiftShop. Made with love for every celebration.
        </Typography>
      </Container>
    </Box>
  );
}
