import Input from '@components/common/Input';
import { Form } from 'antd';
import * as S from './styles';

const ShippingInformation = () => {
  return (
    <S.Container>
      <S.Typography>Or enter new shipping information</S.Typography>
      <Form.Item name="address" label="Address">
        <Input placeholder="Search address" />
      </Form.Item>
    </S.Container>
  );
};

export default ShippingInformation;
