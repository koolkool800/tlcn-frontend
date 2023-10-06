import { SEAT_TRANSACTION_TYPE } from '@constants/codeConstants';
import { useTranslation } from 'react-i18next';
import * as S from './styles';

export type CardSeatProp = {
  // active: boolean;
  price: string;
  seatInfo: string;
  types: ('PIN_TRANSACTION' | 'SELLER_SHIPMENT')[];
};

function CardSeat({ seatInfo, price, types }: CardSeatProp) {
  const { t } = useTranslation();
  return (
    <S.CardSeat style={{ cursor: 'pointer' }}>
      <div className="price">{price}</div>
      <div className="position">{seatInfo}</div>
      <div className="transaction-type-wrap">
        {types?.map((type) => (
          <S.TransactionType key={type} type={type}>
            {t(`buyTicket.${SEAT_TRANSACTION_TYPE[type]}`)}
          </S.TransactionType>
        ))}
      </div>
    </S.CardSeat>
  );
}

export default CardSeat;
