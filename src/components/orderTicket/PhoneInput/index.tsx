import Input from '@components/common/Input';
import Select from '@components/common/Select';
import { Minus } from 'iconsax-react';
import { useEffect, useState } from 'react';
import * as S from './style';

interface PhoneProps {
  value?: string;
  onChange?: (phone: string) => void;
}
const optionsPhoneNumber = [
  {
    value: '010',
    label: '010',
  },
  {
    value: '011',
    label: '011',
  },
  {
    value: '016',
    label: '016',
  },
  {
    value: '017',
    label: '017',
  },
  {
    value: '018',
    label: '018',
  },
  {
    value: '019',
    label: '019',
  },
];

/**
 * used to format data phone number
 * @param inputValue value phone number
 * @returns {string}
 */
const formatPhoneNumber = (inputValue: string): string => {
  const cleanedInput = inputValue.replace(/\D/g, '');
  const match = cleanedInput.match(/^(\d{3})(\d{4})$/);
  if (match) {
    return `${match[1]}-${match[2]}`;
  }

  return inputValue;
};

const PhoneInput = ({ value, onChange }: PhoneProps) => {
  const [prefix, setPrefix] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  /**
   * used to trigger field of form
   * @param prefixValue value prefix phone number
   * @param phoneValue value suffix phone number
   * @returns {void}
   */
  const triggerChange = (prefixValue: string, phoneValue: string) => {
    if (prefixValue && phoneValue) {
      const valuePhoneNumber = `${prefixValue}${phoneValue}`;
      onChange?.(valuePhoneNumber.replace('-', ''));
    } else {
      onChange?.('');
    }
  };

  /**
   *event onChange prefix phone number
   * @param val value prefix phone number
   * @returns {void}
   */
  const handleChangePrefix = (val: string): void => {
    setPrefix(val);
    triggerChange(val, phone);
  };

  /**
   * event onChange value suffix phone number
   * @param event React.ChangeEvent<HTMLInputElement>
   * @returns {void}
   */
  const handleChangePhone = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const inputValue = event.target.value;
    if (Number(inputValue)) {
      const formattedValue = formatPhoneNumber(inputValue);
      setPhone(formattedValue);
      triggerChange(prefix, formattedValue);
    } else {
      setPhone('');
      triggerChange(prefix, '');
    }
  };

  // used to reset field value
  useEffect(() => {
    return () => {
      onChange?.('');
    };
  }, []);

  return (
    <S.Wrap>
      <Select
        width={76}
        value={prefix}
        options={optionsPhoneNumber}
        onChange={handleChangePrefix}
      />
      <Minus size="16" />
      <Input
        allowClear
        value={phone}
        maxLength={7}
        type="input"
        placeholder="XX-XXXXX"
        style={{ maxWidth: 151 }}
        onChange={handleChangePhone}
      />
    </S.Wrap>
  );
};

export default PhoneInput;
