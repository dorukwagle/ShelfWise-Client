import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import useIssueReservation from "../hooks/useIssueReservation";
import { BookReservation } from "../entities/BookReservation";

interface IssueBookDialogProps {
    open: boolean;
    onClose: () => void;
    reservation: BookReservation;
}

const IssueBookDialog: React.FC<IssueBookDialogProps> = ({ open, onClose, reservation }) => {
    const [barcode, setBarcode] = useState("");
    const [error, setError] = useState<string | null>(null);

    const { mutate, isPending } = useIssueReservation(() => {
        onClose(); // Close the dialog after successful issuance
    });

    const handleIssue = () => {
        if (!barcode) {
            setError("Please enter a valid barcode.");
            return;
        }

        setError(null);
        mutate({
            reservationId: reservation.reservationId,
            userId: reservation.userId,
            barcode,
        });
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Issue Book</DialogTitle>
            <DialogContent>
                <p>Are you sure you want to issue the book "{reservation.bookInfo?.title}"?</p>
                <TextField
                    label="Barcode"
                    value={barcode}
                    onChange={(e) => setBarcode(e.target.value)}
                    fullWidth
                    margin="normal"
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={isPending}>
                    Cancel
                </Button>
                <Button onClick={handleIssue} variant="contained" color="primary" disabled={isPending}>
                    {isPending ? "Issuing..." : "Issue"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IssueBookDialog;