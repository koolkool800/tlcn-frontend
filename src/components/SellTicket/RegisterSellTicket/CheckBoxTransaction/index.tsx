import { Form, Typography } from 'antd';
import Checkbox from '@components/common/Checkbox';
import { H6 } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import {
  DELIVERY_METHOD_VALUE,
  KeyAvailableTransaction,
} from '@constants/codeConstants';

const { Text } = Typography;

const CheckBoxTransaction = ({
  emptyError,
  availableTransactions,
}: {
  emptyError: { state: boolean; message: string };
  availableTransactions: string[];
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className="description">
        <H6>Select transaction method</H6>
      </div>
      {availableTransactions.map((item) => (
        <Form.Item
          name={KeyAvailableTransaction[item]}
          valuePropName="checked"
          style={{ marginBottom: 9 }}
          key={item}
        >
          <Checkbox>{DELIVERY_METHOD_VALUE[item]}</Checkbox>
        </Form.Item>
      ))}

      {emptyError.state && <Text type="danger">{emptyError.message}</Text>}
    </div>
  );
};

export default CheckBoxTransaction;
