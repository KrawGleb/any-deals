export interface StoredFile {
  id: number;
  name: string;
  type: string;
  url?: string;
  deleted?: boolean;
  new?: boolean;
}
