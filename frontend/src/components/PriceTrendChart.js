import React from 'react';
import { Line } from 'react-chartjs-2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import DownloadIcon from '@mui/icons-material/Download';
import { useMediaQuery, useTheme } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  LineController,
  Title,
  Tooltip,
  Legend,
  Filler
);

function downloadCSV(data, data2, label1, label2) {
  if (!data || data.length === 0) return;
  const months = data.map(d => d.month);
  const headers = ['Month', label1 || 'Price ($)', ...(data2 ? [label2 || 'Price 2 ($)'] : [])];
  const rows = months.map((month, i) => {
    const row = [month, data[i].price];
    if (data2 && data2[i]) row.push(data2[i].price);
    return row;
  });
  const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'price-trends.csv';
  a.click();
  URL.revokeObjectURL(url);
}

function PriceTrendChart({ data, data2, loading, routeLabel, routeLabel2 }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 200 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <CircularProgress sx={{ color: '#64b5f6' }} />
          <Typography variant="body1" color="text.secondary">
            Loading price trends...
          </Typography>
        </Box>
      </Box>
    );
  }

  const hasPrimaryData = data && data.length > 0;
  const hasCompareData = data2 && data2.length > 0;
  if (!hasPrimaryData && !hasCompareData) {
    return (
      <Box sx={{ textAlign: 'center', p: 2 }}>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
          📊 Ready to Explore
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Select a route from the dropdown above to view monthly price trends
        </Typography>
      </Box>
    );
  }
  const primaryData = hasPrimaryData ? data : data2;
  const secondaryData = hasPrimaryData ? data2 : null;
  const primaryLabel = hasPrimaryData ? routeLabel : routeLabel2;
  const secondaryLabel = hasPrimaryData ? routeLabel2 : null;

  const datasets = [
    {
      label: primaryLabel || 'Price ($)',
      data: primaryData.map(item => item.price),
      fill: true,
      backgroundColor: 'rgba(100, 181, 246, 0.1)',
      borderColor: '#64b5f6',
      borderWidth: 3,
      pointBackgroundColor: '#64b5f6',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#ff6b6b',
      pointHoverBorderColor: '#ffffff',
      tension: 0.4,
    },
  ];

  if (secondaryData && secondaryData.length > 0) {
    datasets.push({
      label: secondaryLabel || 'Compare ($)',
      data: secondaryData.map(item => item.price),
      fill: false,
      backgroundColor: 'rgba(255, 107, 107, 0.1)',
      borderColor: '#ff6b6b',
      borderWidth: 3,
      pointBackgroundColor: '#ff6b6b',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: '#64b5f6',
      pointHoverBorderColor: '#ffffff',
      tension: 0.4,
    });
  }

  const chartData = {
    labels: primaryData.map(item => item.month),
    datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: datasets.length > 1,
        labels: {
          color: '#b0b0b0',
          usePointStyle: true,
          font: { size: isMobile ? 11 : 12 },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleColor: '#ffffff',
        bodyColor: '#b0b0b0',
        borderColor: '#64b5f6',
        borderWidth: 1,
        cornerRadius: 8,
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: $${context.parsed.y}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' },
        ticks: { color: '#b0b0b0', font: { size: isMobile ? 10 : 12 } },
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)', borderColor: 'rgba(255, 255, 255, 0.2)' },
        ticks: {
          color: '#b0b0b0',
          font: { size: isMobile ? 10 : 12 },
          callback: value => '$' + value,
        },
      },
    },
    interaction: { intersect: false, mode: 'index' },
    elements: { point: { hoverRadius: 8 } },
  };

  const prices = primaryData.map(item => item.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 1, mb: 2 }}>
        <Typography
          variant="h5"
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            fontWeight: 600,
            background: 'linear-gradient(45deg, #64b5f6, #ff6b6b)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Monthly Price Trend
        </Typography>
        <Button
          size={isMobile ? 'small' : 'medium'}
          startIcon={<DownloadIcon />}
          onClick={() => downloadCSV(primaryData, secondaryData, primaryLabel, secondaryLabel)}
          sx={{
            color: '#64b5f6',
            borderColor: 'rgba(100, 181, 246, 0.5)',
            '&:hover': {
              borderColor: '#64b5f6',
              backgroundColor: 'rgba(100, 181, 246, 0.1)',
            },
          }}
          variant="outlined"
        >
          Export CSV
        </Button>
      </Box>
      <Divider sx={{ mb: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mb: 3, flexWrap: 'wrap', gap: { xs: 1, sm: 2 } }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="#64b5f6" fontWeight="bold">${minPrice}</Typography>
          <Typography variant="caption" color="text.secondary">Lowest</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="#ff6b6b" fontWeight="bold">${maxPrice}</Typography>
          <Typography variant="caption" color="text.secondary">Highest</Typography>
        </Box>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" color="#9be7ff" fontWeight="bold">${avgPrice}</Typography>
          <Typography variant="caption" color="text.secondary">Average</Typography>
        </Box>
      </Box>
      <Box sx={{ height: { xs: 300, sm: 350, md: 400 }, position: 'relative' }}>
        <Line data={chartData} options={options} />
      </Box>
    </Box>
  );
}

export default PriceTrendChart;
