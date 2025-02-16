import React, { useState, useEffect } from "react";
import { Grid, Button, Card, CardMedia } from "@mui/material";

const CoverImageForm: React.FC<{
  formData: { coverPhoto: File | null };
  onChange: (data: Partial<{ coverPhoto: File | null }>) => void;
}> = ({ formData, onChange }) => {
  const [preview, setPreview] = useState<string | null>(null);

  // Generate preview when formData.coverPhoto changes
  useEffect(() => {
    if (formData.coverPhoto) {
      console.log(formData)

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(formData.coverPhoto);
    } else {
      setPreview(null); // Reset preview if no image is selected
    }
  }, [formData.coverPhoto]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange({ coverPhoto: file });
      console.log('asdasdasdasd')
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        {preview && (
          <Card
            style={{
              maxWidth: 300,
              margin: "auto",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardMedia component="img" image={preview} alt="Cover Preview" />
          </Card>
        )}
      </Grid>
      <Grid item xs={12} style={{ textAlign: "center" }}>
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
