import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Pagination,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import useCancelRenewal from "../hooks/useCancelRenewal";
import useApproveRenewal from "../hooks/useApproveRenewal";
import useRejectRenewal from "../hooks/useRejectRenewal";
import useRenewals from "../hooks/useRenewal";
import PaginationParams from "../../../entities/PaginationParams";

const RenewalList: React.FC = () => {
  const [renewalParams, setRenewalParams] = useState<PaginationParams>({ seed: "", page: 1, pageSize: 15 });
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  // Confirmation dialog states
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [actionType, setActionType] = useState<"cancel" | "approve" | "reject" | null>(null);
  const [selectedRenewalId, setSelectedRenewalId] = useState<string | null>(null);

  const { data, isLoading, isError, error } = useRenewals(renewalParams);
  const { mutate: cancelRenewal } = useCancelRenewal();
  const { mutate: approveRenewal } = useApproveRenewal();
  const { mutate: rejectRenewal } = useRejectRenewal();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error?.message}</p>;

  const { data: renewals = [], info } = data || { data: [], info: { hasNextPage: false, itemsCount: 0 } };

  const handleSearch = () => {
    setRenewalParams({ ...renewalParams, seed: searchQuery });
    setPage(1); // Reset pagination to the first page
  };

  const openConfirmationDialog = (type: "cancel" | "approve" | "reject", renewalId: string) => {
    setActionType(type);
    setSelectedRenewalId(renewalId);
    setConfirmOpen(true);
  };

  const closeConfirmationDialog = () => {
    setActionType(null);
    setSelectedRenewalId(null);
    setConfirmOpen(false);
  };

  const handleConfirmAction = () => {
    if (!selectedRenewalId || !actionType) return;

    switch (actionType) {
      case "cancel":
        cancelRenewal(selectedRenewalId, {
          onSuccess: () => {
            setSnackbarMessage("Renewal request canceled successfully!");
            setSnackbarSeverity("success");
          },
          onError: (err) => {
            setSnackbarMessage(`Failed to cancel renewal: ${err.message}`);
            setSnackbarSeverity("error");
          },
        });
        break;
      case "approve":
        approveRenewal(selectedRenewalId, {
          onSuccess: () => {
            setSnackbarMessage("Renewal request approved successfully!");
            setSnackbarSeverity("success");
          },
          onError: (err) => {
            setSnackbarMessage(`Failed to approve renewal: ${err.message}`);
            setSnackbarSeverity("error");
          },
        });
        break;
      case "reject":
        rejectRenewal(selectedRenewalId, {
          onSuccess: () => {
            setSnackbarMessage("Renewal request rejected successfully!");
            setSnackbarSeverity("success");
          },
          onError: (err) => {
            setSnackbarMessage(`Failed to reject renewal: ${err.message}`);
            setSnackbarSeverity("error");
          },
        });
        break;
      default:
        break;
    }

    closeConfirmationDialog();
  };

  return (
    <div>
      <h1>Renewal Requests</h1>

      {/* Search Bar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <TextField
          label="Search by User Name or Book Title"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>

      {/* Renewal Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Renewal ID</TableCell>
              <TableCell>User</TableCell>
              <TableCell>Book Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renewals.map((renewal) => (
              <TableRow key={renewal.renewalId}>
                <TableCell>{renewal.renewalId}</TableCell>
                <TableCell>{renewal.user?.fullName || "N/A"}</TableCell>
                <TableCell>{renewal.bookTitle || "N/A"}</TableCell>
                <TableCell>{renewal.status}</TableCell>
                <TableCell>
                  {renewal.status === "Pending" && (
                    <>
                      <Button color="error" onClick={() => openConfirmationDialog("cancel", renewal.renewalId)}>
                        Cancel
                      </Button>
                      <Button color="success" onClick={() => openConfirmationDialog("approve", renewal.renewalId)}>
                        Approve
                      </Button>
                      <Button color="error" onClick={() => openConfirmationDialog("reject", renewal.renewalId)}>
                        Reject
                      </Button>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      {info && (
        <Pagination
          count={Math.ceil(info.itemsCount / 15)}
          page={page}
          onChange={(_, newPage) => setPage(newPage)}
          sx={{ marginTop: "20px" }}
        />
      )}

      {/* Snackbar for Success/Error Messages */}
      <Snackbar
        open={!!snackbarMessage}
        autoHideDuration={6000}
        onClose={() => setSnackbarMessage(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert severity={snackbarSeverity} onClose={() => setSnackbarMessage(null)}>
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={closeConfirmationDialog}>
        <DialogTitle>Confirm Action</DialogTitle>
        <DialogContent>
          {actionType === "cancel" && (
            <p>Are you sure you want to cancel this renewal request?</p>
          )}
          {actionType === "approve" && (
            <p>Are you sure you want to approve this renewal request?</p>
          )}
          {actionType === "reject" && (
            <p>Are you sure you want to reject this renewal request?</p>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmationDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmAction} color="secondary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RenewalList;