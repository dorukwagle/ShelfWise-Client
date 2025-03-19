import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Pagination,
  IconButton,
  Chip,
  Typography
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { BookReservation } from '../entities/BookReservation';
import { Book } from '@mui/icons-material';
import IssueBookDialog from '../../issuance/components/IssueBookDialog';

interface ReservationsTableProps {
  isLoading: boolean;
  reservations: BookReservation[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  showActionColumns: boolean;
  showAssignableColumn: boolean;
  handleOpenBookDetails: (reservation: BookReservation) => void;
  handleOpenConfirmDialog: (reservationId: string) => void;
  handleOpenCancelDialog: (reservationId: string) => void;
  handleOpenAssignableDialog: (reservation: BookReservation) => void;
  // handleOpenIssueBookDialog: (reservation: BookReservation) => void;
  handlePageChange: (event: React.ChangeEvent<unknown>, newPage: number) => void;
}

const ReservationsTable: React.FC<ReservationsTableProps> = ({
  isLoading,
  reservations,
  page,
  pageSize,
  totalItems,
  totalPages,
  showActionColumns,
  showAssignableColumn,
  handleOpenBookDetails,
  handleOpenConfirmDialog,
  handleOpenCancelDialog,
  handleOpenAssignableDialog,
  // handleOpenIssueBookDialog,
  handlePageChange
}) => {
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);

  // const [selectedBook, setSelectedBook] = useState<BookReservation | null>(null);
  const [issueBook, setBook] = useState<BookReservation | null>(null);

  const handleOpenIssueBookDialog = (book: BookReservation) => {
    setBook(book);
    setIssueDialogOpen(true);
  };

  const handleCloseIssueBookDialog = () => {
    setIssueDialogOpen(false);
  };

  return (
    <Paper sx={{ p: 2 }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Reservation ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Reservation Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Book Details</TableCell>
              {/* Only show assignable books column for certain cases */}
              {showAssignableColumn && <TableCell>Assignable Books</TableCell>}
              {/* Show actions column for staff users and certain statuses */}
              {showActionColumns && <TableCell>Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={showActionColumns && showAssignableColumn ? 8 : showActionColumns ? 7 : 6} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : reservations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={showActionColumns && showAssignableColumn ? 8 : showActionColumns ? 7 : 6} align="center">
                  No reservations found.
                </TableCell>
              </TableRow>
            ) : (
              reservations.map((reservation) => (
                <TableRow key={reservation.reservationId}>
                  <TableCell>{reservation.reservationId}</TableCell>
                  <TableCell>{reservation.user.fullName}</TableCell>
                  <TableCell>{reservation.user.fullName}</TableCell>
                  {/* <TableCell>{new Date(reservation.reservationDate).toLocaleString()}</TableCell> */}
                  <TableCell>
                    <Chip
                      label={reservation.status}
                      color={
                        reservation.status === 'Confirmed' ? 'success' :
                          reservation.status === 'Pending' ? 'warning' :
                            reservation.status === 'Cancelled' ? 'error' : 'default'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{reservation.bookInfo?.title || 'Untitled'}</TableCell>
                  <TableCell>
                    {/* Book Details Column */}
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenBookDetails(reservation)}
                      title="View Book Details"
                    >
                      <MenuBookIcon />
                    </IconButton>
                  </TableCell>

                  {/* Only render Assignable Books cell if we're showing that column */}
                  {showAssignableColumn && (
                    <TableCell>
                      {/* Only show Assignable Books button for Pending status */}
                      {reservation.status === 'Pending' && (
                        <IconButton
                          color="info"
                          onClick={() => handleOpenAssignableDialog(reservation)}
                          title="View Assignable Books"
                        >
                          <AssignmentIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  )}

                  {/* Only render Actions cell if we're showing action columns */}
                  {showActionColumns && (
                    <TableCell>
                      {/* Only show actions for Pending and Confirmed status */}
                      {(reservation.status === 'Pending' || reservation.status === 'Confirmed') && (
                        <Box sx={{ display: 'flex' }}>
                          {/* Only show confirm button for Pending reservations */}
                          {reservation.status === 'Pending' && (
                            <IconButton
                              color="success"
                              onClick={() => handleOpenConfirmDialog(reservation.reservationId)}
                              title="Confirm Reservation"
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          )}

                          {reservation.status === 'Confirmed' && (
                            <IconButton
                              color="success"
                              onClick={() => handleOpenIssueBookDialog(reservation)}
                              title="Issue Book"
                            >
                              <Book />
                            </IconButton>
                          )}
                          {/* Show cancel button for both Pending and Confirmed reservations */}
                          <IconButton
                            color="error"
                            onClick={() => handleOpenCancelDialog(reservation.reservationId)}
                            title="Cancel Reservation"
                          >
                            <CancelIcon />
                          </IconButton>
                        </Box>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2, mb: 1 }}>
        <Typography variant="body2" color="text.secondary">
          {isLoading ? 'Loading...' :
            `Showing ${reservations.length ? (page - 1) * pageSize + 1 : 0} to 
            ${Math.min(page * pageSize, totalItems)} of ${totalItems} entries`
          }
        </Typography>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
          disabled={isLoading}
        />
      </Box>
      {issueBook && (
        <IssueBookDialog
          open={issueDialogOpen}
          onClose={handleCloseIssueBookDialog}
          reservation={issueBook}
        />
      )}
    </Paper>
  );
};

export default ReservationsTable;