import React, { useState, useRef, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableRow, Box, Typography, TextField, Button, CircularProgress, Alert, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent, IconButton, Card, Modal, Menu } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GavelIcon from '@mui/icons-material/Gavel';
import useUsers from "../hooks/useUsers";
import PaginationParams from "../../entities/PaginationParams";
import { user } from "../entities/UserManagement";
import useUserRoles from "../hooks/useUserRoles";
import useUpdateAccountStatus from "../hooks/useUpdateAccountStatus";
import useUpdateUserRole from "../hooks/useUpdateUserRole";
// Import the AddPenalty component
import AddPenalty from "./AddPenaltyDialog";

const UserList: React.FC = () => {
    const [userParams, setuserParams] = useState<PaginationParams>({ seed: '', page: 1, pageSize: 15 });
    const [searchInput, setSearchInput] = useState("");
    const [accountStatus, setAccountStatus] = useState("");
    const [editingUserId, setEditingUserId] = useState<string | null>(null);
    const [newAccountStatus, setNewAccountStatus] = useState<string>("");
    const [newRole, setNewRole] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPenaltyModalOpen, setIsPenaltyModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<user | null>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    
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

    // Handle opening the action menu
    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, user: user) => {
      setAnchorEl(event.currentTarget);
      setSelectedUser(user);
    };

    // Handle closing the action menu
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    // Handle opening the edit dialog
    const handleEditClick = () => {
      if (selectedUser) {
        setEditingUserId(selectedUser.userId);
        setNewAccountStatus(selectedUser.accountStatus);
        setNewRole(selectedUser.role.roleId);
        setIsModalOpen(true);
      }
      handleMenuClose();
    };

    // Handle opening the penalty dialog
    const handleAddPenaltyClick = () => {
      setIsPenaltyModalOpen(true);
      handleMenuClose();
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
        setIsModalOpen(false);
      }
    };

    const handleUserRoleUpdate = () => {
      if (editingUserId && newRole) {
        updateUserRole({ userId: editingUserId, roleId: newRole });
        setNewRole("");
        setIsModalOpen(false);
      }
    };

    const handleCancelClick = () => {
      setEditingUserId(null);
      setNewRole("");
      setNewAccountStatus("");
      setIsModalOpen(false);
    };

    // Close penalty modal
    const handleClosePenaltyModal = () => {
      setIsPenaltyModalOpen(false);
    };

    return (
      <Box>
        <Box display="flex" justifyContent="space-between" sx={{ marginBottom: 2 }}>
        <Box display="flex" justifyContent="flex-start" sx={{ marginBottom: 2 }}>
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
                  <TableCell>{user.accountStatus}</TableCell>
                  <TableCell>{user.role.role}</TableCell>
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
                    <IconButton onClick={(e) => handleMenuOpen(e, user)}>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>
            <EditIcon fontSize="small" sx={{ mr: 1 }} />
            Edit User
          </MenuItem>
          <MenuItem onClick={handleAddPenaltyClick}>
            <GavelIcon fontSize="small" sx={{ mr: 1 }} />
            Add Penalty
          </MenuItem>
        </Menu>

        {/* Edit User Modal */}
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

        {/* Add Penalty Modal */}
        {selectedUser && (
          <AddPenalty 
            open={isPenaltyModalOpen} 
            onClose={handleClosePenaltyModal} 
            user={selectedUser} 
          />
        )}
      </Box>
    );
};

export default UserList;