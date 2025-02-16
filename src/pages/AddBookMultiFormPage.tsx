import React, { useState } from "react";
import {
  Box,
  Step,
  StepLabel,
  Stepper,
  Button,
  Container,
  Typography,
  Paper,
  CircularProgress,
} from "@mui/material";
import { Book, Category, Settings, Image, EventRepeat } from "@mui/icons-material";
import BookInfoForm from "../components/BookInfoForm";
import CategorizationForm

from "../components/categorizationForm";
import BarcodeForm from "../components/BarcodeForm";
import CoverImageForm from "../components/CoverImageForm";
import useAddBook from "../hooks/useAddBooks";

const steps = [
  { label: "Book Info", icon: <Book /> },
  { label: "Cataloging", icon: <Category /> },
  { label: "Stock & Pricing", icon: <Settings /> },
  { label: "Cover Image", icon: <Image /> },
];

const MultiPageForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    editionStatement: "",
    seriesStatement: "",
    numberOfPages: "",
    publicationYear: "",
    isbn: [],
    barcodes: [],
    classNumber: "",
    bookNumber: "",
    genre: [],
    publisher: "",
    author: [],
    totalPieces: "",
    pricePerPiece: "",
    coverPhoto: null,
  });

  const { mutate: addBook, isLoading, isError, error, isSuccess } = useAddBook(() => {
    setSubmitted(true);
  });

  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (newData: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    const formData = {
      title: 'Sample Book Title',
      subtitle: 'A Comprehensive Guide to React',
      classNumber: 'QA123',
      bookNumber: 'BN456',
      editionStatement: 'Second Edition',
      seriesStatement: 'React Series',
      publicationYear: '2025',
      numberOfPages: '350',
      pricePerPiece: '25.99',
      totalPieces: '100',
      publisherId: 'PUB123',
      coverPhoto: new File([new Blob([''], { type: 'image/jpeg' })], "C:\Users\Acer\Downloads\bottle.jpeg", { type: 'image/jpeg' }),
    };
    
    // Create a FormData object
    const formDataToSubmit = new FormData();
    
    // Append data to the FormData object
    formDataToSubmit.append('title', formData.title);
    formDataToSubmit.append('subtitle', formData.subtitle);
    formDataToSubmit.append('classNumber', formData.classNumber);
    formDataToSubmit.append('bookNumber', formData.bookNumber);
    formDataToSubmit.append('editionStatement', formData.editionStatement);
    formDataToSubmit.append('seriesStatement', formData.seriesStatement);
    formDataToSubmit.append('publicationYear', formData.publicationYear);
    formDataToSubmit.append('numberOfPages', formData.numberOfPages);
    formDataToSubmit.append('pricePerPiece', formData.pricePerPiece);
    formDataToSubmit.append('totalPieces', formData.totalPieces);
    formDataToSubmit.append('publisherId', formData.publisherId);
    
    // Append the file (coverPhoto) to FormData
    // if (formData.coverPhoto) {
      formDataToSubmit.append('coverPhoto', formData.coverPhoto);
    // }
    
    // You can now use formDataToSubmit for further operations like submitting the form
    console.log(formDataToSubmit);
    
    addBook(formDataToSubmit);
    console.log(formDataToSubmit)
    console.log('kk')
  };

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

          {isError && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error?.message || "Something went wrong!"}
            </Typography>
          )}

          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button disabled={activeStep === 0 || isLoading} onClick={handleBack}>
              Back
            </Button>
            <Button variant="contained" color="primary" onClick={handleNext} disabled={isLoading}>
              {isLoading ? <CircularProgress size={24} /> : activeStep === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </Box>
        </>
      ) : (
        <Paper sx={{ p: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            {isSuccess ? "Form Submitted Successfully!" : "Submission Failed"}
          </Typography>
          {isSuccess ? (
            <>
              <Typography variant="body1">Below is the information you entered:</Typography>
              <Box mt={2}>
                {Object.entries(formData).map(([key, value]) => (
                  <Typography key={key} variant="body2">
                    <strong>{key}:</strong> {Array.isArray(value) ? value.join(", ") : value?.toString()}
                  </Typography>
                ))}
              </Box>
            </>
          ) : (
            <Typography color="error">Something went wrong. Please try again.</Typography>
          )}
        </Paper>
      )}
    </Container>
  );
};

export default MultiPageForm;
