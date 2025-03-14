import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Alert, 
  ToggleButton, 
  ToggleButtonGroup, 
  CircularProgress 
} from '@mui/material';
import fetchReservation from '../hooks/getReservations';
import useMe from '../../hooks/useMe';
import { AxiosError } from 'axios';
import ReservationsTable from '../components/ReservationTable';
import BookDetailsDialog from '../components/BookDetailsDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import CancelDialog from '../components/CancelDialog';
import AssignBookDialog from '../components/AssignBookDialog';
import AssignableBooksDialog from '../components/AssignableBookDialog';
import { Reservation } from '../entities/reservations';

const ReservationPage = () => {
  // State for pagination and filtering
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filter, setFilter] = useState('Pending');
  
  // Get current user and role information
  const { data: currentUser, isLoading: userLoading, error: userError } = useMe();
  
  // Determine if user has staff privileges (not a member)
  const isStaff = currentUser?.role?.role !== 'Member';
  
  // Use server-side pagination and filtering
  const { data, error, isLoading, refetch } = fetchReservation({ 
    seed: '',
    page, 
    pageSize,
    status: filter !== 'all' ? filter as "Pending" | "Confirmed" | "Cancelled" | "Resolved" : undefined
  });
  
  // State for book details dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Reservation | null>(null);
  
  // State for confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [reservationToConfirm, setReservationToConfirm] = useState<string | null>(null);
  
  // State for cancel dialog
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [reservationToCancel, setReservationToCancel] = useState<string | null>(null);
  
  // State for assign book dialog
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  
  // State for assignable books dialog
  const [assignableDialogOpen, setAssignableDialogOpen] = useState(false);
  const [selectedReservationId, setSelectedReservationId] = useState<string | null>(null);
  
  // Handle opening the book details dialog
  const handleOpenBookDetails = (reservation: Reservation) => {
    setSelectedBook(reservation);
    setOpenDialog(true);
  };

  // Handle closing the book details dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedBook(null);
  };
  
  // Handle opening the confirmation dialog
  const handleOpenConfirmDialog = (reservationId: string) => {
    setReservationToConfirm(reservationId);
    setConfirmDialogOpen(true);
  };
  
  // Handle closing the confirmation dialog
  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setReservationToConfirm(null);
  };
  
  // Handle opening the cancel dialog
  const handleOpenCancelDialog = (reservationId: string) => {
    setReservationToCancel(reservationId);
    setCancelDialogOpen(true);
  };
  
  // Handle closing the cancel dialog
  const handleCloseCancelDialog = () => {
    setCancelDialogOpen(false);
    setReservationToCancel(null);
  };
  
  // Handle opening the assign book dialog
  const handleOpenAssignDialog = () => {
    setAssignDialogOpen(true);
  };
  
  // Handle closing the assign book dialog
  const handleCloseAssignDialog = () => {
    setAssignDialogOpen(false);
  };
  
  // Handle opening the assignable books dialog
  const handleOpenAssignableDialog = (reservationId: string) => {
    setSelectedReservationId(reservationId);
    setAssignableDialogOpen(true);
  };
  
  // Handle closing the assignable books dialog
  const handleCloseAssignableDialog = () => {
    setAssignableDialogOpen(false);
    setSelectedReservationId(null);
  };

  const handleFilterChange = (
    event: React.MouseEvent<HTMLElement>,
    newFilter: string | null
  ) => {
    if (newFilter !== null) {
      setFilter(newFilter);
      setPage(1); // Reset to first page when filter changes
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    setPage(newPage);
  };

  // Calculate total pages from server response
  const totalItems = data?.info.total || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  
  // Get reservations from response
  const reservations = data?.data || [];

  // Determine visibility of action columns based on the current filter and user role
  const showActionColumns = isStaff && (filter === 'Pending' || filter === 'Confirmed');
  
  // Determine visibility of assignable books column
  const showAssignableColumn = isStaff && (filter === 'Pending');

  // Handle user loading error
  if (userError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading user information: {(userError as AxiosError)?.message || 'Something went wrong'}
        </Alert>
      </Box>
    );
  }

  // Handle reservation loading error
  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Error loading reservations: {(error as AxiosError)?.message || 'Something went wrong'}
        </Alert>
      </Box>
    );
  }
  
  // Show loading while fetching user data
  if (userLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Reservations
      </Typography>
      <Paper sx={{ p: 2, mb: 3 }}>
        <ToggleButtonGroup
          value={filter}
          exclusive
          onChange={handleFilterChange}
          aria-label="reservation filter"
          size="small"
        >
          <ToggleButton value="Pending">Pending</ToggleButton>
          <ToggleButton value="Confirmed">Approved</ToggleButton>
          <ToggleButton value="Cancelled">Cancelled</ToggleButton>
          <ToggleButton value="Resolved">Resolved</ToggleButton>
        </ToggleButtonGroup>
      </Paper>
      
      <ReservationsTable 
        isLoading={isLoading}
        reservations={reservations}
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        totalPages={totalPages}
        showActionColumns={showActionColumns}
        showAssignableColumn={showAssignableColumn}
        handleOpenBookDetails={handleOpenBookDetails}
        handleOpenConfirmDialog={handleOpenConfirmDialog}
        handleOpenCancelDialog={handleOpenCancelDialog}
        handleOpenAssignableDialog={handleOpenAssignableDialog}
        handlePageChange={handlePageChange}
      />
      
      {/* Only render these dialogs for staff users */}
      {isStaff && (
        <>
          <BookDetailsDialog 
            open={openDialog}
            selectedBook={selectedBook}
            onClose={handleCloseDialog}
            onAssign={handleOpenAssignDialog}
            isStaff={isStaff}
          />
          
          <ConfirmDialog 
            open={confirmDialogOpen}
            reservationId={reservationToConfirm}
            onClose={handleCloseConfirmDialog}
            onSuccess={refetch}
          />
          
          <CancelDialog 
            open={cancelDialogOpen}
            reservationId={reservationToCancel}
            onClose={handleCloseCancelDialog}
            onSuccess={refetch}
          />
          
          <AssignBookDialog 
            open={assignDialogOpen}
            selectedBook={selectedBook}
            onClose={handleCloseAssignDialog}
            onSuccess={() => {
              refetch();
              setAssignDialogOpen(false);
              setOpenDialog(false);
            }}
          />
          
          <AssignableBooksDialog 
            open={assignableDialogOpen}
            reservationId={selectedReservationId}
            onClose={handleCloseAssignableDialog}
            onSelectBook={(book) => {
              setSelectedBook(book);
              setAssignableDialogOpen(false);
              setAssignDialogOpen(true);
            }}
          />
        </>
      )}
      
      {/* For regular members, only render the book details dialog */}
      {!isStaff && (
        <BookDetailsDialog 
          open={openDialog}
          selectedBook={selectedBook}
          onClose={handleCloseDialog}
          onAssign={handleOpenAssignDialog}
          isStaff={isStaff}
        />
      )}
    </Box>
  );
};

export default ReservationPage;