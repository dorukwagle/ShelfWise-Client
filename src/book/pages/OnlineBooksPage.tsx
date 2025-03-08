import { useState, useEffect, useRef } from 'react';
import { Box, Typography, Button, TextField, Dialog, DialogContent, Tabs, Tab, Paper, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddBookForm from '../components/AddBookForm';
import AddExistingBook from '../components/AddExistingBook';
import { useNavigate, useLocation } from 'react-router-dom';
import BookInfoTable from '../components/BookInfoTable';
import BookClassificationTable from '../components/BookClassificationTable';

const OnlineBooksPage = () => {
  const [openBookDialog, setOpenBookDialog] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

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

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = () => {
    // Implement search functionality here
    console.log('Searching for:', searchInput);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'bookInfo':
        return <BookInfoTable />
      case 'bookbarcodes':
        return <BookClassificationTable/>
      default:
        return <Typography variant="body1">Select a tab</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', padding: 3, bgcolor: theme.palette.background.default, minHeight: '100vh' }}>
      {/* Header Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box display="flex" alignItems="center" sx={{ marginBottom: 2 }}>
          <TextField
            inputRef={searchInputRef}
            label="Search Book"
            variant="outlined"
            size="small"
            value={searchInput}
            onChange={handleSearchInputChange}
            sx={{ width: '350px' }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSearch}
            sx={{ marginLeft: 1 }}
            startIcon={<SearchIcon />}
          >
            Search
          </Button>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddBook}
            sx={{ width: 180 }} 
          >
            Add Book
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => setOpenDialog(true)}
            sx={{ width: 180 }}
          >
            Add Existing Book
          </Button>

          <AddExistingBook open={openDialog} onClose={() => setOpenDialog(false)} />
        </Box>
      </Box>

      <Paper elevation={3} sx={{ borderRadius: '12px', mb: 3, bgcolor: theme.palette.background.paper }}>
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
              color: theme.palette.text.primary,
              '&.Mui-selected': {
                color: theme.palette.primary.main,
              },
            },
          }}
        >
          <Tab label="Book Info" value="bookInfo" />
          <Tab label="Book Barcodes" value="bookbarcodes" />
        </Tabs>
      </Paper>

      {/* Tab Content */}
      <Box sx={{ p: 3, bgcolor: theme.palette.background.paper, borderRadius: '12px', boxShadow: 1 }}>
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