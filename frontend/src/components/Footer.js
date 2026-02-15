import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';

function Footer() {
  return (
    <Box 
      sx={{ 
        py: { xs: 2, sm: 2.5, md: 3 },
        px: { xs: 2, sm: 3 },
        textAlign: 'center', 
        background: 'linear-gradient(90deg, rgba(26, 26, 26, 0.95) 0%, rgba(42, 42, 42, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        mt: 'auto',
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: '0.5rem', sm: '0.75rem' } }}>
        <FlightTakeoffIcon sx={{ 
          color: '#64b5f6', 
          fontSize: { xs: 24, sm: 28 }
        }} />
        <Typography 
          variant="body1" 
          color="#ffffff" 
          fontWeight="bold"
          sx={{ 
            fontSize: { xs: '0.9rem', sm: '1rem' },
            background: 'linear-gradient(45deg, #64b5f6, #ff6b6b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          © {new Date().getFullYear()} Airline Market Demand Trends
        </Typography>
        <Typography 
          variant="caption" 
          color="text.secondary" 
          sx={{ 
            mt: 0.5,
            fontSize: { xs: '0.7rem', sm: '0.75rem' }
          }}
        >
          Explore global flight prices with interactive data visualization
        </Typography>
      </Box>
    </Box>
  );
}

export default Footer; 