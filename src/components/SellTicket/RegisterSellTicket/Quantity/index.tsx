import Select from '@components/common/Select';
import { Option } from '@components/common/Select/style';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';

const Options = new Array(10)
  .fill(0)
  .map((item, index) => ({ label: index + 1, value: index + 1 }));

const Quantity = () => {
  const { t } = useTranslation();

  return (
    <Form.Item
      name="quantity"
      label={t('registerSellTicket.quantityLabel')}
      style={{ marginBottom: 0 }}
      rules={[
        {
          required: true,
          message: t('registerSellTicket.quantityMessageError'),
        },
      ]}
    >
      <Select
        placeholder={t('registerSellTicket.quantityPlaceHolder')}
        options={Options}
      >
        {Options.map((option) => (
          <Option key={option.value} value={option.value}>
            {option.label}
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default Quantity;
