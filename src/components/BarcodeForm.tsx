
import React from "react";
import { TextField, Grid, MenuItem, Select, InputLabel, FormControl } from "@mui/material";

const statuses = ["Available", "Checked Out", "Damaged", "Lost"];

interface BarcodeFormProps {
  formData: {
    barcode: string;
    status: string;
    damagedOn: string;
  };
  onChange: (newData: Partial<typeof formData>) => void;
}

const BarcodeForm: React.FC<BarcodeFormProps> = ({ formData, onChange }) => {
  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    onChange({ [name as string]: value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Barcode"
          name="barcode"
          value={formData.barcode}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            {statuses.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Damaged On"
          name="damagedOn"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.damagedOn}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default BarcodeForm;
