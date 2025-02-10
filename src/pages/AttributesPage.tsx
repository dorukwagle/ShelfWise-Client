import { useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import GenreForm from '../components/GenreForm';
import AuthorForm from '../components/AuthorForm';
import PublisherForm from '../components/PublisherForm';

const AttributesPage = () => {
  const [activeTab, setActiveTab] = useState('genre');

  const handleClose = () => {
    console.log('Modal closed');
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setActiveTab(newValue);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'genre':
        return <GenreForm onClose={handleClose} />;
      case 'publisher':
        return <PublisherForm onClose={handleClose} />;
      case 'author':
        return <AuthorForm onClose={handleClose} />;
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




