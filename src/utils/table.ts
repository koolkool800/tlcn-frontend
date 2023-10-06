export const getOffset = (nextPage: number, pageSize: number) => {
  return (nextPage - 1) * pageSize;
};

export const getPage = (offset: number, pageSize: number) => {
  return Math.ceil((offset + 1) / pageSize);
};
