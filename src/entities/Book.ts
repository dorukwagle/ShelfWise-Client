import Author from "./Author";
import Genre from "./Genre";
// import Publisher from "./Publisher";

interface Book {
  bookInfoId?: string;
  classNumber: string;
  bookNumber: string;
  title: string;
  subTitle?: string | null;
  editionStatement?: string | null;
  numberOfPages: number;
  publicationYear: number;
  seriesStatement?: string | null;
  publisherId: string; // You might alternatively use a Publisher object if needed
  bookAuthors: Author[]; // Array of authors
  isbns: string[];       // Array of ISBN numbers
  bookGenres: Genre[];   // Array of genres
  pricePerPiece: number;
  totalPieces: number;
  barcodes: string[];
  coverPhoto?: File;     // Array of barcode strings
}

export default Book;
