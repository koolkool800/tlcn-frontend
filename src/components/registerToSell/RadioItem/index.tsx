import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const SeatTransactionType: any = {
  pinTransaction: 'onsiteTicket.pinTransaction',
  sellerShipment: 'onsiteTicket.sellerShipment',
  onsiteTransaction: 'onsiteTicket.onsiteTransaction',
};
function RadioItem({ type, content }: { type: any; content: React.ReactNode }) {
  const { t } = useTranslation();

  return (
    <S.Wrapper type={type}>
      <span className={`transaction-type ${type}`}>
        {t(SeatTransactionType[type])}
      </span>
      {content}
    </S.Wrapper>
  );
}

export default RadioItem;
