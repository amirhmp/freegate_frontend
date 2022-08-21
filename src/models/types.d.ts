interface Publish {
    year: number;
    edits: number[];
    version: number[];
  }
  interface Book {
    id: number;
    name: string;
    publishes: Array<Publish>;
  }
  
  interface Author {
    id: number;
    name: string;
    books: Array<Book>;
  }