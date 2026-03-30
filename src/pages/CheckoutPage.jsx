import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container, Grid, Card, Box, Typography, TextField, Button, Divider,
  Avatar, CircularProgress,
} from '@mui/material';
import { BsWhatsapp } from 'react-icons/bs';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useSnackbar } from 'notistack';
import { useCart } from '../context/CartContext';
import { useThemeMode } from '../context/ThemeContext';
import { openWhatsApp } from '../utils/whatsapp';

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [errors, setErrors] = useState({});
  const [orderPlaced, setOrderPlaced] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, '')))
      e.phone = 'Valid 10-digit phone is required';
    if (!form.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((p) => ({ ...p, [field]: e.target.value }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleWhatsApp = () => {
    if (!validate()) return;
    openWhatsApp(form, items, totalPrice);
    setOrderPlaced(true);
    clearCart();
    enqueueSnackbar('Order sent via WhatsApp!', { variant: 'success' });
  };

  if (items.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
          <FiCheckCircle style={{ fontSize: 100, color: '#00c853', marginBottom: 24 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: 'text.primary' }}>Order Placed!</Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            Thank you for your order. We'll get back to you shortly.
          </Typography>
          <Button variant="contained" onClick={() => navigate('/')}>Continue Shopping</Button>
        </motion.div>
      </Container>
    );
  }

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Box
              onClick={() => navigate('/cart')}
              sx={{
                cursor: 'pointer', p: 1, borderRadius: 2, display: 'flex',
                color: isDark ? '#b0a0c0' : '#666',
                '&:hover': { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
              }}
            >
              <FiArrowLeft size={22} />
            </Box>
          </motion.div>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'text.primary' }}>Checkout</Typography>
        </Box>
      </motion.div>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 7 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <Card sx={{ p: { xs: 3, md: 4 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'text.primary' }}>Delivery Details</Typography>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Full Name" value={form.name} onChange={handleChange('name')} error={!!errors.name} helperText={errors.name} sx={inputSx} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Email" type="email" value={form.email} onChange={handleChange('email')} error={!!errors.email} helperText={errors.email} sx={inputSx} />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                  <TextField fullWidth label="Phone Number" value={form.phone} onChange={handleChange('phone')} error={!!errors.phone} helperText={errors.phone} sx={inputSx} />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField fullWidth label="Delivery Address" multiline rows={3} value={form.address} onChange={handleChange('address')} error={!!errors.address} helperText={errors.address} sx={inputSx} />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>Place Your Order</Typography>
              <Button
                variant="contained"
                fullWidth
                size="large"
                startIcon={<BsWhatsapp />}
                onClick={handleWhatsApp}
                sx={{
                  background: 'linear-gradient(135deg, #25D366, #128C7E)',
                  '&:hover': { background: 'linear-gradient(135deg, #2be06e, #159e8d)' },
                  boxShadow: '0 4px 20px rgba(37,211,102,0.3)',
                  py: 1.5,
                  fontSize: '1rem',
                }}
              >
                Order via WhatsApp
              </Button>
            </Card>
          </motion.div>
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <Card sx={{ p: 3, position: { md: 'sticky' }, top: { md: 80 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'text.primary' }}>
                Order Summary ({items.length} items)
              </Typography>
              <Box sx={{ maxHeight: 300, overflow: 'auto', mb: 2 }}>
                {items.map((item) => (
                  <Box key={item.id} sx={{ display: 'flex', gap: 2, mb: 2, alignItems: 'center' }}>
                    <Avatar src={item.image} variant="rounded" sx={{ width: 48, height: 48 }} />
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>{item.name}</Typography>
                      <Typography variant="caption" sx={{ color: 'text.secondary' }}>₹{item.price} × {item.quantity}</Typography>
                    </Box>
                    <Typography sx={{ fontWeight: 700, color: '#ff4081' }}>₹{item.price * item.quantity}</Typography>
                  </Box>
                ))}
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Subtotal</Typography>
                <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>₹{totalPrice}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography sx={{ color: 'text.secondary' }}>Delivery</Typography>
                <Typography sx={{ fontWeight: 600, color: '#00c853' }}>Free</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', color: 'text.primary' }}>Total</Typography>
                <Typography sx={{ fontWeight: 800, fontSize: '1.4rem', color: '#ff4081' }}>₹{totalPrice}</Typography>
              </Box>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Container>
  );
}
