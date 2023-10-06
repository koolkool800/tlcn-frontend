import useDebounce from '@hooks/useDebounce';
import { Form } from 'antd';
import { SearchNormal1 } from 'iconsax-react';
import Input from '../Input';
import * as S from './style';

type Props = {
  handleValuesChange: (value: string) => void;
  placeholder?: string;
};
const InputSearch = ({
  handleValuesChange,
  placeholder = 'Event, artist, concert, sport...',
}: Props) => {
  const [form] = Form.useForm();
  const debounce = useDebounce();

  const onChange = (value: string) => {
    debounce(() => {
      handleValuesChange(value);
    });
  };
  return (
    <Form
      form={form}
      layout="vertical"
      style={{ minWidth: '100%' }}
      onValuesChange={onChange}
    >
      <S.InputContainer>
        <Form.Item name="name" style={{ margin: 0 }}>
          <Input
            allowClear
            placeholder={placeholder}
            prefix={<SearchNormal1 size="20" color="#FFFFFF" />}
          />
        </Form.Item>
      </S.InputContainer>
    </Form>
  );
};

export default InputSearch;
