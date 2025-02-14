
import React, { useState } from "react";
import { Box, Step, StepLabel, Stepper, Button, Container, Typography, Paper } from "@mui/material";
import { Book, Category, Settings, Image } from "@mui/icons-material";
import BookInfoForm from "../components/BookInfoForm";
import CategorizationForm from "../components/categorizationForm";
import BarcodeForm from "../components/BarcodeForm";
import CoverImageForm from "../components/CoverImageForm";

const steps = [
  { label: "Book Info", icon: <Book /> },
  { label: "Categorization", icon: <Category /> },
  { label: "Barcode & Status", icon: <Settings /> },
  { label: "Cover Image", icon: <Image /> },
];

const MultiPageForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    editionStatement: "",
    seriesStatement: "",
    numberOfPages: "",
    publicationYear: "",
    addedDate: "",
    isbn: "",
    classNumber: "",
    bookNumber: "",
    genre: [],
    publisher: "",
    author: [],
    barcode: "",
    status: "",
    coverPhoto: null,
  });

  // Function to update form data
  const handleFormChange = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      console.log("Form Submitted:", formData);
      setSubmitted(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      {!submitted ? (
        <>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepLabel
                  icon={React.cloneElement(step.icon, {
                    color: activeStep === index ? "primary" : "inherit",
                  })}
                  sx={{
                    color: activeStep === index ? "primary.main" : "inherit",
                    fontWeight: activeStep === index ? "bold" : "normal",
                  }}
                >
                  {step.label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box my={4}>
            {activeStep === 0 && <BookInfoForm formData={formData} onChange={handleFormChange} />}
            {activeStep === 1 && <CategorizationForm formData={formData} onChange={handleFormChange} />}
            {activeStep === 2 && <BarcodeForm formData={formData} onChange={handleFormChange} />}
            {activeStep === 3 && <CoverImageForm formData={formData} onChange={handleFormChange} />}
          </Box>

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </>
      ) : (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Form Submitted Successfully!
          </Typography>
          <Typography variant="body1">
            Below is the information you entered:
          </Typography>
          <Box mt={2}>
            {Object.entries(formData).map(([key, value]) => (
              <Typography key={key} variant="body2">
                <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value?.toString()}
              </Typography>
            ))}
          </Box>
        </Paper>
      )}
    </Container>
  );
};

export default MultiPageForm;
