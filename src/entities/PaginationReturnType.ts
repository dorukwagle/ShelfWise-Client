export type PaginationReturnTypes<T = any> = {
    statusCode: number; // HTTP status code
    info: {
      hasNextPage: boolean; // Whether there are more pages to fetch
      itemsCount: number; // Total number of items available
    };
    data: T[]; // Array of fetched items (e.g., books)
  };