import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import GenreForm from '../components/GenreForm';
import AuthorForm from '../components/AuthorForm';
import PublisherForm from '../components/PublisherForm';



const AttributesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getDefaultTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'genre';
  };

  const [activeTab, setActiveTab] = useState<string>(getDefaultTab);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'genre';
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.search, activeTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/attributes?tab=${newValue}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'genre':
        return <GenreForm />;
      case 'publisher':
        return <PublisherForm />;
      case 'author':
        return <AuthorForm />;
      default:
        return <Typography>Select a tab</Typography>;
    }
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Paper elevation={3} sx={{ borderRadius: 0 }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          TabIndicatorProps={{ sx: { height: 4 } }}
        >
          <Tab label="Genre" value="genre" sx={{ mx: 3 }} />
          <Tab label="Publisher" value="publisher" sx={{ mx: 3 }} />
          <Tab label="Author" value="author" sx={{ mx: 3 }} />
        </Tabs>
      </Paper>
      <Box sx={{ p: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default AttributesPage;




