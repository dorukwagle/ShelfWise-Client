import React, { useState } from "react";
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  IconButton,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { user } from "../entities/UserManagement";
import usePaymentHistory from "../hooks/useGetPaymentHistory";
import { Payment } from "../entities/payments";

/**
 * Props interface for the PaymentHistoryDialog component
 */
interface PaymentHistoryDialogProps {
  open: boolean;         // Controls visibility of the dialog
  onClose: () => void;   // Function to call when closing the dialog
  user: user;            // User object containing details of the selected user
}

/**
 * Component that displays a modal dialog showing payment history for a specific user
 * 
 * @param {PaymentHistoryDialogProps} props - Component properties
 * @returns {React.ReactElement | null} - The rendered component or null if not open
 */
const PaymentHistoryDialog: React.FC<PaymentHistoryDialogProps> = ({ open, onClose, user }) => {
  // State for pagination
  const [page, setPage] = useState(1);
  const pageSize = 10;  // Number of records per page

  // Reset page to 1 when user changes to ensure we start from the first page
  React.useEffect(() => {
    setPage(1);
  }, [user?.userId]);

  // Fetch payment history data only when dialog is open and we have a valid user
  // Always use "Completed" status for payment history
  const { data: paymentData, isLoading, error } = usePaymentHistory({
    userId: user?.userId || "",
    status: "Completed",
    page,
    pageSize,
  });

  /**
   * Handle page navigation for pagination
   * 
   * @param {number} newPage - The page number to navigate to
   */
  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Don't render anything if the dialog is not open or user is null
  if (!open) return null;
  if (!user) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      PaperProps={{
        sx: { width: "700px", maxHeight: "80vh" }  // Set fixed width and max height
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">
            Payment History - {user.fullName}
          </Typography>
          {/* Close icon button - replaced button with just the icon */}
          <IconButton onClick={onClose} size="small" aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      
      <DialogContent dividers>
        {/* Loading state */}
        {isLoading ? (
          <Box display="flex" justifyContent="center" p={3}>
            <CircularProgress />
          </Box>
        ) : error ? (
          // Error state
          <Alert severity="error">Failed to load payment history: {(error as Error).message}</Alert>
        ) : !paymentData?.data || !paymentData.data.length ? (
          // Empty state - no data
          <Alert severity="info">No payment records found for this user.</Alert>
        ) : (
          // Data loaded successfully
          <>
            {/* Payment history table */}
            <Table>
              <TableHead sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>
                <TableRow>
                  <TableCell>Payment ID</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Penalty Type</TableCell>
                  <TableCell>Created Date</TableCell>
                  <TableCell>Updated Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paymentData.data.map((payment: Payment) => (
                  <TableRow key={payment.paymentId}>
                    <TableCell>{payment.paymentId}</TableCell>
                    <TableCell>₹{payment.amountPaid.toFixed(2)}</TableCell>
                    <TableCell>{payment.paymentType}</TableCell>
                    <TableCell>{new Date(payment.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(payment.updatedAt).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            {/* Pagination controls - only show if there's data with pagination info */}
            {paymentData.info && paymentData.info.total > 0 && (
              <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                <Button 
                  disabled={!paymentData.info.prev}  // Disable if no previous page
                  onClick={() => handlePageChange(page - 1)}
                >
                  Previous
                </Button>
                <Typography sx={{ mx: 2 }}>
                  Page {page} of {paymentData.info.lastPage}
                </Typography>
                <Button 
                  disabled={!paymentData.info.next}  // Disable if no next page
                  onClick={() => handlePageChange(page + 1)}
                >
                  Next
                </Button>
              </Box>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentHistoryDialog;