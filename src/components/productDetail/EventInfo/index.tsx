import { H5, Typography } from '@style/DefaultStyled';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import * as S from './style';

type EventInfoType = {
  title: string | undefined;
  performer: string | undefined;
  place: string | undefined;
  performanceDate: string | undefined;
  originalPrice: string | number | undefined;
};
function EventInfo({
  title,
  performer,
  place,
  performanceDate,
  originalPrice,
}: EventInfoType) {
  return (
    <S.Wrapper>
      <div className="container-title">
        <H5>About Event</H5>
      </div>
      <div className="list-info">
        <Typography className="bold">{title}</Typography>
        <Typography>{performer}</Typography>
        <Typography>{place}</Typography>
        <Typography>Use date: {performanceDate}</Typography>
        <Typography>
          Original price:{' '}
          <span style={{ fontWeight: 700 }}>
            {formatNumberWithCommas(originalPrice)} 원
          </span>{' '}
        </Typography>
      </div>
    </S.Wrapper>
  );
}

export default EventInfo;
