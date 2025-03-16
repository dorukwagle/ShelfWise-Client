import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import useReservation from "../hooks/useReservation";
import IssueBookDialog from "./IssueBookDialog";
import { BookReservation } from "../entities/BookReservation";

const ReservationList: React.FC = () => {
    const { data, isLoading, isError, error } = useReservation({ seed: "randomSeed" });

    const [selectedReservation, setSelectedReservation] = React.useState<BookReservation | null>(null);
    const [openDialog, setOpenDialog] = React.useState(false);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    const { data: reservations = [] } = data || { data: [], info: { hasNextPage: false, itemsCount: 0 } };

    const handleIssueBook = (reservation: BookReservation) => {
        setSelectedReservation(reservation);
        setOpenDialog(true);
    };

    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reservation ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations.map((reservation) => (
                            <TableRow key={reservation.reservationId}>
                                <TableCell>{reservation.reservationId}</TableCell>
                                <TableCell>{reservation.user?.fullName || "N/A"}</TableCell>
                                <TableCell>{reservation.bookInfo?.title || "N/A"}</TableCell>
                                <TableCell>{reservation.status}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => handleIssueBook(reservation)}
                                        disabled={reservation.status !== "Pending"}
                                    >
                                        Issue Book
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Dialog for issuing a book */}
            {selectedReservation && (
                <IssueBookDialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    reservation={selectedReservation}
                />
            )}
        </>
    );
};

export default ReservationList;