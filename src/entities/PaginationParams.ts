interface PaginationParams {
    page: number;
    pageSize: number;
    seed?: string;
    accountStatus?: string;
    expired?: boolean;
}

export default PaginationParams;
