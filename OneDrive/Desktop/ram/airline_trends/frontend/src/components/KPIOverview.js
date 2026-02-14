import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useInsights } from '../hooks/useInsights';

function KPIOverview() {
  const { insights, loading } = useInsights();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress sx={{ color: '#64b5f6' }} size={32} />
      </Box>
    );
  }

  if (!insights?.summary) return null;

  const { summary } = insights;
  const volatility = summary.price_volatility_pct ?? 0;
  const volatilityLabel = volatility >= 25 ? 'High' : volatility >= 15 ? 'Moderate' : 'Low';

  const kpis = [
    {
      label: 'Average Price',
      value: `$${summary.average_price}`,
      color: '#9be7ff',
      borderColor: 'rgba(155, 231, 255, 0.3)',
    },
    {
      label: 'Peak Demand Month',
      value: summary.peak_demand_month || 'N/A',
      color: '#ff6b6b',
      borderColor: 'rgba(255, 107, 107, 0.3)',
    },
    {
      label: 'Most Popular Route',
      value: summary.most_popular_route || 'N/A',
      color: '#64b5f6',
      borderColor: 'rgba(100, 181, 246, 0.3)',
    },
    {
      label: 'Price Volatility',
      value: volatilityLabel,
      subValue: `${volatility}%`,
      color: volatility >= 25 ? '#ff6b6b' : volatility >= 15 ? '#ffd93d' : '#64b5f6',
      borderColor: volatility >= 25 ? 'rgba(255, 107, 107, 0.3)' : volatility >= 15 ? 'rgba(255, 217, 61, 0.3)' : 'rgba(100, 181, 246, 0.3)',
    },
  ];

  return (
    <Box sx={{ mb: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)' },
          gap: 2,
        }}
      >
        {kpis.map((kpi) => (
          <Card
            key={kpi.label}
            sx={{
              background: `${kpi.color}15`,
              border: `1px solid ${kpi.borderColor}`,
            }}
          >
            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
              <Typography variant="caption" color="text.secondary" display="block">
                {kpi.label}
              </Typography>
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                  color: kpi.color,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  maxWidth: '100%',
                }}
              >
                {kpi.value}
              </Typography>
              {kpi.subValue && (
                <Typography variant="caption" color="text.secondary">
                  {kpi.subValue}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default KPIOverview;
