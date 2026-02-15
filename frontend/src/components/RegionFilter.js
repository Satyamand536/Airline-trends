import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';

const REGION_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Europe', label: 'Europe' },
  { value: 'Americas', label: 'Americas' },
  { value: 'Middle East', label: 'Middle East' },
  { value: 'Oceania', label: 'Oceania' },
];

function regionMatches(routeRegion, filterValue) {
  if (filterValue === 'all') return true;
  return routeRegion && routeRegion.includes(filterValue);
}

export function filterRoutesByRegion(routes, regionFilter) {
  if (!regionFilter || regionFilter === 'all') return routes;
  return routes.filter(r => regionMatches(r.region, regionFilter));
}

function RegionFilter({ regionFilter, setRegionFilter }) {
  return (
    <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: { xs: 0.75, sm: 1 } }}>
      {REGION_OPTIONS.map((opt) => (
        <Chip
          key={opt.value}
          label={opt.label}
          onClick={() => setRegionFilter(opt.value)}
          sx={{
            minHeight: { xs: 32, sm: 'auto' },
            fontSize: { xs: '0.75rem', sm: '0.875rem' },
            backgroundColor: regionFilter === opt.value ? 'rgba(100, 181, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)',
            color: regionFilter === opt.value ? '#64b5f6' : '#b0b0b0',
            border: `1px solid ${regionFilter === opt.value ? 'rgba(100, 181, 246, 0.5)' : 'rgba(255, 255, 255, 0.1)'}`,
            fontWeight: regionFilter === opt.value ? 600 : 400,
            '&:hover': {
              backgroundColor: 'rgba(100, 181, 246, 0.15)',
            },
          }}
        />
      ))}
    </Box>
  );
}

export default RegionFilter;
