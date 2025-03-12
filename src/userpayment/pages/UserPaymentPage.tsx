import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import UserList from '../components/UserList';
import PaymentList from '../components/PaymentList';



const UserPaymentPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getDefaultTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'user-management';
  };

  const [activeTab, setActiveTab] = useState<string>(getDefaultTab);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'user-management';
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.search, activeTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/user-payment?tab=${newValue}`);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'user-management':
        return <UserList />;
      case 'payments':
        return <PaymentList />;
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
          <Tab label="User Management" value="user-management" sx={{ mx: 3 }} />
          <Tab label="Payments" value="payments" sx={{ mx: 3 }} />
        </Tabs>
      </Paper>
      <Box sx={{ p: 3 }}>
        {renderContent()}
      </Box>
    </Box>
  );
};

export default UserPaymentPage;