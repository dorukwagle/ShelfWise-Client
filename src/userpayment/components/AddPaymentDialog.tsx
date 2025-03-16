import React, { useState } from "react";
import { 
  Typography, 
  TextField, 
  Button, 
  CircularProgress, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  Card, 
  Modal,
  Snackbar,
  Alert 
} from '@mui/material';
import { user } from "../entities/UserManagement";
import useMakePayment from "../hooks/useAddPayment";
import { EPaymentTypes } from "../entities/payments";

interface MakePaymentDialogProps {
  open: boolean;
  onClose: () => void;
  user: user | null;
}

interface MakePaymentData {
  paymentType: EPaymentTypes;
  amountPaid: number;
}

const MakePaymentDialog: React.FC<MakePaymentDialogProps> = ({ open, onClose, user }) => {
  const [paymentType, setPaymentType] = useState<EPaymentTypes | "">("");
  const [amountPaid, setAmountPaid] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const { mutate: makePayment, isPending } = useMakePayment();

  const handlePaymentTypeChange = (event: SelectChangeEvent<string>) => {
    setPaymentType(event.target.value as EPaymentTypes);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmountPaid(event.target.value);
  };

  const handleSubmit = () => {
    if (!user || !amountPaid || paymentType === "") return;

    const makePaymentData: MakePaymentData = {
      amountPaid: parseFloat(amountPaid),
      paymentType: paymentType
    };
    
    makePayment({
      userId: user.userId,
      body: makePaymentData
    }, {
      onSuccess: () => {
        setSuccessMessage(true);
        resetForm();
        // Delay closing the modal to allow the user to see the success message
        setTimeout(() => {
          onClose();
        }, 1000);
      },
      onError: (error) => {
        console.error("Error making payment:", error);
        // You might want to add error handling here
      }
    });
  };

  const resetForm = () => {
    setPaymentType("");
    setAmountPaid("");
  };

  const handleCancel = () => {
    resetForm();
    onClose();
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
        <Card sx={{ p: 4, minWidth: 300, maxWidth: 400 }}>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Make Payment
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="User ID"
              value={user?.userId || ""}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              disabled
            />
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="User Name"
              value={user?.fullName || ""}
              InputProps={{
                readOnly: true,
              }}
              variant="outlined"
              fullWidth
              disabled
            />
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Payment Type</InputLabel>
            <Select
              value={paymentType}
              onChange={handlePaymentTypeChange}
              label="Payment Type"
            >
              <MenuItem value={EPaymentTypes.Membership}>Membership</MenuItem>
              <MenuItem value={EPaymentTypes.Penalty}>Penalty</MenuItem>
            </Select>
          </FormControl>
          
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Amount"
              type="number"
              value={amountPaid}
              onChange={handleAmountChange}
              variant="outlined"
              fullWidth
              InputProps={{
                startAdornment: <Typography variant="body1" sx={{ mr: 1 }}>₹</Typography>,
              }}
            />
          </FormControl>
          
          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            disabled={!paymentType || !amountPaid || isPending}
            sx={{ mb: 2 }}
          >
            {isPending ? <CircularProgress size={24} /> : "Submit Payment"}
          </Button>
          
          <Button fullWidth variant="outlined" onClick={handleCancel}>
            Cancel
          </Button>
        </Card>
      </Modal>
      
      <Snackbar 
        open={successMessage} 
        autoHideDuration={6000} 
        onClose={handleCloseSuccessMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSuccessMessage} severity="success" sx={{ width: '100%' }}>
          Payment completed successfully!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MakePaymentDialog;