import React from "react";
import { Grid, TextField, Box } from "@mui/material";
import TagsInput from "./TagInputs";  // Assuming the TagsInput component is in the same directory

interface BarcodeFormProps {
  formData: {
    barcodes: string[];
    isbn: string[];
    totalPieces: string;
    pricePerPiece: string;
  };
  onChange: (newData: Partial<typeof formData>) => void;
}

const BarcodeForm: React.FC<BarcodeFormProps> = ({ formData, onChange }) => {
  const handleTagsChange = (tags: string[], field: string) => {
    onChange({ [field]: tags });
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Barcodes Input Field */}
        <TagsInput
          placeholder="Enter Barcodes"
          value={formData.barcodes}
          onChange={(tags) => handleTagsChange(tags, "barcodes")}
        />
      </Grid>
      <Grid item xs={12}>
        {/* ISBNs Input Field */}
        <TagsInput
          placeholder="Enter ISBNs"
          value={formData.isbn}
          onChange={(tags) => handleTagsChange(tags, "isbn")}
        />
      </Grid>
      <Grid item xs={12}>
        {/* Total Pieces Input Field */}
        <TextField
          fullWidth
          label="Total Pieces"
          name="totalPieces"
          type="number"
          value={formData.totalPieces}
          onChange={(e) => onChange({ totalPieces: e.target.value })}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={12}>
        {/* Price Per Piece Input Field */}
        <TextField
          fullWidth
          label="Price per Piece"
          name="pricePerPiece"
          type="number"
          value={formData.pricePerPiece}
          onChange={(e) => onChange({ pricePerPiece: e.target.value })}
          variant="outlined"
        />
      </Grid>
    </Grid>
  );
};

export default BarcodeForm;
