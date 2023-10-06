import { Calendar } from 'iconsax-react';
import theme from '@style/themes/default';
import * as S from './styles';

type TicketDescriptionProp = {
  author: string | undefined;
  title: string | undefined;
  location: string | undefined;
  calendar: string | undefined;
};
function TicketDescription({
  author,
  calendar,
  location,
  title,
}: TicketDescriptionProp) {
  return (
    <S.TicketDescription>
      <h3 className="author">{author}</h3>
      <h1 className="title-transaction">{title}</h1>
      <p className="location">{location}</p>
      <p className="date">
        <span className="icon">
          <Calendar size="20" color={theme.colors.solidBrightGreenNetrual} />
        </span>
        {calendar}
      </p>
    </S.TicketDescription>
  );
}

export default TicketDescription;
