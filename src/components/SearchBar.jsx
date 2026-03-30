import { TextField, InputAdornment, Box } from '@mui/material';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useThemeMode } from '../context/ThemeContext';

export default function SearchBar({ value, onChange }) {
  const { mode } = useThemeMode();
  const isDark = mode === 'dark';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Box sx={{ maxWidth: 500, mx: 'auto', mb: 4, px: 2 }}>
        <TextField
          fullWidth
          placeholder="Search gifts..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <FiSearch style={{ color: '#7c4dff', fontSize: 20 }} />
                </InputAdornment>
              ),
            },
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              background: isDark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)',
              backdropFilter: 'blur(10px)',
              '& fieldset': { borderColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.1)' },
              '&:hover fieldset': { borderColor: 'rgba(124,77,255,0.4)' },
              '&.Mui-focused fieldset': { borderColor: '#7c4dff' },
            },
          }}
        />
      </Box>
    </motion.div>
  );
}
