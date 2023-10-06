import InputNumber from '@components/common/InputNumber';
import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import useDebounce from '@hooks/useDebounce';
import userService from '@services/userService';
import { dateTimeFormatString } from '@utils/format';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { handleConvertData } from '@utils/helper';
import { Form, Typography } from 'antd';
import { BaseOptionType } from 'antd/es/select';
import { ResponseListModel } from 'interface';
import { AmountSeller } from 'interface/event';
import { VoucherType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

const { Title, Text } = Typography;

function PriceRegistration({
  actualAmountSeller = 0,
  discountValue = 0,
  saleCommission = 0,
  salePrice = 0,
  shippingFee = 0,
}: AmountSeller) {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const debounce = useDebounce(300);
  const [vouchers, setVouchers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const fetchVoucher = async (totalPricePass: number) => {
    setLoading(true);
    try {
      const requestVoucher = {
        totalPrice: totalPricePass,
        applySeller: 'seller',
      };
      const res: ResponseListModel<VoucherType> =
        await userService.getVoucherOrder(requestVoucher);
      setVouchers(res?.data);
      setLoading(false);
    } catch (err) {
      /* empty */
      setLoading(false);
    }
  };

  useEffect(() => {
    debounce(() => {
      fetchVoucher(form.getFieldValue('totalPrice'));
    });
  }, [form.getFieldValue('totalPrice')]);

  return (
    <>
      <div className="container">
        <Form.Item
          label={t('onsiteTicket.unitPrice')}
          name="totalPrice"
          required
          style={{ marginBottom: 30 }}
          rules={[
            {
              required: true,
              message: t('common.required', {
                field: t('onsiteTicket.unitPrice'),
              }),
            },
            {
              min: 1,
              type: 'number',
              message: t('common.min', {
                field: t('onsiteTicket.unitPrice'),
                min: 0,
              }),
            },
          ]}
        >
          <InputNumber
            placeholder={t('common.placeholder', {
              field: t('onsiteTicket.unitPrice'),
            })}
            formatter={(value) => formatNumberWithCommas(Number(value))}
          />
        </Form.Item>

        <Form.Item
          name="voucherId"
          label={t('onsiteTicket.discountCoupon')}
          style={{ marginBottom: 30 }}
        >
          <Select
            placeholder={t('common.placeholder', {
              field: t('onsiteTicket.discountCoupon'),
            })}
            allowClear
            dropdownRender={(menu) => {
              return <S.ContainerMenu>{menu}</S.ContainerMenu>;
            }}
            optionLabelProp="label"
            loadingVoucher={loading}
          >
            {handleConvertData(vouchers).map((option: BaseOptionType) => (
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
                    Expired date:{' '}
                    {dateTimeFormatString(
                      option.voucher.expiredDate,
                      'YYYY.MM-DD'
                    )}
                  </S.ContainerExpiredDate>
                </S.ContainerLabel>
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Check sell amount"
          className="container-form-check-sale-amount"
        >
          <div className="container-check-sale-mount">
            <div className="container-discount-coupon">
              <Title level={5}>{t('onsiteTicket.salePrice')}</Title>
              <Text>{formatNumberWithCommas(salePrice)}원</Text>
            </div>
            <div className="container-sales-commission">
              <Title level={5}>{t('onsiteTicket.disCoupon')}</Title>
              <Text>{formatNumberWithCommas(discountValue)}원</Text>
            </div>
            <div className="container-sales-commission">
              <Title level={5}>{t('onsiteTicket.salesCommission')}</Title>
              <Text>{formatNumberWithCommas(saleCommission)}원</Text>
            </div>
            <div className="container-Shipping-fee">
              <Title level={5}>{t('onsiteTicket.shippingFee')}</Title>
              <Text>{formatNumberWithCommas(shippingFee)}원</Text>
            </div>
            <div className="container-Actual-amount-received">
              <Title level={5}>{t('onsiteTicket.actualAmount')}</Title>
              <Text>{formatNumberWithCommas(actualAmountSeller)}원</Text>
            </div>
          </div>
        </Form.Item>
      </div>
    </>
  );
}

export default PriceRegistration;
