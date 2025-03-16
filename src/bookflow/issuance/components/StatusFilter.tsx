import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

interface StatusFilterProps {
  status: string | undefined;
  setStatus: (status: string | undefined) => void;
}

export const StatusFilter: React.FC<StatusFilterProps> = ({ status, setStatus }) => {
  return (
    <FormControl fullWidth style={{ marginBottom: "20px" }}>
      <InputLabel>Status</InputLabel>
      <Select
        value={status || ""}
        onChange={(e) => setStatus(e.target.value || undefined)}
        label="Status"
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Returned">Returned</MenuItem>
      </Select>
    </FormControl>
  );
};