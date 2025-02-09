export type Genre = { 
    id: number; 
    name: string; 
  };
  
  export type Author = { 
    id: number; 
    name: string; 
  };
  
  export type Publisher = { 
    id: number; 
    name: string; 
  };
  
  export type Book = {
    title: string;
    isbns: string[];
    barcodes: string[];
    genres: Genre[];
    authors: Author[];
    publishers: Publisher[];
  };
  