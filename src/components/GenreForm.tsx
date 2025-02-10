import { useState } from "react";
import { Box, TextField, Button, Paper, Typography } from "@mui/material";
import useGenre from "../hooks/useGenre";
import DeleteIcon from "@mui/icons-material/Delete";

export default function GenreForm({ onClose, genre, onDelete }: { onClose: () => void; genre?: any; onDelete?: (id: string) => void }) {
  const [formData, setFormData] = useState({
    genreName: genre ? genre.genreName : "",
    genreId: genre ? genre.genreId : undefined,
  });

  const addOrUpdateGenre = useGenre(onClose);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addOrUpdateGenre.mutate(formData);
  };

  return (
    <Box sx={{ mt: 2, display: "flex", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="h6" sx={{ mb: 2 }}>{genre ? "Edit Genre" : "Add Genre"}</Typography>
      <Paper elevation={3} sx={{ width: 400, p: 4 }}>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField
            label="Genre Name"
            name="genreName"
            value={formData.genreName}
            onChange={handleChange}
            fullWidth
            required
          />
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button type="submit" variant="contained" fullWidth disabled={addOrUpdateGenre.isPending}>
              {addOrUpdateGenre.isPending ? "Saving..." : genre ? "Update" : "Save"}
            </Button>
            {genre && onDelete && (
              <Button variant="outlined" color="error" fullWidth onClick={() => onDelete(genre.genreId)}>
                <DeleteIcon /> Delete
              </Button>
            )}
            <Button variant="outlined" fullWidth onClick={onClose}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

