import { useState, useEffect } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Dialog, DialogContent, Tabs, Tab, Paper, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import AddBookForm from '../components/AddBookForm';
import AddExistingBook from '../components/AddExistingBook';
import { useNavigate, useLocation } from 'react-router-dom';
import BookInfoTable from '../components/BookInfoTable';

const OnlineBooksPage = () => {
  const [openBookDialog, setOpenBookDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const getDefaultTab = () => {
    const params = new URLSearchParams(location.search);
    return params.get('tab') || 'bookInfo';
  };

  const [activeTab, setActiveTab] = useState<string>(getDefaultTab);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') || 'bookInfo';
    if (tab !== activeTab) {
      setActiveTab(tab);
    }
  }, [location.search, activeTab]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    navigate(`/online-books?tab=${newValue}`);
  };

  const handleAddBook = () => {
    navigate('/add-books');
  };

  const handleCloseBookDialog = () => {
    setOpenBookDialog(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bookInfo':
        // return <Typography variant="body1">Book Info Content will go here.</Typography>;
        return <BookInfoTable/>
      case 'bookbarcodes':
        return "Helloworld"
      default:
        return <Typography variant="body1">Select a tab</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, bgcolor: isDarkMode ? '#1e1e1e' : '#f9f9f9', minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: isDarkMode ? '#e0e0e0' : '#333' }}>
          Book Management
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Search Field */}
          <TextField
            variant="outlined"
            placeholder="Search for a book..."
            sx={{
              width: 350,
              height: 40,
              '& .MuiOutlinedInput-root': {
                height: 40,
                borderRadius: '8px',
                '& fieldset': { borderColor: isDarkMode ? '#444' : '#ccc' },
                '&:hover fieldset': { borderColor: isDarkMode ? '#666' : '#555' },
                '&.Mui-focused fieldset': { borderColor: isDarkMode ? '#888' : '#000' },
              },
              '& .MuiInputBase-input': {
                padding: '10px 12px',
                color: isDarkMode ? '#e0e0e0' : '#000',
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          {/* Add Book Button */}
          <Button
            variant="contained"
            sx={{
              backgroundColor: isDarkMode ? '#005bb5' : '#00308F',
              color: '#fff',
              '&:hover': { backgroundColor: isDarkMode ? '#007acc' : '#005bb5' },
              height: 40,
              borderRadius: '8px',
            }}
            startIcon={<AddIcon />}
            onClick={handleAddBook}
          >
            Add Book
          </Button>
          <Button
            variant="contained"
            color="secondary"
            sx={{ height: 40, borderRadius: '8px' }}
            onClick={() => setOpenDialog(true)}
          >
            Add Existing Book
          </Button>

          <AddExistingBook open={openDialog} onClose={() => setOpenDialog(false)} />
        </Box>
      </Box>

      {/* Tabs for Book Info and Book Barcodes */}
      <Paper elevation={3} sx={{ borderRadius: '12px', mb: 3, bgcolor: isDarkMode ? '#333' : '#fff' }}>
        <Tabs
          value={activeTab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          TabIndicatorProps={{ sx: { height: 3, borderRadius: '4px' } }}
          sx={{
            '& .MuiTab-root': {
              fontWeight: 'bold',
              textTransform: 'none',
              fontSize: '1rem',
              color: isDarkMode ? '#e0e0e0' : '#333',
              '&.Mui-selected': {
                color: isDarkMode ? '#007acc' : '#00308F',
              },
            },
          }}
        >
          <Tab label="Book Info" value="bookInfo" />
          <Tab label="Book Barcodes" value="bookbarcodes" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ p: 3, bgcolor: isDarkMode ? '#2e2e2e' : '#fff', borderRadius: '12px', boxShadow: 1 }}>
        {renderContent()}
      </Box>

      {/* Dialog for Add Book Form */}
      <Dialog open={openBookDialog} onClose={handleCloseBookDialog}>
        <DialogContent>
          <AddBookForm onClose={handleCloseBookDialog} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default OnlineBooksPage;
