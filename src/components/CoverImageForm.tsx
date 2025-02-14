
import React from "react";
import { Grid, Button, Card, CardMedia } from "@mui/material";

interface CoverImageFormProps {
  formData: {
    coverPhoto: string | null;
  };
  onChange: (newData: Partial<typeof formData>) => void;
}

const CoverImageForm: React.FC<CoverImageFormProps> = ({ formData, onChange }) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ coverPhoto: reader.result as string }); // Update parent state with the image data
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="center">
      <Grid item xs={12}>
        {formData.coverPhoto && (
          <Card
            style={{
              maxWidth: 300,
              margin: "auto",
              borderRadius: 10,
              overflow: "hidden",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardMedia component="img" image={formData.coverPhoto} alt="Cover Preview" />
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
