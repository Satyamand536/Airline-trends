import React from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import RegionFilter, { filterRoutesByRegion } from './RegionFilter';

function RouteSelector({
  routes,
  selectedRoute,
  setSelectedRoute,
  selectedRoute2,
  setSelectedRoute2,
  regionFilter,
  setRegionFilter,
  compareMode,
  setCompareMode,
}) {
  const filteredRoutes = filterRoutesByRegion(routes, regionFilter);

  const groupedRoutes = filteredRoutes.reduce((acc, route) => {
    const region = route.region || 'Other';
    if (!acc[region]) {
      acc[region] = [];
    }
    acc[region].push(route);
    return acc;
  }, {});

  const menuItems = Object.entries(groupedRoutes).flatMap(([region, regionRoutes]) => [
    <MenuItem key={`header-${region}`} disabled sx={{ fontWeight: 'bold', color: '#64b5f6' }}>
      {region}
    </MenuItem>,
    ...regionRoutes.map(route => (
      <MenuItem
        key={route.id}
        value={route.id}
        sx={{
          pl: 4,
          '&:hover': { backgroundColor: 'rgba(100, 181, 246, 0.1)' },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <span>{route.origin} → {route.destination}</span>
          <Chip
            label={route.region}
            size="small"
            sx={{
              fontSize: '0.7rem',
              backgroundColor: 'rgba(100, 181, 246, 0.2)',
              color: '#64b5f6',
            }}
          />
        </Box>
      </MenuItem>
    )),
  ]);

  const selectSx = {
    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(100, 181, 246, 0.5)' },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#64b5f6' },
    '& .MuiSelect-icon': { color: '#64b5f6' },
  };

  return (
    <Box>
      <RegionFilter regionFilter={regionFilter} setRegionFilter={setRegionFilter} />
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2, mb: 2 }}>
        <FormControl fullWidth sx={{ flex: 1 }}>
          <InputLabel id="route-select-label" sx={{ color: '#b0b0b0', '&.Mui-focused': { color: '#64b5f6' } }}>
            Primary Route
          </InputLabel>
          <Select
            labelId="route-select-label"
            value={selectedRoute}
            label="Primary Route"
            onChange={e => setSelectedRoute(e.target.value)}
            sx={selectSx}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {menuItems}
          </Select>
        </FormControl>
        {compareMode && (
          <FormControl fullWidth sx={{ flex: 1 }}>
            <InputLabel id="route-select-2-label" sx={{ color: '#b0b0b0', '&.Mui-focused': { color: '#64b5f6' } }}>
              Compare Route
            </InputLabel>
            <Select
              labelId="route-select-2-label"
              value={selectedRoute2}
              label="Compare Route"
              onChange={e => setSelectedRoute2(e.target.value)}
              sx={selectSx}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {menuItems}
            </Select>
          </FormControl>
        )}
      </Box>
      <FormControlLabel
        control={
          <Checkbox
            checked={compareMode}
            onChange={e => {
              setCompareMode(e.target.checked);
              if (!e.target.checked) setSelectedRoute2('');
            }}
            sx={{
              color: '#b0b0b0',
              '&.Mui-checked': { color: '#64b5f6' },
            }}
          />
        }
        label={
          <Typography variant="body2" color="text.secondary">
            Compare two routes
          </Typography>
        }
      />
      <FormHelperText sx={{ color: '#b0b0b0', mt: 0.5 }}>
        {filteredRoutes.length} routes • {compareMode ? 'Select two routes to compare' : 'Select a route to view price trends'}
      </FormHelperText>
    </Box>
  );
}

export default RouteSelector;
