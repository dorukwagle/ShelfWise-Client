import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, CircularProgress, Alert } from '@mui/material';
import useGlobalAttributes from '../hooks/useGlobalAttributes';

const GlobalAttributesTable: React.FC = () => {
  const { data: globalAttributes, isLoading, error } = useGlobalAttributes();

  if (isLoading) return <CircularProgress />;
  if (error) return <Alert severity="error">Error loading data: {error.message}</Alert>;

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Penalty Per Day</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Issue Validity Days</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Membership Validation Months</TableCell>
            <TableCell sx={{ backgroundColor: 'primary.main', color: 'primary.contrastText', fontWeight: 'bold' }}>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {globalAttributes ? (
            <TableRow>
              <TableCell sx={{ padding: '16px' }}>{globalAttributes.penaltyPerDay}</TableCell>
              <TableCell sx={{ padding: '16px' }}>{globalAttributes.issueValidityDays}</TableCell>
              <TableCell sx={{ padding: '16px' }}>{globalAttributes.membershipValidationMonths}</TableCell>
              <TableCell sx={{ padding: '16px' }}>{new Date(globalAttributes.updatedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center" sx={{ padding: '16px', backgroundColor: 'secondary.light' }}>
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Box>
  );
};

export default GlobalAttributesTable;
