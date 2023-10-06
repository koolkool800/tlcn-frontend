import { H4 } from '@style/DefaultStyled';
import { currencyFormat } from '@utils/currency';
import { dateTimeFormatString } from '@utils/format';
import { VoucherItemType } from 'interface/user';
import { useTranslation } from 'react-i18next';
import * as S from './style';

type Props = {
  voucher: VoucherItemType;
};

function VoucherDiscountV2({ voucher }: Props) {
  const { t } = useTranslation();
  const { type, discount, description, expiredDate, name, maxDiscount } =
    voucher;

  return type === 'MONEY' ? (
    <S.Wrapper>
      <span className="layer" />
      <div className="container-date">
        <span>
          {t('user.voucherUseDay')}:{' '}
          {dateTimeFormatString(expiredDate, 'YYYY.MM-DD')}
        </span>
      </div>
      <div className="container-body">
        <H4>{currencyFormat(Number(discount))}</H4>
        <span>{name}</span>
      </div>
      <div className="container-footer">{description}</div>
    </S.Wrapper>
  ) : (
    <S.Wrapper>
      <span className="layer" />
      <div className="container-date">
        <span>
          {t('user.voucherUseDay')}:{' '}
          {dateTimeFormatString(expiredDate, 'YYYY.MM-DD')}
        </span>
      </div>
      <div className="container-body">
        <H4>
          {discount}
          <span>%</span>
        </H4>
        <span>{name}</span>
      </div>
      <div className="container-footer">
        {t('user.voucherDesc', {
          percent: discount,
          maxDiscount,
        })}
      </div>
    </S.Wrapper>
  );
}

export default VoucherDiscountV2;
