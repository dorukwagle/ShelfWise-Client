import React, { useState } from "react";
import { Modal, Card, Typography, TextField, Button, Box, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Snackbar, Alert } from "@mui/material";
import { user } from "../entities/UserManagement";
import { AddPenalty as AddPenaltyType, EPenaltyTypes } from "../entities/payments";
import useMakePenalties from "../hooks/useAddPenalties";

interface AddPenaltyProps {
  open: boolean;
  onClose: () => void;
  user: user;
}

const AddPenalty: React.FC<AddPenaltyProps> = ({ open, onClose, user }) => {
  const [penaltyType, setPenaltyType] = useState<EPenaltyTypes | "">("");
  const [description, setDescription] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  
  const { mutate: addPenalty, isPending } = useMakePenalties();
  
  const handleSavePenalty = () => {
    if (!penaltyType) return;
    
    const penaltyData: AddPenaltyType = {
      description: description,
      amount: parseFloat(amount),
      penaltyType: penaltyType
    };
    
    addPenalty(
      { 
        userId: user.userId, 
        body: penaltyData 
      },
      {
        onSuccess: () => {
          setSuccessMessage(true);
          resetForm();
          // Delay closing the modal to allow the user to see the success message
          setTimeout(() => {
            onClose();
          }, 1000);
        },
        onError: (error) => {
          console.error("Error adding penalty:", error);
          // You might want to add error handling here
        }
      }
    );
  };
  
  const resetForm = () => {
    setPenaltyType("");
    setDescription("");
    setAmount("");
  };
  
  const handleCancel = () => {
    resetForm();
    onClose();
  };
  
  const handlePenaltyTypeChange = (event: SelectChangeEvent<string>) => {
    setPenaltyType(event.target.value as EPenaltyTypes);
  };
  
  const handleCloseSuccessMessage = () => {
    setSuccessMessage(false);
  };
  
  return (
    <>
      <Modal
        open={open}
        onClose={handleCancel}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card sx={{ p: 4, minWidth: 400, maxWidth: 500 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Add Penalty
          </Typography>
          
          <TextField
            fullWidth
            label="User ID"
            variant="outlined"
            value={user.userId}
            disabled
            sx={{ mb: 3 }}
          />
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel>Penalty Type</InputLabel>
            <Select
              value={penaltyType}
              onChange={handlePenaltyTypeChange}
              label="Penalty Type"
            >
              <MenuItem value={EPenaltyTypes.PropertyDamage}>Property Damage</MenuItem>
              <MenuItem value={EPenaltyTypes.Overdue}>Overdue</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Amount"
            variant="outlined"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              startAdornment: <Typography variant="body1" sx={{ mr: 1 }}>₹</Typography>,
            }}
            sx={{ mb: 3 }}
          />
          
          <Box display="flex" justifyContent="space-between">
            <Button 
              variant="outlined" 
              onClick={handleCancel}
              sx={{ width: '48%' }}
            >
              Cancel
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleSavePenalty}
              sx={{ width: '48%' }}
              disabled={!penaltyType || !description || !amount || isPending}
            >
              {isPending ? "Adding..." : "Add Penalty"}
            </Button>
          </Box>
        </Card>
      </Modal>
      
      <Snackbar 
        open={successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          Penalty added successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddPenalty;