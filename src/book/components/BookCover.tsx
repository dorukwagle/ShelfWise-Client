import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { RES_URL } from '../../entities/constants';
import { BookInfo } from '../entities/BookType';

interface BookCoverProps {
  bookInfo: BookInfo;
}

export const BookCover: React.FC<BookCoverProps> = ({ bookInfo }) => {
  const imageUrl = bookInfo.coverPhoto 
    ? `${RES_URL}${bookInfo.coverPhoto}`
    : null;

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={`Cover of ${bookInfo.title}`}
          sx={{
            width: '100%',
            height: 'auto',
            maxHeight: 400,
            objectFit: 'contain'
          }}
        />
      ) : (
        <Box 
          sx={{ 
            width: '100%', 
            height: 300, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.200',
            color: 'grey.500',
            flexDirection: 'column',
            p: 2
          }}
        >
          <Typography variant="h5" align="center">
            {bookInfo.title}
          </Typography>
          <Typography variant="body2" align="center" mt={1}>
            No cover available
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
