import React, { useState, useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, TextField, Button, CircularProgress, Alert, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, IconButton, Card, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import useUsers from "../hooks/useUsers";
import PaginationParams from "../../entities/PaginationParams";
import { user } from "../entities/UserManagement";
import useUserRoles from "../hooks/useUserRoles";
import useUpdateAccountStatus from "../hooks/useUpdateAccountStatus";
import useUpdateUserRole from "../hooks/useUpdateUserRole";

const UserList: React.FC = () => {
    const [userParams, setuserParams] = useState<PaginationParams>({ seed: '', page: 1, pageSize: 15 });
    const [searchInput, setSearchInput] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [newAccountStatus, setNewAccountStatus] = useState<string>("");
    const [newRole, setNewRole] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { data: userData, isLoading, error: userError } = useUsers(userParams);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const accountStatusRef = useRef<HTMLInputElement>(null);
    const userRoleRef = useRef<HTMLInputElement>(null);
    const { mutate: updateAccountStatus } = useUpdateAccountStatus();
    const { mutate: updateUserRole } = useUpdateUserRole();

    const { data: userRoles } = useUserRoles();

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

    const handleEditClick = (userId: string, currentStatus: string, currentRole: string) => {
      setEditingUserId(userId);
      setNewAccountStatus(currentStatus);
      setNewRole(currentRole);
      setIsModalOpen(true);
    };

    const handleNewAccountStatusChange = (event: SelectChangeEvent<string>) => {
      setNewAccountStatus(event.target.value as string);
    };

    const handleNewRoleChange = (event: SelectChangeEvent<string>) => {
      setNewRole(event.target.value);
    };

    const handleAccountStatusUpdate = () => {
      if (editingUserId && newAccountStatus) {
        updateAccountStatus({ userId: editingUserId, status: newAccountStatus });
        setNewAccountStatus("");
      }
    };

    const handleUserRoleUpdate = () => {
      if (editingUserId && newRole) {
        updateUserRole({ userId: editingUserId, roleId: newRole });
        setNewRole("");
      }
    };

    const handleCancelClick = () => {
      setEditingUserId(null);
      setNewRole("");
      setNewAccountStatus("");
      setIsModalOpen(false);
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
            sx={{ width: "350px" }}
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
          <FormControl variant="outlined" size="small" sx={{ width: "200px" }}>
            <InputLabel>Filter</InputLabel>
            <Select
              value={accountStatus}
              onChange={handleAccountStatusChange}
              label="Filter"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
              <MenuItem value="Rejected">Rejected</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {!userData?.data.length && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginTop={4}
          >
            <Typography variant="h6" align="center">
              Sorry, no users found.
            </Typography>
          </Box>
        )}
        <Box
          display="flex"
          justifyContent="space-between"
          sx={{ marginBottom: 2 }}
        ></Box>
        {userData && userData.data.length && (
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
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ width: "150px" }}
                      >
                        <InputLabel>Account Status</InputLabel>
                        <Select
                          value={newAccountStatus}
                          onChange={handleNewAccountStatusChange}
                          label="Account Status"
                        >
                          <MenuItem value="Active">Active</MenuItem>
                          <MenuItem value="Inactive">Inactive</MenuItem>
                          <MenuItem value="Rejected">Rejected</MenuItem>
                          <MenuItem value="Suspended">Suspended</MenuItem>
                        </Select>
                      </FormControl>
                    ) : (
                      user.accountStatus
                    )}
                  </TableCell>
                  <TableCell>
                    {editingUserId === user.userId ? (
                      <FormControl
                        variant="outlined"
                        size="small"
                        sx={{ width: "150px" }}
                      >
                        <InputLabel>Role</InputLabel>
                        <Select
                          value={newRole}
                          onChange={handleNewRoleChange}
                          label="Role"
                        >
                          {userRoles.map(
                            (userRole: { roleId: string; role: string }) => (
                              <MenuItem
                                key={userRole.roleId}
                                value={userRole.roleId}
                              >
                                {userRole.role}
                              </MenuItem>
                            )
                          )}
                        </Select>
                      </FormControl>
                    ) : (
                      user.role.role
                    )}
                  </TableCell>
                  <TableCell>
                    {user.membership?.expiryDate
                      ? new Date(
                          user.membership.expiryDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {editingUserId === user.userId ? (
                      <>
                        <IconButton onClick={handleCancelClick}>
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <IconButton
                        onClick={() =>
                          handleEditClick(
                            user.userId,
                            user.accountStatus,
                            user.role.roleId
                          )
                        }
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Modal
          open={isModalOpen}
          onClose={handleCancelClick}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Card sx={{ p: 4, minWidth: 300, maxWidth: 400 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>
              Edit User
            </Typography>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Account Status</InputLabel>
              <Select
                inputRef={accountStatusRef}
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
            <Button
              fullWidth
              variant="contained"
              onClick={handleAccountStatusUpdate}
              sx={{ mb: 2 }}
            >
              Save Account Status
            </Button>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Role</InputLabel>
              <Select
                inputRef={userRoleRef}
                value={newRole}
                onChange={handleNewRoleChange}
                label="Role"
              >
                {userRoles?.map(
                  (userRole: { roleId: string; role: string }) => (
                    <MenuItem key={userRole.roleId} value={userRole.roleId}>
                      {userRole.role}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
            <Button
              fullWidth
              variant="contained"
              onClick={handleUserRoleUpdate}
              sx={{ mb: 2 }}
            >
              Save Role
            </Button>
            <Button fullWidth variant="outlined" onClick={handleCancelClick}>
              Cancel
            </Button>
          </Card>
        </Modal>
      </Box>
    );
};

export default UserList;