export interface Trade {
  date: string;
  pair: string;
  [key: string]: any;
}

export interface Column {
  id: string;
  name: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: string[];
}