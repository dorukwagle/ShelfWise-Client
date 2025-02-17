import React, { useState, useEffect } from "react";
import { Grid, Button, Card, CardMedia } from "@mui/material";

interface CoverImageFormProps {
  formData: { coverPhoto: File | null };
  onChange: (data: Partial<{ coverPhoto: File | null }>) => void;
}

const CoverImageForm: React.FC<CoverImageFormProps> = ({ formData, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Generate a preview when coverPhoto changes
  useEffect(() => {
    if (formData.coverPhoto) {
      console.log("Generating preview for:", formData.coverPhoto);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(formData.coverPhoto);
    } else {
      setPreview(null);
    }
  }, [formData.coverPhoto]);

  // Handle file selection and update parent state
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file);
      onChange({ coverPhoto: file });
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        {preview && (
          <Card
            sx={{
              maxWidth: 300,
              margin: "auto",
              borderRadius: 2,
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardMedia component="img" image={preview} alt="Cover Preview" />
          </Card>
        )}
      </Grid>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="upload-button"
        />
        <label htmlFor="upload-button">
          <Button variant="contained" component="span">
            Choose File
          </Button>
        </label>
      </Grid>
    </Grid>
  );
};

export default CoverImageForm;
