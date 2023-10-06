import Checkbox from '@components/common/Checkbox';
import Input from '@components/common/Input';
import useAuth from '@hooks/useAuth';
import { Form, Space } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useEffect, useState } from 'react';

interface PhoneProps {
  value?: string | undefined;
  onChange?: (name: string | undefined) => void;
}

const SelectNameInput = ({ value, onChange }: PhoneProps) => {
  const auth = useAuth();
  const form = Form.useFormInstance();
  const selectAddress = Form.useWatch('selectAddress');
  const [checked, setChecked] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | undefined>('');

  useEffect(() => {
    setChecked(Boolean(selectAddress));
  }, [selectAddress]);

  useEffect(() => {
    if (checked) {
      onChange?.(auth.name);
      form.setFieldValue('selectAddress', 1);
    } else {
      onChange?.(inputValue);
    }

    return () => {
      onChange?.('');
    };
  }, [checked, inputValue]);

  return (
    <Space className="form-shipping">
      <div className="title-form-item recipient">
        <div className="title">Recipient</div>
        <div className="current-user">
          <Checkbox
            checked={checked}
            onChange={(e: CheckboxChangeEvent) => {
              setChecked(e.target.checked);
            }}
          >
            {auth.name}
          </Checkbox>
        </div>
      </div>
      <div className="form-item-wrap">
        <Input
          disabled={checked}
          placeholder="Enter Recipient"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setInputValue(e.target.value);
          }}
        />
      </div>
    </Space>
  );
};

export default SelectNameInput;
