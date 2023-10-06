export type BaseFilterType = {
  sortBy: string;
  limit: number;
  offset: number;
};

export type BaseModelType = {
  id: number;
  createdAt: string;
  updatedAt: string;
};

export type FilterType = {
  [key: string]: string | number | boolean | number[] | string[] | undefined;
};

export type ObjectLiteral = {
  [key: string]: any;
};
