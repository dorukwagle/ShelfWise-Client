// src/components/EnrollmentTable.tsx
import React, { useState } from "react";
import {
  Box,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  TableContainer,
  Paper,
  TablePagination
} from "@mui/material";
import { SearchOff, Visibility, VisibilityOff } from "@mui/icons-material";
import useEnrollments, { DEFAULT_PAGE_SIZE } from "../hooks/useEnrollments";


const EnrollmentTable: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFullData, setShowFullData] = useState<{ [key: string]: boolean }>({});
  const [status, setStatus] = useState<{ [key: string]: string }>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(DEFAULT_PAGE_SIZE);
  const { data: enrollments, isLoading, error } = useEnrollments(page + 1, rowsPerPage);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleShowFullData = (rollNumber: string) => {
    setShowFullData(prevState => ({
      ...prevState,
      [rollNumber]: !prevState[rollNumber]
    }));
  };

  const handleStatusChange = (rollNumber: string, newStatus: string) => {
    setStatus(prevState => ({
      ...prevState,
      [rollNumber]: newStatus
    }));
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEnrollments = enrollments?.filter(enrollment => {
    const lowercasedTerm = searchTerm.toLowerCase();
    return (
      enrollment.rollNumber.toLowerCase().includes(lowercasedTerm) ||
      enrollment.fullName.toLowerCase().includes(lowercasedTerm) ||
      enrollment.email.toLowerCase().includes(lowercasedTerm) ||
      enrollment.contactNo.toLowerCase().includes(lowercasedTerm) ||
      enrollment.enrollmentYear.toLowerCase().includes(lowercasedTerm) ||
      enrollment.accountStatus.toLowerCase().includes(lowercasedTerm) ||
      (enrollment.dob && enrollment.dob.toLowerCase().includes(lowercasedTerm)) ||
      enrollment.gender.toLowerCase().includes(lowercasedTerm)
    );
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching enrollments: {error.message}</div>;
  }

  return (
    <Box sx={{ marginTop: 4 }}>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2, marginRight: 2 }}>
        <TextField
          label="Search Enrollment"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={handleSearch}
          sx={{ width: '300px' }} 
        />
      </Box>
      {filteredEnrollments && filteredEnrollments.length > 0 ? (
        <>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Roll Number</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Contact No</TableCell>
                  <TableCell>Enrollment Year</TableCell>
                  <TableCell>Account Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredEnrollments.map((enrollment) => (
                  <React.Fragment key={enrollment.rollNumber}>
                    <TableRow>
                      <TableCell>{enrollment.rollNumber}</TableCell>
                      <TableCell>{enrollment.fullName}</TableCell>
                      <TableCell>{enrollment.dob}</TableCell>
                      <TableCell>{enrollment.email}</TableCell>
                      <TableCell>{enrollment.contactNo}</TableCell>
                      <TableCell>{enrollment.enrollmentYear}</TableCell>
                      <TableCell>
                        <FormControl fullWidth>
                          <Select
                            value={status[enrollment.rollNumber] || enrollment.accountStatus}
                            onChange={(e) => handleStatusChange(enrollment.rollNumber, e.target.value as string)}
                          >
                            <MenuItem value="Pending">Pending</MenuItem>
                            <MenuItem value="Approved">Approved</MenuItem>
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <IconButton onClick={() => toggleShowFullData(enrollment.rollNumber)}>
                          {showFullData[enrollment.rollNumber] ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </TableCell>
                    </TableRow>
                    {showFullData[enrollment.rollNumber] && (
                      <TableRow>
                        <TableCell colSpan={8}>
                          <Box>
                            <Typography>User ID: {enrollment.userId}</Typography>
                            <Typography>Address: {enrollment.address}</Typography>
                            <Typography>Profile Picture: {enrollment.profilePicUrl}</Typography>
                            <Typography>Account Creation Date: {enrollment.accountCreationDate}</Typography>
                            <Typography>Gender: {enrollment.gender}</Typography>
                            <Typography>Role ID: {enrollment.roleId}</Typography>
                            <Typography>Created At: {enrollment.createdAt}</Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={enrollments?.length || 0}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
          <SearchOff fontSize="large" color="disabled" />
          <Typography variant="h6" align="center">
            Sorry, no enrollments found.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default EnrollmentTable;
