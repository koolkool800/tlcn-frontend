import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import { H6, Typography } from '@style/DefaultStyled';
import { dateTimeFormatString } from '@utils/format';
import { handleConvertData } from '@utils/helper';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import SelectShipment from '../SelectShipment';
import TicketInformationDetails from '../TicketInformationDetails';
import * as S from './styles';

type Props = {
  deliveryMethod: 'PIN_TRANSACTION' | 'SELLER_SHIPMENT' | string;
  voucherOptions: any;
};

const OrderTicketComponent = ({ deliveryMethod, voucherOptions }: Props) => {
  const { t } = useTranslation();

  const sellerShipmentGuidelines = [
    t('buyTicket.sellerShipmentGuidelines.content1'),
    t('buyTicket.sellerShipmentGuidelines.content2'),
    t('buyTicket.sellerShipmentGuidelines.content3'),
  ];
  const pinTransactionGuidelines = [
    t('buyTicket.pinTransactionGuidelines.content1'),
    t('buyTicket.pinTransactionGuidelines.content2'),
  ];

  const arrayGuidelines =
    deliveryMethod === 'PIN_TRANSACTION'
      ? pinTransactionGuidelines
      : sellerShipmentGuidelines;

  return (
    <S.SellerShipmentContainer>
      <section className="short-desc">
        <H6>
          {deliveryMethod === 'PIN_TRANSACTION'
            ? t('buyTicket.pinTransactionGuidelines.title')
            : t('buyTicket.pinTransactionGuidelines.title')}
        </H6>
        {arrayGuidelines.map((value) => (
          <p key={value}>{value}</p>
        ))}
      </section>

      {deliveryMethod === 'SELLER_SHIPMENT' && <SelectShipment />}

      <TicketInformationDetails />

      <section className="vouchers-container">
        <H6>{t('buyTicket.coupon')}</H6>
        <Form.Item name="voucherId">
          <Select
            placeholder={t('buyTicket.selectCoupon')}
            allowClear
            dropdownRender={(menu) => {
              return <S.ContainerMenu>{menu}</S.ContainerMenu>;
            }}
            optionLabelProp="label"
          >
            {handleConvertData(voucherOptions?.data).map((option: any) => {
              return (
                <Option
                  key={option.voucher.id}
                  value={option.voucher.id}
                  label={option.voucher.name}
                >
                  <S.ContainerLabel>
                    <div>
                      <div>{option.voucher.name}</div>
                      <div>
                        <Typography>{option.voucher.description}</Typography>
                      </div>
                    </div>
                    <S.ContainerExpiredDate>
                      {t('buyTicket.expiredDate')}:{' '}
                      {dateTimeFormatString(
                        option.voucher.expiredDate,
                        'YYYY.MM-DD'
                      )}
                    </S.ContainerExpiredDate>
                  </S.ContainerLabel>
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </section>

      {/* select payment account */}
      {/* <SelectPaymentAccount /> */}
    </S.SellerShipmentContainer>
  );
};

export default OrderTicketComponent;
