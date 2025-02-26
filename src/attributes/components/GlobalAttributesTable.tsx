import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Typography, Box } from '@mui/material';
import useGlobalAttributes from '../hooks/useGlobalAttributes';

const GlobalAttributesTable: React.FC = () => {
  const { data: globalAttributes, isLoading, error } = useGlobalAttributes();

  if (isLoading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error loading data: {error.message}</Typography>;

  return (
    <Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Penalty Per Day</TableCell>
            <TableCell>Issue Validity Days</TableCell>
            <TableCell>Membership Validation Months</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {globalAttributes ? (
            <TableRow>
              <TableCell>{globalAttributes.penaltyPerDay}</TableCell>
              <TableCell>{globalAttributes.issueValidityDays}</TableCell>
              <TableCell>{globalAttributes.membershipValidationMonths}</TableCell>
              <TableCell>{new Date(globalAttributes.updatedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ) : (
            <TableRow>
              <TableCell colSpan={4} align="center">
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
