interface Info {
    hasNextPage: boolean;
    itemsCount: number;
}

interface PaginationResponse<T> {
    data: T[];
    info: Info;
}

export default PaginationResponse;


