import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import { useInsights } from '../hooks/useInsights';

function getDemandColor(category) {
  switch (category) {
    case 'High': return '#ff6b6b';
    case 'Medium': return '#ffd93d';
    case 'Low': return '#64b5f6';
    default: return '#b0b0b0';
  }
}

function getSmartInsight(insights) {
  if (!insights?.summary) return null;
  const { price_volatility_pct, peak_demand_month } = insights.summary;
  const lowMonths = [...(insights.demand_periods || [])].sort((a, b) => a.avg_demand - b.avg_demand).slice(0, 3);
  const lowMonthNames = lowMonths.map(p => p.month).join(', ');

  if (price_volatility_pct >= 25) {
    return {
      text: `High price volatility detected (${price_volatility_pct}%). Consider booking early or monitoring prices for flash sales.`,
      type: 'warning',
      color: '#ff6b6b',
    };
  }
  if (lowMonthNames) {
    return {
      text: `Off-season travel tip: ${lowMonthNames} typically see lower demand. Great time for budget-conscious travelers.`,
      type: 'tip',
      color: '#64b5f6',
    };
  }
  if (peak_demand_month) {
    return {
      text: `${peak_demand_month} shows seasonal surge in demand. Book ahead for peak travel periods.`,
      type: 'highlight',
      color: '#ffd93d',
    };
  }
  return null;
}

function InsightsPanel() {
  const { insights, loading } = useInsights();

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
        <CircularProgress sx={{ color: '#64b5f6' }} />
      </Box>
    );
  }

  if (!insights) {
    return (
      <Typography color="text.secondary" textAlign="center">
        Unable to load insights
      </Typography>
    );
  }

  const lowDemandPeriods = [...(insights.demand_periods || [])]
    .sort((a, b) => a.avg_demand - b.avg_demand)
    .slice(0, 6);
  const smartInsight = getSmartInsight(insights);

  return (
    <Box>
      <Typography
        variant="h5"
        sx={{
          mb: 3,
          textAlign: 'center',
          fontWeight: 600,
          background: 'linear-gradient(45deg, #64b5f6, #ff6b6b)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        📊 Market Insights
      </Typography>

      {smartInsight && (
        <Card sx={{ mb: 3, background: `${smartInsight.color}15`, border: `1px solid ${smartInsight.color}40` }}>
          <CardContent>
            <Typography variant="overline" color="text.secondary" sx={{ fontSize: '0.7rem' }}>
              Key Insight
            </Typography>
            <Typography variant="body2" sx={{ color: smartInsight.color, fontWeight: 500, mt: 0.5 }}>
              {smartInsight.text}
            </Typography>
          </CardContent>
        </Card>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2, mb: 4 }}>
        <Card sx={{ background: 'rgba(100, 181, 246, 0.1)', border: '1px solid rgba(100, 181, 246, 0.3)' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#64b5f6" fontWeight="bold">{insights.summary.total_routes}</Typography>
            <Typography variant="body2" color="text.secondary">Total Routes</Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'rgba(255, 107, 107, 0.1)', border: '1px solid rgba(255, 107, 107, 0.3)' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#ff6b6b" fontWeight="bold">{insights.summary.high_demand_routes}</Typography>
            <Typography variant="body2" color="text.secondary">High Demand Routes</Typography>
          </CardContent>
        </Card>
        <Card sx={{ background: 'rgba(155, 231, 255, 0.1)', border: '1px solid rgba(155, 231, 255, 0.3)' }}>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" color="#9be7ff" fontWeight="bold">${insights.summary.average_price}</Typography>
            <Typography variant="body2" color="text.secondary">Average Price</Typography>
          </CardContent>
        </Card>
      </Box>

      <Box>
        <Typography variant="h6" sx={{ mb: 2, color: '#64b5f6' }}>🏆 Top Popular Routes</Typography>
        <Card sx={{ mb: 3, background: 'rgba(26, 26, 26, 0.5)' }}>
          <CardContent>
            <List>
              {insights.popular_routes.slice(0, 5).map((route, index) => (
                <Box key={route.route}>
                  <ListItem sx={{ px: 0 }}>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" fontWeight="bold">
                            #{index + 1} {route.route}
                          </Typography>
                          <Chip
                            label={route.demand_category}
                            size="small"
                            sx={{
                              backgroundColor: `${getDemandColor(route.demand_category)}20`,
                              color: getDemandColor(route.demand_category),
                              fontWeight: 'bold',
                            }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: 'flex', gap: 2, mt: 0.5 }}>
                          <Typography variant="caption" color="text.secondary">Demand: {route.avg_demand}/5</Typography>
                          <Typography variant="caption" color="text.secondary">Avg: ${route.avg_price}</Typography>
                          <Typography variant="caption" color="text.secondary">{route.region}</Typography>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < 4 && <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
                </Box>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: '#ff6b6b' }}>📅 High Demand Periods</Typography>
          <Card sx={{ background: 'rgba(26, 26, 26, 0.5)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {insights.demand_periods.slice(0, 6).map((period) => (
                  <Chip
                    key={period.month}
                    label={`${period.month} (${period.avg_demand})`}
                    size="small"
                    sx={{
                      backgroundColor: `${getDemandColor(period.demand_category)}20`,
                      color: getDemandColor(period.demand_category),
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Typography variant="h6" sx={{ mb: 2, color: '#64b5f6' }}>📉 Low Demand Periods</Typography>
          <Card sx={{ background: 'rgba(26, 26, 26, 0.5)' }}>
            <CardContent>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {lowDemandPeriods.map((period) => (
                  <Chip
                    key={period.month}
                    label={`${period.month} (${period.avg_demand})`}
                    size="small"
                    sx={{
                      backgroundColor: 'rgba(100, 181, 246, 0.2)',
                      color: '#64b5f6',
                      fontSize: '0.75rem',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
}

export default InsightsPanel;
