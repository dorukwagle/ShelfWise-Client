import { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import usePublisher from "../hooks/usePublisher";

export default function PublisherForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    publisherName: "",
    address: "",
  });

  const addPublisher = usePublisher(onClose); // Call the mutation with onSuccess to close modal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPublisher.mutate(formData);
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Add Publisher</Typography>
      <Paper elevation={3} sx={{ width: 400, p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Publisher Name"
            name="publisherName"
            value={formData.publisherName}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" fullWidth disabled={addPublisher.isPending}>
              {addPublisher.isPending ? "Saving..." : "Save"}
            </Button>
            <Button variant="outlined" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
