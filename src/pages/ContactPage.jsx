import { useState } from 'react';
import { Container, Typography, Grid, Card, Box, TextField, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock, FiMessageCircle } from 'react-icons/fi';
import { BsWhatsapp } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useThemeMode } from '../context/ThemeContext';

const contactInfo = [
  { icon: <FiPhone />, label: 'Phone', value: '+91 98765 43210', color: '#ff4081' },
  { icon: <FiMail />, label: 'Email', value: 'hello@giftshop.in', color: '#7c4dff' },
  { icon: <FiMapPin />, label: 'Address', value: 'Hyderabad, Telangana, India', color: '#ff4081' },
  { icon: <BsWhatsapp />, label: 'WhatsApp', value: '+91 98765 43210', color: '#25D366' },
  { icon: <FiClock />, label: 'Working Hours', value: 'Mon–Sun, 9 AM – 9 PM', color: '#7c4dff' },
  { icon: <FiMessageCircle />, label: 'Response Time', value: 'Within 1 hour', color: '#ff4081' },
];

const faqs = [
  { q: 'How long does delivery take?', a: 'Most orders are delivered within 24–48 hours in Hyderabad. Pan-India delivery takes 3–5 business days.' },
  { q: 'Can I customize a gift?', a: 'Yes! We offer customization on photo gifts, keychains, mugs, and more. Just mention your requirements when ordering.' },
  { q: 'Do you offer gift wrapping?', a: 'Absolutely! All our gifts come beautifully wrapped at no extra cost. Premium wrapping is available for ₹49.' },
  { q: 'What is your return policy?', a: 'If you receive a damaged or incorrect item, we offer free replacement within 7 days. Contact us with photos of the issue.' },
  { q: 'Can I order in bulk for events?', a: 'Yes! We offer bulk discounts for weddings, corporate events, and parties. WhatsApp us for a custom quote.' },
  { q: 'Do you deliver on the same day?', a: 'Same-day delivery is available in Hyderabad for orders placed before 2 PM. Additional charges may apply.' },
];

export default function ContactPage() {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';
  const { enqueueSnackbar } = useSnackbar();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const headingGradient = isDark
    ? 'linear-gradient(135deg, #fff, #b0a0c0)'
    : 'linear-gradient(135deg, #1a1a2e, #7c4dff)';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      enqueueSnackbar('Please fill all fields', { variant: 'warning' });
      return;
    }
    enqueueSnackbar('Message sent! We\'ll get back to you soon.', { variant: 'success' });
    setForm({ name: '', email: '', message: '' });
  };

  const fieldBorder = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.15)';
  const inputSx = {
    '& .MuiOutlinedInput-root': {
      borderRadius: 3,
      '& fieldset': { borderColor: fieldBorder },
      '&:hover fieldset': { borderColor: '#7c4dff' },
      '&.Mui-focused fieldset': { borderColor: '#7c4dff' },
    },
    '& .MuiInputLabel-root': { color: isDark ? '#b0a0c0' : '#666' },
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Helmet>
        <title>Contact Us - GiftShop | Get in Touch, FAQs, Support</title>
        <meta name="description" content="Contact GiftShop for queries, custom orders, bulk orders, or support. Call, WhatsApp, or email us. Located in Hyderabad, India. Same-day delivery available." />
      </Helmet>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Typography variant="overline" sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', textAlign: 'center' }}>
          Get in Touch
        </Typography>
        <Typography
          variant="h3"
          sx={{ textAlign: 'center', fontWeight: 800, mb: 2, fontSize: { xs: '1.8rem', md: '2.5rem' }, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
        >
          Contact Us
        </Typography>
        <Typography sx={{ color: 'text.secondary', textAlign: 'center', maxWidth: 500, mx: 'auto', mb: 5, lineHeight: 1.7 }}>
          Have a question, need a custom gift, or want to place a bulk order? We'd love to hear from you!
        </Typography>
      </motion.div>

      {/* Contact Cards */}
      <Grid container spacing={2} sx={{ mb: 6 }}>
        {contactInfo.map((item, i) => (
          <Grid key={item.label} size={{ xs: 6, sm: 4, md: 2 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card sx={{ p: 2.5, textAlign: 'center', height: '100%' }}>
                <Box sx={{ color: item.color, fontSize: 24, mb: 1, display: 'flex', justifyContent: 'center' }}>{item.icon}</Box>
                <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>{item.label}</Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', mt: 0.5, fontSize: '0.78rem' }}>{item.value}</Typography>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      {/* Form + Map */}
      <Grid container spacing={4} sx={{ mb: 8 }}>
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Send us a Message</Typography>
              <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Your Name" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} sx={inputSx} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Your Email" type="email" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} sx={inputSx} />
                  </Grid>
                </Grid>
                <TextField fullWidth label="Message" multiline rows={4} value={form.message} onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))} sx={inputSx} />
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button type="submit" variant="contained" size="large" endIcon={<FiSend />} sx={{ alignSelf: 'flex-start' }}>
                    Send Message
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    startIcon={<BsWhatsapp />}
                    onClick={() => window.open(`https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210'}`, '_blank')}
                    sx={{ borderColor: '#25D366', color: '#25D366', '&:hover': { borderColor: '#128C7E', background: 'rgba(37,211,102,0.08)' } }}
                  >
                    Chat on WhatsApp
                  </Button>
                </Box>
              </Box>
            </Card>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <Card sx={{ p: 0, overflow: 'hidden', height: '100%', minHeight: 350 }}>
              <iframe
                title="GiftShop Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.3169384117!2d78.24323004862942!3d17.412608639498672!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: 350 }}
                allowFullScreen=""
                loading="lazy"
              />
            </Card>
          </motion.div>
        </Grid>
      </Grid>

      {/* FAQs */}
      <Box>
        <Typography variant="overline" sx={{ color: '#7c4dff', letterSpacing: 4, display: 'block', textAlign: 'center', mb: 1 }}>
          FAQs
        </Typography>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 800, mb: 4, background: headingGradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={2}>
          {faqs.map((faq, i) => (
            <Grid key={faq.q} size={{ xs: 12, sm: 6 }}>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card sx={{ p: 3, height: '100%' }}>
                  <Typography variant="body1" sx={{ fontWeight: 700, mb: 1, color: 'text.primary' }}>{faq.q}</Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>{faq.a}</Typography>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
