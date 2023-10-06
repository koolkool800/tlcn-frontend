/* eslint-disable prefer-promise-reject-errors */
import { Form } from 'antd';
import InputNumberAnt from '@components/common/InputNumber';
import { formatNumberWithCommas } from '@utils/formatNumberWithCommas';
import { useTranslation } from 'react-i18next';

const Price = ({ minPrice }: { minPrice: number }) => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="price"
      label={t('registerSellTicket.priceLabel')}
      style={{ marginBottom: 0 }}
      rules={[
        {
          required: true,
          validator: (_, value) => {
            const numericValue = Number(value);
            if (numericValue < minPrice) {
              return Promise.reject(
                `${t(
                  'registerSellTicket.priceErrorMinPrice'
                )} ${formatNumberWithCommas(minPrice)}`
              );
            }
            if (value.toString().length > 10) {
              return Promise.reject(
                t('registerSellTicket.priceErrorOverwhelmPrice')
              );
            }
            return Promise.resolve();
          },
        },
      ]}
    >
      <InputNumberAnt
        placeholder={t('registerSellTicket.pricePlaceHolder')}
        formatter={(value = 0) => formatNumberWithCommas(Number(value))}
      />
    </Form.Item>
  );
};

export default Price;
