import { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Autocomplete } from "@mui/material";
import { useBookList } from "../hooks/useBookList";
import { BookInfo, FilterState } from "../entities/BookType";
import useAddExistingBook from "../hooks/useAddExistingBook"; // Import the hook
import { BookAddition } from "../entities/BookAddition";
import TagsInput from "../../components/TagInputs";

interface AddExistingBookProps {
  open: boolean;
  onClose: () => void;
}

const AddExistingBook: React.FC<AddExistingBookProps> = ({ open, onClose }) => {
  const [filters, setFilters] = useState<FilterState>({ pageSize: 50 });
  const { books } = useBookList(filters);
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [pricePerPiece, setPricePerPiece] = useState("");
  const [totalPieces, setTotalPieces] = useState("");
  const [barcodes, setBarcodes] = useState<string[]>([]);
  const { mutate: addExistingBook, isPending } = useAddExistingBook(() => {
    onClose();
  });

  const handleTagsChange = (newTags: string[]) => {
    setBarcodes(newTags);
  };

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      seed: searchTerm.trim() ? searchTerm : undefined,
    }));
  }, [searchTerm]);

  const handleSubmit = async () => {
    if (!selectedBook) {
      console.error("No book selected");
      return;
    }

    const bookData: BookAddition = {
      bookInfoId: selectedBook.bookInfoId,
      totalPieces: Number(totalPieces),
      pricePerPiece: Number(pricePerPiece),
      barcodes,
    };
    addExistingBook(bookData);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Add Existing Book</DialogTitle>
      <DialogContent>
        <Autocomplete
          options={books}
          getOptionLabel={(option) => option.title}
          value={selectedBook}
          onChange={(_, newValue) => setSelectedBook(newValue)}
          inputValue={searchTerm}
          onInputChange={(_, newInputValue) => setSearchTerm(newInputValue)}
          renderInput={(params) => <TextField {...params} label="Search & Select Book" fullWidth margin="dense" />}
        />
        <TextField
          label="Price Per Piece"
          type="number"
          fullWidth
          value={pricePerPiece}
          onChange={(e) => setPricePerPiece(e.target.value)}
          margin="dense"
        />
        <TextField
          label="Total Pieces"
          type="number"
          fullWidth
          value={totalPieces}
          onChange={(e) => setTotalPieces(e.target.value)}
          margin="dense"
        />
        <TagsInput
          placeholder="Enter barcodes..."
          value={barcodes}
          onChange={handleTagsChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={isPending}
        >
          {isPending ? "Submitting..." : "Submit"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExistingBook;


