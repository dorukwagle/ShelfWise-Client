import React, { useMemo, useState } from 'react';
import { Box, Paper, Typography, Skeleton } from '@mui/material';
import { RES_URL } from '../../entities/constants';
import { BookInfo } from '../entities/BookType';

interface BookCoverProps {
  bookInfo: BookInfo;
  isLoading?: boolean;
}

export const BookCover: React.FC<BookCoverProps> = ({ bookInfo, isLoading = false }) => {
  const [imageError, setImageError] = useState(false);
  
  // Use useMemo to compute the image URL only when coverPhoto changes
  const imageUrl = useMemo(() => {
    if (!bookInfo.coverPhoto) return null;
    return `${RES_URL}${bookInfo.coverPhoto}`;
  }, [bookInfo.coverPhoto]);

  if (isLoading) {
    return (
      <Paper elevation={3} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Skeleton 
          variant="rectangular" 
          width="100%" 
          height={300}
          animation="wave"
        />
      </Paper>
    );
  }

  return (
    <Paper elevation={3} sx={{ height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {imageUrl && !imageError ? (
        <Box
          component="img"
          src={imageUrl}
          alt={`Cover of ${bookInfo.title}`}
          onError={() => {
            console.error('Failed to load image:', imageUrl);
            setImageError(true);
          }}
          sx={{
            width: '100%',
            height: '100%',
            maxHeight: 300,
            objectFit: 'contain',
            p: 1
          }}
          loading="lazy"
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
          <Typography variant="h5" align="center" sx={{ fontSize: '1.2rem', mb: 1 }}>
            {bookInfo.title}
          </Typography>
          <Typography variant="body2" align="center">
            {imageError ? 'Failed to load cover' : 'No cover available'}
          </Typography>
        </Box>
      )}
    </Paper>
  );
};
