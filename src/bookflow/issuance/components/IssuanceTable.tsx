import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

interface IssuanceTableProps {
    issuances: any[];
    loading: boolean;
}

export const IssuanceTable: React.FC<IssuanceTableProps> = ({ issuances, loading }) => {
    if (loading) return <p>Loading...</p>;

    return (
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
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};