const colors = [
  '#FFB900',
  '#D83B01',
  '#B50E0E',
  '#E81123',
  '#B4009E',
  '#5C2D91',
  '#0078D7',
  '#00B4FF',
  '#008272',
  '#107C10',
];

export const avatarGenerator = (name: string): string => {
  const index = (name?.charCodeAt(0) || 0) % colors.length;
  return colors[index];
};
