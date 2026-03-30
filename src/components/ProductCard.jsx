import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Skeleton } from '@mui/material';
import { FiShoppingCart, FiCheck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, index }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
    >
      <motion.div whileHover={{ y: -8 }} transition={{ duration: 0.3 }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            transition: 'box-shadow 0.3s ease',
            '&:hover': {
              boxShadow: '0 12px 40px rgba(255,64,129,0.15), 0 4px 20px rgba(124,77,255,0.1)',
            },
            '&:hover .product-image': { transform: 'scale(1.08)' },
          }}
        >
          <Box sx={{ position: 'relative', overflow: 'hidden', pt: '100%' }}>
            {!imageLoaded && (
              <Skeleton
                variant="rectangular"
                sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', bgcolor: 'rgba(255,255,255,0.05)' }}
              />
            )}
            <CardMedia
              component="img"
              image={product.image}
              alt={product.name}
              className="product-image"
              onLoad={() => setImageLoaded(true)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                opacity: imageLoaded ? 1 : 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'linear-gradient(135deg, #ff4081, #7c4dff)',
                borderRadius: 2,
                px: 1.5,
                py: 0.5,
              }}
            >
              <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.85rem' }}>
                ₹{product.price}
              </Typography>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2.5 }}>
            <Typography variant="caption" sx={{ color: '#7c4dff', fontWeight: 600, letterSpacing: 1, mb: 0.5 }}>
              {product.category}
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.primary', fontSize: '1rem', fontWeight: 700, mb: 1, lineHeight: 1.3 }}>
              {product.name}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '0.8rem', mb: 2, flexGrow: 1, lineHeight: 1.5 }}>
              {product.description}
            </Typography>
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={added ? <FiCheck /> : <FiShoppingCart />}
                onClick={handleAdd}
                sx={{
                  background: added ? 'linear-gradient(135deg, #00c853, #00e676)' : undefined,
                  boxShadow: added ? '0 4px 20px rgba(0,200,83,0.3)' : undefined,
                }}
              >
                {added ? 'Added!' : 'Add to Cart'}
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
