import React, { useState, useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, CircularProgress, Box, Typography, TextField, Button } from '@mui/material';
import useUsers from "../hooks/useUsers";
import useSearchUsers from "../hooks/useSearchUsers";
import PaginationParams from "../../entities/PaginationParams";
import { user } from "../entities/UserManagement";

const UserList: React.FC = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(15);
  const [seed, setSeed] = useState("");
  const [accountStatus, setAccountStatus] = useState<string | undefined>(undefined);
  const [expired, setExpired] = useState<boolean | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const params: PaginationParams = { page, pageSize, seed, accountStatus, expired };
  const { data, error, isLoading } = useUsers(params);
  const { data: searchData, error: searchError, isLoading: isSearchLoading } = useSearchUsers(searchTerm);

  const users = searchTerm ? searchData?.data : data?.data;

  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
    if (event.target.value === "") {
      setSearchTerm("");
    }
  };

  const handleSearch = () => {
    setSearchTerm(searchInput);
    console.log("Search Term:", searchInput); // Log the search term
  };

  console.log("Users Data:", users); // Log the users data

  return (
    <Box>
      <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
        <TextField
          inputRef={searchInputRef}
          label="Search User"
          variant="outlined"
          size="small"
          value={searchInput}
          onChange={handleSearchInputChange}
          sx={{ width: '350px' }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ marginLeft: 1 }}
        >
          Search
        </Button>
      </Box>
      {isLoading || isSearchLoading ? (
        <CircularProgress />
      ) : users && users.length > 0 ? (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>Full Name</TableCell>
              <TableCell>College ID</TableCell>
              <TableCell>University ID</TableCell>
              <TableCell>Account Status</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Membership Expiry Date</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.collegeId}</TableCell>
                <TableCell>{user.universityId}</TableCell>
                <TableCell>{user.accountStatus}</TableCell>
                <TableCell>{user.role.role}</TableCell>
                <TableCell>{user.membership?.expiryDate ? new Date(user.membership.expiryDate).toLocaleDateString() : 'N/A'}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
          <Typography variant="h6" align="center">
            Sorry, no users found.
          </Typography>
        </Box>
      )}
      <div>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)} disabled={!data?.info.hasNextPage}>
          Next
        </button>
      </div>
    </Box>
  );
};

export default UserList;