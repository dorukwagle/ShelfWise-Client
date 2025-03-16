import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Grid, Button } from "@mui/material";
import useReservation from "../hooks/useReservation";
import StatusFilter from "./StatusFilter";
import IssueBookDialog from "./IssueBookDialog";
import { BookReservation, EReservationStatus } from "../entities/BookReservation";
import SearchBar from "../../issuance/components/SearchBar";

const ReservationList: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState(""); // Local state for the search input
    const [filters, setFilters] = useState<{ status?: EReservationStatus; searchQuery?: string }>({});
    const [selectedReservation, setSelectedReservation] = useState<BookReservation | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const { data, isLoading, isError, error } = useReservation(filters);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    const { data: reservations = [], info } = data || { data: [], info: { hasNextPage: false, itemsCount: 0 } };

    const handleSearch = () => {
        // Update the filters with the current search query
        setFilters((prev) => ({ ...prev, searchQuery }));
    };

    const handleIssueBook = (reservation: BookReservation) => {
        setSelectedReservation(reservation);
        setOpenDialog(true);
    };

    return (
        <div>
            <h1 style={{ marginBottom: "20px" }}>Reservations</h1>

            {/* Filters and Search Bar */}
            <Grid container spacing={2} alignItems="center" sx={{ marginBottom: "20px" }}>
                {/* Status Filter */}
                <Grid item xs={12} sm={6} md={4}>
                    <StatusFilter
                        value={filters.status}
                        onChange={(status) => setFilters((prev) => ({ ...prev, status }))}
                    />
                </Grid>

                {/* Search Bar */}
                <Grid item xs={12} sm={6} md={8}>
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onSearch={handleSearch}
                    />
                </Grid>
            </Grid>

            {/* Reservation Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reservation ID</TableCell>
                            <TableCell>User</TableCell>
                            <TableCell>Book Title</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Actions</TableCell>
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
                                    {reservation.status === EReservationStatus.Confirmed && (
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleIssueBook(reservation)}
                                        >
                                            Issue Book
                                        </Button>
                                    )}
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
        </div>
    );
};

export default ReservationList;