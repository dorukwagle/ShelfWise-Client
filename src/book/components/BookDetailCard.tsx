import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  Box,
  Divider,
  Rating,
  styled
} from '@mui/material';
import { Person, Category } from '@mui/icons-material';
import { BookInfo } from '../entities/BookType';

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

interface BookDetailsCardProps {
  bookInfo: BookInfo;
}

export const BookDetailsCard: React.FC<BookDetailsCardProps> = ({ bookInfo }) => {
  // Calculate average rating
  const averageRating = Array.isArray(bookInfo.score) && bookInfo.score.length
    ? bookInfo.score.reduce((acc, curr) => acc + curr.score, 0) / bookInfo.score.length
    : 0;

  return (
    <Card>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              {bookInfo.title}
            </Typography>
            {bookInfo.subTitle && (
              <Typography variant="h6" color="textSecondary" gutterBottom>
                {bookInfo.subTitle}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={1}>
              <Person sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" mr={1}>
                Authors:
              </Typography>
              {bookInfo.bookAuthors?.map((bookAuthor) => (
                <StyledChip
                  key={bookAuthor.authorId}
                  label={`${bookAuthor.author.title} ${bookAuthor.author.fullName}`}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" alignItems="center" mb={1}>
              <Category sx={{ mr: 1 }} />
              <Typography variant="body1" component="span" mr={1}>
                Genres:
              </Typography>
              {bookInfo.bookGenres?.map((bookGenre) => (
                <StyledChip
                  key={bookGenre.genreId}
                  label={bookGenre.genre.genre}
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Publisher:</strong> {bookInfo.publisher.publisherName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Edition:</strong> {bookInfo.editionStatement || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Series:</strong> {bookInfo.seriesStatement || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Year:</strong> {bookInfo.publicationYear}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Pages:</strong> {bookInfo.numberOfPages}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Typography variant="body1" gutterBottom>
              <strong>Class Number:</strong> {bookInfo.classNumber}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Book Number:</strong> {bookInfo.bookNumber}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>ISBN:</strong> {bookInfo.isbns?.map(isbn => isbn.isbn).join(", ") || "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Available Copies:</strong> {bookInfo.books.filter(book => book.status === "Available").length} of {bookInfo.books.length}
            </Typography>
            <Box display="flex" alignItems="center">
              <Typography variant="body1" component="legend" mr={1}>
                <strong>Rating:</strong>
              </Typography>
              <Rating value={averageRating} precision={0.5} readOnly />
              <Typography variant="body2" color="textSecondary" ml={1}>
                ({averageRating.toFixed(1)})
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};