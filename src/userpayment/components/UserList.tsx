import React, { useState, useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, TextField, Button, CircularProgress, Alert, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import useUsers from "../hooks/useUsers";
import PaginationParams from "../../entities/PaginationParams";
import { user } from "../entities/UserManagement";

const UserList: React.FC = () => {
    const [userParams, setuserParams] = useState<PaginationParams>({ seed: '', page: 1, pageSize: 15 });
    const [searchInput, setSearchInput] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [newAccountStatus, setNewAccountStatus] = useState<string>("");
    const { data: userData, isLoading, error: userError } = useUsers(userParams);
    const searchInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
    }, []);
    
    if (isLoading) return <CircularProgress />;
    if (userError) return <Alert severity="error">An error occurred: {userError?.message}</Alert>;

    const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(event.target.value);
      if (event.target.value === "") {
        setuserParams({ ...userParams, seed: '' });
      }
    };

    const handleSearch = () => {
      setuserParams({ ...userParams, seed: searchInput });
    };

    const handleAccountStatusChange = (event: SelectChangeEvent<string>) => {
      const selectedStatus = event.target.value as string;
      setAccountStatus(selectedStatus);
      if (selectedStatus === "") {
        setuserParams({ ...userParams, accountStatus: undefined, expired: undefined });
      } else if (selectedStatus === "Expired") {
        setuserParams({ ...userParams, expired: true, accountStatus: undefined });
      } else {
        setuserParams({ ...userParams, accountStatus: selectedStatus, expired: undefined });
      }
    };

    const handleEditClick = (userId: string, currentStatus: string) => {
      setEditingUserId(userId);
      setNewAccountStatus(currentStatus);
    };

    const handleNewAccountStatusChange = (event: SelectChangeEvent<string>) => {
      setNewAccountStatus(event.target.value as string);
    };

    const handleSaveClick = () => {
      // Add functionality to save changes here
      setEditingUserId(null);
    };

    const handleCancelClick = () => {
      setEditingUserId(null);
      setNewAccountStatus("");
    };

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
        <Box display="flex" justifyContent="flex-end" sx={{ marginBottom: 2 }}>
          <FormControl variant="outlined" size="small" sx={{ width: '200px' }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={accountStatus}
              onChange={handleAccountStatusChange}
              label="Filter"
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {!userData?.data.length && (
          <Box display="flex" flexDirection="column" alignItems="center" marginTop={4}>
            <Typography variant="h6" align="center">
              Sorry, no users found.
            </Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 2 }}>
        </Box>
        { userData && userData.data.length && (
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
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userData.data.map((user: user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.fullName}</TableCell>
                  <TableCell>{user.collegeId}</TableCell>
                  <TableCell>{user.universityId}</TableCell>
                  <TableCell>
                    {editingUserId === user.userId ? (
                      <FormControl variant="outlined" size="small" sx={{ width: '150px' }}>
                        <InputLabel>Account Status</InputLabel>
                        <Select
                          value={newAccountStatus}
                          onChange={handleNewAccountStatusChange}
                          label="Account Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="Pending">Pending</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      user.accountStatus
                    )}
                  </TableCell>
                  <TableCell>{user.role.role}</TableCell>
                  <TableCell>{user.membership?.expiryDate ? new Date(user.membership.expiryDate).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {editingUserId === user.userId ? (
                      <>
                        <IconButton onClick={handleSaveClick}>
                          <SaveIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelClick}>
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton onClick={() => handleEditClick(user.userId, user.accountStatus)}>
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    );
  };

export default UserList;