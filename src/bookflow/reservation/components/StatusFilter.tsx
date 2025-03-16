import React from "react";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { EReservationStatus } from "../entities/BookReservation";

interface StatusFilterProps {
    value: EReservationStatus | undefined;
    onChange: (status: EReservationStatus | undefined) => void;
}

const StatusFilter: React.FC<StatusFilterProps> = ({ value, onChange }) => {
    return (
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
                value={value || EReservationStatus.Pending}
                onChange={(e) => onChange(e.target.value ? (e.target.value as EReservationStatus) : undefined)}
                label="Status"
            >
                <MenuItem value={EReservationStatus.Pending}>Pending</MenuItem>
                <MenuItem value={EReservationStatus.Cancelled}>Cancelled</MenuItem>
                <MenuItem value={EReservationStatus.Confirmed}>Confirmed</MenuItem>
                <MenuItem value={EReservationStatus.Resolved}>Resolved</MenuItem>
            </Select>
        </FormControl>
    );
};

export default StatusFilter;