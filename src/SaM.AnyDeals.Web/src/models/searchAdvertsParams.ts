export interface SearchAdvertsParams {
  title?: string;
  country?: string;
  city?: string;
  category?: string;
  goal?: number;
  interest?: number;
  page: number;
  pageSize: number;
}
