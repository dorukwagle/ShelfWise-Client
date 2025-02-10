import { useState } from "react";
import { Box, TextField, Button, Paper, Typography, List, ListItem } from "@mui/material";
import useAuthor from "../hooks/useAuthor";

export default function AuthorForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({ title: "", fullName: "" });
  const [authors, setAuthors] = useState<string[]>([]); // Store only full names

  const addAuthor = useAuthor(onClose); // Call the mutation with onSuccess to close modal

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddAuthor = () => {
    setAuthors([...authors, formData.fullName]);
    setFormData({ ...formData, fullName: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    authors.forEach(fullName => addAuthor.mutate({ title: formData.title, fullName }));
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Add Authors</Typography>
      <Paper elevation={3} sx={{ width: 400, p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            required
            sx={{ mb: 1 }}
          />
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            fullWidth
            required
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={handleAddAuthor} fullWidth>
              Add Author
            </Button>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" fullWidth disabled={addAuthor.isPending}>
              {addAuthor.isPending ? "Saving..." : "Save All"}
            </Button>
            <Button variant="outlined" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
      {authors.length > 0 && (
        <Paper elevation={3} sx={{ width: 400, mt: 2, p: 2 }}>
          <Typography variant="h6">Added Authors:</Typography>
          <List>
            {authors.map((fullName, index) => (
              <ListItem key={index}>{fullName}</ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}

