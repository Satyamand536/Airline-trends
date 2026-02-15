import React, { useEffect, useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import KPIOverview from './components/KPIOverview';
import RouteSelector from './components/RouteSelector';
import PriceTrendChart from './components/PriceTrendChart';
import InsightsPanel from './components/InsightsPanel';
import Footer from './components/Footer';
import { useRoutes } from './hooks/useRoutes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#64b5f6', light: '#9be7ff', dark: '#2286c3' },
    secondary: { main: '#ff6b6b', light: '#ff9e9e', dark: '#c73e3e' },
    background: { default: '#0a0a0a', paper: '#1a1a1a' },
    text: { primary: '#ffffff', secondary: '#b0b0b0' },
  },
  typography: { fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif' },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

function App() {
  const { routes } = useRoutes();
  const [selectedRoute, setSelectedRoute] = useState('');
  const [selectedRoute2, setSelectedRoute2] = useState('');
  const [priceTrends, setPriceTrends] = useState([]);
  const [priceTrends2, setPriceTrends2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [regionFilter, setRegionFilter] = useState('all');
  const [compareMode, setCompareMode] = useState(false);

  const apiBase = process.env.REACT_APP_API_URL || '';

  useEffect(() => {
    if (selectedRoute) {
      const route = routes.find(r => r.id === selectedRoute);
      if (route) {
        setLoading(true);
        fetch(`${apiBase}/api/price-trends?route=${route.route_string}`)
          .then(res => res.json())
          .then(data => { setPriceTrends(Array.isArray(data) ? data : []); setLoading(false); })
          .catch(() => setLoading(false));
      }
    } else {
      setPriceTrends([]);
    }
  }, [selectedRoute, routes, apiBase]);

  useEffect(() => {
    if (compareMode && selectedRoute2) {
      const route = routes.find(r => r.id === selectedRoute2);
      if (route) {
        setLoading2(true);
        fetch(`${apiBase}/api/price-trends?route=${route.route_string}`)
          .then(res => res.json())
          .then(data => { setPriceTrends2(Array.isArray(data) ? data : []); setLoading2(false); })
          .catch(() => setLoading2(false));
      }
    } else {
      setPriceTrends2([]);
    }
  }, [compareMode, selectedRoute2, routes, apiBase]);

  const route1 = routes.find(r => r.id === selectedRoute);
  const route2 = routes.find(r => r.id === selectedRoute2);
  const routeLabel = route1 ? `${route1.origin} → ${route1.destination}` : null;
  const routeLabel2 = route2 ? `${route2.origin} → ${route2.destination}` : null;
  const chartLoading = loading || (compareMode && selectedRoute2 && loading2);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Box
          component="div"
          sx={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'radial-gradient(circle at 20% 80%, rgba(100, 181, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.1) 0%, transparent 50%)',
            pointerEvents: 'none',
            opacity: 0.1,
          }}
        />
        <Navbar />
        <Container
          maxWidth="lg"
          sx={{
            flex: 1,
            mt: { xs: 2, sm: 4, md: 6 },
            mb: { xs: 2, sm: 3, md: 4 },
            px: { xs: 1, sm: 2 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Box sx={{ width: '100%', maxWidth: 1200 }}>
            <Paper
              elevation={8}
              sx={{
                width: '100%',
                p: { xs: 2, sm: 3, md: 4 },
                borderRadius: 4,
                background: 'linear-gradient(145deg, rgba(26, 26, 26, 0.9) 0%, rgba(42, 42, 42, 0.9) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
              }}
            >
              <KPIOverview />
              <Box sx={{ borderBottom: 1, borderColor: 'rgba(255, 255, 255, 0.1)', mb: 3 }}>
                <Tabs
                  value={activeTab}
                  onChange={(_, v) => setActiveTab(v)}
                  sx={{
                    '& .MuiTab-root': { color: '#b0b0b0', fontWeight: 500, '&.Mui-selected': { color: '#64b5f6' } },
                    '& .MuiTabs-indicator': { backgroundColor: '#64b5f6' },
                  }}
                >
                  <Tab label="Route Analysis" />
                  <Tab label="Market Insights" />
                </Tabs>
              </Box>

              {activeTab === 0 && (
                <Box>
                  <RouteSelector
                    routes={routes}
                    selectedRoute={selectedRoute}
                    setSelectedRoute={setSelectedRoute}
                    selectedRoute2={selectedRoute2}
                    setSelectedRoute2={setSelectedRoute2}
                    regionFilter={regionFilter}
                    setRegionFilter={setRegionFilter}
                    compareMode={compareMode}
                    setCompareMode={setCompareMode}
                  />
                  {(selectedRoute || (compareMode && selectedRoute2)) && (
                    <Box sx={{ mt: 4 }}>
                      <PriceTrendChart
                        data={priceTrends}
                        data2={compareMode ? priceTrends2 : null}
                        loading={chartLoading}
                        routeLabel={routeLabel}
                        routeLabel2={routeLabel2}
                      />
                    </Box>
                  )}
                </Box>
              )}

              {activeTab === 1 && (
                <Box>
                  <InsightsPanel />
                </Box>
              )}
            </Paper>
          </Box>
        </Container>
        <Footer />
      </Box>
    </ThemeProvider>
  );
}

export default App;
