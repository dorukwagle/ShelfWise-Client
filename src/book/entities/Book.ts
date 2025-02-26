import Author from "../../attributes/entities/Author";
import Genre from "../../attributes/entities/Genre";

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
  publisherId: string;
  bookAuthors: Author[];
  isbns: string[];
  bookGenres: Genre[];
  pricePerPiece: number;
  totalPieces: number;
  barcodes: string[];
  coverPhoto?: File;
}

export default Book;
