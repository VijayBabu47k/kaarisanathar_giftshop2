import { Box, Chip, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import {
  BsKey, BsDiamond, BsEnvelope, BsHeart, BsLightbulb, BsCamera,
  BsJoystick, BsBalloon, BsStars, BsMic, BsGift,
} from 'react-icons/bs';
import { GiTempleDoor, GiBearFace } from 'react-icons/gi';
import { useThemeMode } from '../context/ThemeContext';

const categoryIcons = {
  All: BsStars,
  Keychains: BsKey,
  Rings: BsDiamond,
  'Couple Rings': BsHeart,
  'Message Bottles': BsEnvelope,
  'Swami Silai': GiTempleDoor,
  'Voice Recorder Gifts': BsMic,
  'Heart Box': BsGift,
  'Lighting Gifts': BsLightbulb,
  'Photo Gifts': BsCamera,
  'RC Cars': BsJoystick,
  'Teddy Collection': GiBearFace,
  'Birthday Decoration': BsBalloon,
};

export default function CategoryFilter({ categories, selected, onSelect }) {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <Box sx={{ mb: 5 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <Typography
          variant="overline"
          sx={{ color: '#ff4081', letterSpacing: 4, display: 'block', mb: 1, textAlign: 'center' }}
        >
          Browse by Category
        </Typography>
        <Typography
          variant="h3"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontSize: { xs: '1.8rem', md: '2.5rem' },
            background: isDark
              ? 'linear-gradient(135deg, #fff 0%, #b0a0c0 100%)'
              : 'linear-gradient(135deg, #1a1a2e 0%, #7c4dff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Our Collection
        </Typography>
      </motion.div>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1.5, px: 2 }}>
        {['All', ...categories].map((cat, index) => {
          const Icon = categoryIcons[cat] || BsStars;
          const isSelected = selected === cat;
          return (
            <motion.div
              key={cat}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Chip
                icon={<Icon style={{ fontSize: 16 }} />}
                label={cat}
                onClick={() => onSelect(cat)}
                sx={{
                  px: 1,
                  py: 2.5,
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  background: isSelected
                    ? 'linear-gradient(135deg, #ff4081, #7c4dff)'
                    : isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
                  color: isSelected ? '#fff' : 'text.secondary',
                  border: isSelected ? 'none' : `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  boxShadow: isSelected ? '0 4px 20px rgba(255,64,129,0.3)' : 'none',
                  '&:hover': {
                    background: isSelected
                      ? 'linear-gradient(135deg, #ff4081, #7c4dff)'
                      : isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.08)',
                  },
                }}
              />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
}
