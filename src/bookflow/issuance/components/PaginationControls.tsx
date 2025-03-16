import React from "react";
import { Pagination } from "@mui/material";

interface PaginationControlsProps {
    page: number;
    setPage: (page: number) => void;
    hasNextPage: boolean;
}

export const PaginationControls: React.FC<PaginationControlsProps> = ({ page, setPage, hasNextPage }) => {
    return (
        <Pagination
            count={hasNextPage ? page + 1 : page}
            page={page}
            onChange={(_, newPage) => setPage(newPage)}
            style={{ marginTop: "20px" }}
        />
    );
};