import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import useReturnBook from "../hooks/useReturnBook";

interface IssuanceTableProps {
    issuances: any[];
    loading: boolean;
}

export const IssuanceTable: React.FC<IssuanceTableProps> = ({ issuances, loading }) => {

    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

    const { mutate, isPending: isReturning } = useReturnBook();
    if (loading) return <p>Loading...</p>;

    const handleReturnBook = (issueId: string) => {
        setSelectedIssueId(issueId); 
        setConfirmOpen(true);
    };

    const confirmReturn = () => {
        if (!selectedIssueId) return;

        mutate(
            { issueId: selectedIssueId },
            {
                onSuccess: () => {
                    setSnackbarMessage("Book returned successfully!");
                    setSnackbarSeverity("success");
                    setConfirmOpen(false); 
                },
                onError: (error) => {
                    setSnackbarMessage(`Failed to return book: ${error.message}`);
                    setSnackbarSeverity("error");
                    setConfirmOpen(false); 
                },
            }
        );
    };

    return (
        <div>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Issue ID</TableCell>
                            <TableCell>User ID</TableCell>
                            <TableCell>Book ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Check-In Date</TableCell>
                            <TableCell>Due Date</TableCell>
                            <TableCell>Renewal Count</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {issuances.map((issue) => (
                            <TableRow key={issue.issueId}>
                                <TableCell>{issue.issueId}</TableCell>
                                <TableCell>{issue.userId}</TableCell>
                                <TableCell>{issue.bookId}</TableCell>
                                <TableCell>{issue.status}</TableCell>
                                <TableCell>{new Date(issue.checkInDate).toLocaleDateString()}</TableCell>
                                <TableCell>{new Date(issue.dueDate).toLocaleDateString()}</TableCell>
                                <TableCell>{issue.renewalCount}</TableCell>
                                <TableCell>
                                    {issue.status === "Active" && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => handleReturnBook(issue.issueId)}
                                            disabled={isReturning && selectedIssueId === issue.issueId} // Disable only the clicked button
                                        >
                                            {isReturning && issue === issue.issueId ? "Returning..." : "Return Book"}
                                        </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
                <DialogTitle>Confirm Return</DialogTitle>
                <DialogContent>
                    <p>Are you sure you want to return this book?</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={confirmReturn} color="secondary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>

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
        </div>

    );
};