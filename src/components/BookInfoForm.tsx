
import React from "react";
import { TextField, Grid } from "@mui/material";

// Define props using type instead of interface
const BookInfoForm: React.FC<{
  formData: {
    title: string;
    subtitle: string;
    editionStatement: string;
    seriesStatement: string;
    numberOfPages: string;
    publicationYear: string;
    addedDate: string;
    isbn: string;
  };
  onChange: (newData: Partial<typeof formData>) => void;
}> = ({ formData, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ [event.target.name]: event.target.value });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Subtitle"
          name="subtitle"
          value={formData.subtitle}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Edition Statement"
          name="editionStatement"
          value={formData.editionStatement}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Series Statement"
          name="seriesStatement"
          value={formData.seriesStatement}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Number of Pages"
          name="numberOfPages"
          type="number"
          value={formData.numberOfPages}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Publication Year"
          name="publicationYear"
          type="number"
          value={formData.publicationYear}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="Added Date"
          name="addedDate"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={formData.addedDate}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          fullWidth
          label="ISBN"
          name="isbn"
          value={formData.isbn}
          onChange={handleChange}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default BookInfoForm;
