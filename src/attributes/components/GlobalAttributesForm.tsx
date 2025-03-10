import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, TextField, Divider, Alert } from '@mui/material';
import GlobalAttribute from '../entities/GlobalAttribute';
import useGlobalAttributes from '../hooks/useGlobalAttributes';
import useUpdateGlobalAttribute from '../hooks/useUpdateGlobalAttribute';
import GlobalAttributesTable from './GlobalAttributesTable';

const GlobalAttributesForm: React.FC = () => {
  const { data: globalAttributes } = useGlobalAttributes();
  const { mutate: updateGlobalAttribute } = useUpdateGlobalAttribute();
  const [penaltyPerDay, setPenaltyPerDay] = useState(globalAttributes?.penaltyPerDay || 0);
  const [issueValidityDays, setIssueValidityDays] = useState(globalAttributes?.issueValidityDays || 0);
  const [membershipValidationMonths, setMembershipValidationMonths] = useState(globalAttributes?.membershipValidationMonths || 0);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (globalAttributes) {
      setPenaltyPerDay(globalAttributes.penaltyPerDay);
      setIssueValidityDays(globalAttributes.issueValidityDays);
      setMembershipValidationMonths(globalAttributes.membershipValidationMonths);
    }
  }, [globalAttributes]);

  const handleSave = () => {
    const globalAttribute: GlobalAttribute = {
      globalAttributeId: globalAttributes?.globalAttributeId || "",
      penaltyPerDay,
      issueValidityDays,
      membershipValidationMonths,
      updatedAt: new Date()
    };
    updateGlobalAttribute(globalAttribute, {
      onSuccess: () => {
        setMessage('Global attributes successfully updated!');
        setTimeout(() => setMessage(null), 2000);
      },
      onError: () => {
        setMessage('An error occurred. Please try again.');
        setTimeout(() => setMessage(null), 2000);
      }
    });
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', mt: 1, gap: 2 }}>
      <Box sx={{ flex: 3 }}>
        <GlobalAttributesTable />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ flex: 1 }}>
        <Paper sx={{ p: 3, borderRadius: 2, boxShadow: 3 }}>
          <TextField
            label="Penalty Per Day"
            value={penaltyPerDay !== 0 ? penaltyPerDay : ''}
            onChange={(e) => setPenaltyPerDay(Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Issue Validity Days"
            value={issueValidityDays !== 0 ? issueValidityDays : ''}
            onChange={(e) => setIssueValidityDays(Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
          <TextField
            label="Membership Validation Months"
            value={membershipValidationMonths !== 0 ? membershipValidationMonths : ''}
            onChange={(e) => setMembershipValidationMonths(Number(e.target.value))}
            fullWidth
            margin="normal"
            type="number"
          />
          <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
            Save
          </Button>
          {message && (
            <Alert severity="success" sx={{ mt: 2 }}>
              {message}
            </Alert>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default GlobalAttributesForm;
