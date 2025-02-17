import React from "react";
import { TextField, Grid } from "@mui/material";

interface BookFormData {
  title: string;
  subTitle: string;
  editionStatement: string;
  seriesStatement: string;
  numberOfPages: string;
  publicationYear: string;
}

const BookInfoForm: React.FC<{
  formData: BookFormData;
  onChange: (newData: Partial<BookFormData>) => void;
}> = ({ formData, onChange }) => {
  const currentYear = new Date().getFullYear(); // Get the current year

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target;
    onChange({ [name]: type === "number" ? String(Number(value) || "") : value });
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
          value={formData.subTitle}
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
          value={formData.publicationYear || String(currentYear)} // Default to current year
          onChange={handleChange}
          variant="outlined"
          inputProps={{ min: "0", max: currentYear.toString(), step: "1" }}
        />
      </Grid>
    </Grid>
  );
};

export default BookInfoForm;
