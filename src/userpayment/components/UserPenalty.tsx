import React, { useState } from "react";
import { 
  Box, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow, 
  CircularProgress, 
  Alert, 
  Modal, 
  Card, 
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import usePenalties from "../hooks/useGetPenalties";
import useResolvePayment from "../hooks/useResolvePayment";
import { user } from "../entities/UserManagement";
import { Penalty } from "../entities/payments";
import { AxiosError } from "axios";
import { ErrorRes } from "../../entities/ErrorRes";

interface UserPenaltiesProps {
  open: boolean;
  onClose: () => void;
  user: user | null;
}

const UserPenalties: React.FC<UserPenaltiesProps> = ({ open, onClose, user }) => {
  // Initialize status to "Pending" by default
  const [status, setStatus] = useState<"Pending" | "Resolved">("Pending");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  
  // State for confirmation dialog
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedPenalty, setSelectedPenalty] = useState<Penalty | null>(null);
  
  // State for success message
  const [successSnackbarOpen, setSuccessSnackbarOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Reset page when user changes
  React.useEffect(() => {
    setPage(1);
  }, [user?.userId]);

  // Only call usePenalties when the modal is open and we have a user
  const { data: penaltiesData, isLoading, error, refetch } = usePenalties({
    userId: user?.userId || "",
    status,
    page,
    pageSize,
  });

  // Add resolve mutation
  const resolveMutation = useResolvePayment();

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatus(event.target.value as "Pending" | "Resolved");
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  // Open confirmation dialog
  const openConfirmDialog = (penalty: Penalty) => {
    setSelectedPenalty(penalty);
    setConfirmDialogOpen(true);
  };

  // Close confirmation dialog
  const closeConfirmDialog = () => {
    setConfirmDialogOpen(false);
    setSelectedPenalty(null);
  };

  // Handle resolve penalty
  const handleResolvePenalty = () => {
    if (!user?.userId || !selectedPenalty) return;
    
    resolveMutation.mutate(
      { 
        userId: user.userId, 
        penaltyId: selectedPenalty.penaltyId 
      },
      {
        onSuccess: () => {
          // Show success message
          setSuccessMessage(`Successfully resolved penalty: ${selectedPenalty.description}`);
          setSuccessSnackbarOpen(true);
          
          // Close the confirmation dialog
          closeConfirmDialog();
          
          // Manually refetch to update the list
          refetch();
        },
        onError: (error) => {
          console.error("Failed to resolve penalty:", error);
          // Close the confirmation dialog on error too
          closeConfirmDialog();
        }
      }
    );
  };

  // Don't render anything if the modal is not open
  if (!open) return null;
  if (!user) return null;

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ p: 4, minWidth: 300, maxWidth: 900, width: "80%", maxHeight: "90vh", overflow: "auto" }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
            <Typography variant="h6">
              Penalties for {user.fullName}
            </Typography>
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
            <FormControl variant="outlined" size="small" sx={{ width: "200px" }}>
              <InputLabel>Filter by Status</InputLabel>
              <Select
                value={status}
                onChange={handleStatusChange}
                label="Filter by Status"
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Resolved">Resolved</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {isLoading ? (
            <Box display="flex" justifyContent="center" sx={{ py: 4 }}>
              <CircularProgress />
            </Box>
          ) : resolveMutation.isPending ? (
            <Box display="flex" justifyContent="center" sx={{ py: 2 }}>
              <CircularProgress size={24} />
              <Typography sx={{ ml: 2 }}>Resolving penalty...</Typography>
            </Box>
          ) : resolveMutation.isError ? (
            <Alert severity="error" sx={{ mb: 2 }}>
              Failed to resolve penalty: {(resolveMutation.error as AxiosError<ErrorRes>)?.message || "Unknown error"}
            </Alert>
          ) : null}

          {error ? (
            <Alert severity="error">Failed to load penalties: {error.message}</Alert>
          ) : !penaltiesData?.data || !penaltiesData.data.length ? (
            <Alert severity="info">No penalties found for this user with status: {status}.</Alert>
          ) : (
            <>
              <Table>
                <TableHead sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {penaltiesData.data.map((penalty: Penalty) => (
                    <TableRow key={penalty.penaltyId}>
                      <TableCell>{penalty.description}</TableCell>
                      <TableCell>{penalty.penaltyType}</TableCell>
                      <TableCell>${penalty.amount.toFixed(2)}</TableCell>
                      <TableCell>{penalty.status}</TableCell>
                      <TableCell>{new Date(penalty.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(penalty.updatedAt).toLocaleDateString()}</TableCell>
                      <TableCell>
                        {penalty.status === "Pending" ? (
                          <Tooltip title="Resolve Penalty">
                            <Button
                              variant="contained"
                              color="primary"
                              size="small"
                              startIcon={<CheckCircleOutlineIcon />}
                              onClick={() => openConfirmDialog(penalty)}
                              disabled={resolveMutation.isPending}
                            >
                              Resolve
                            </Button>
                          </Tooltip>
                        ) : (
                          <Typography variant="body2" color="textSecondary">
                            Resolved
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {penaltiesData.info && penaltiesData.info.total > 0 && (
                <Box display="flex" justifyContent="center" sx={{ mt: 2 }}>
                  <Button 
                    disabled={!penaltiesData.info.prev} 
                    onClick={() => handlePageChange(page - 1)}
                  >
                    Previous
                  </Button>
                  <Typography sx={{ mx: 2 }}>
                    Page {page} of {penaltiesData.info.lastPage}
                  </Typography>
                  <Button 
                    disabled={!penaltiesData.info.next} 
                    onClick={() => handlePageChange(page + 1)}
                  >
                    Next
                  </Button>
                </Box>
              )}
            </>
          )}
        </Card>
      </Modal>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialogOpen}
        onClose={closeConfirmDialog}
      >
        <DialogTitle>Confirm Resolution</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to resolve this penalty?
            {selectedPenalty && (
              <>
                <br /><br />
                <strong>Description:</strong> {selectedPenalty.description}<br />
                <strong>Amount:</strong> ${selectedPenalty.amount.toFixed(2)}<br />
                <strong>Type:</strong> {selectedPenalty.penaltyType}
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmDialog} color="primary">
            Cancel
          </Button>
          <Button 
            onClick={handleResolvePenalty} 
            color="primary" 
            variant="contained"
            disabled={resolveMutation.isPending}
          >
            {resolveMutation.isPending ? "Processing..." : "Confirm Resolution"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={successSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSuccessSnackbarOpen(false)}
        message={successMessage}
      />
    </>
  );
};

export default UserPenalties;