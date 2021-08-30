export interface Item {
    id?: string;
    title?: string;
    description?: string;
    date?: Date
  }


  export enum OrderBy {
    ASCENDING = 'ASCENDING',
    DESCENDING = 'DESCENDING',
    NEWEST = 'NEWEST',
    OLDEST ='OLDEST'
  }