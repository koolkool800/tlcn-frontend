export const formatSeatPosition = ({
  group,
  section,
  floor,
  row,
  seats,
}: {
  group: string | undefined;
  section: string | undefined;
  floor: string | undefined;
  row: string | undefined;
  seats: string[] | any;
}) => {
  const groupTxt = group ? `${group} | ` : '';
  const sectionTxt = section ? `${section} | ` : '';
  const floorTxt = floor ? `${floor} | ` : '';
  const rowTxt = row ? `${row} | ` : '';
  const seatsTxt = seats ? `${seats.join(', ')}` : '';

  return `${groupTxt}${sectionTxt}${floorTxt}${rowTxt}${seatsTxt}`;
};
