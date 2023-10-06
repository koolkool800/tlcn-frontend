/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-nested-ternary */
import Input from '@components/common/Input';
import { InputRef } from 'antd';
import { Minus } from 'iconsax-react';
import { Fragment, createRef, useEffect, useState } from 'react';
import * as S from './style';

interface PhoneProps {
  value?: string;
  onChange?: (phone: string) => void;
}

const BusinessCertificatesInput = ({ value, onChange }: PhoneProps) => {
  const [valueInput1, setValueInput1] = useState<string>('');
  const [valueInput2, setValueInput2] = useState<string>('');
  const [valueInput3, setValueInput3] = useState<string>('');

  const inputRefs = [
    createRef<InputRef>(),
    createRef<InputRef>(),
    createRef<InputRef>(),
  ];

  /**
   *  event onChange input
   * @param index index array
   * @param event React.ChangeEvent<HTMLInputElement>
   * @returns {void}
   */
  const handleInputChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const input = event.target;
    const valueInput = input.value;

    if (valueInput.length === 0 && index > 0) {
      inputRefs[index - 1].current?.focus();
    }

    if (valueInput.length >= input.maxLength && index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.focus();
    }

    index === 0
      ? setValueInput1(valueInput)
      : index === 1
      ? setValueInput2(valueInput)
      : setValueInput3(valueInput);
  };

  // used to reset field value
  useEffect(() => {
    const valueField = `${valueInput1}${valueInput2}${valueInput3}`;
    onChange?.(valueField);
    return () => {
      onChange?.('');
    };
  }, [valueInput1, valueInput2, valueInput3]);

  return (
    <S.Wrap>
      {inputRefs.map((ref, index: number) => {
        const length = index === 0 ? 3 : index === 1 ? 2 : 5;
        const placeholder = index === 0 ? '***' : index === 1 ? '**' : '*****';

        if (inputRefs.length - 1) {
          return (
            <Fragment key={`${index + 1}`}>
              <Input
                ref={ref}
                allowClear
                type="input"
                placeholder={placeholder}
                maxLength={length}
                onChange={(event) => handleInputChange(index, event)}
                style={{ maxWidth: 151 }}
              />
            </Fragment>
          );
        }
        return (
          <Fragment key={`${index + 1}`}>
            <Input
              ref={ref}
              allowClear
              type="input"
              placeholder={placeholder}
              maxLength={length}
              onChange={(event) => handleInputChange(index, event)}
              style={{ maxWidth: 151 }}
            />

            <Minus size="16" />
          </Fragment>
        );
      })}
    </S.Wrap>
  );
};

export default BusinessCertificatesInput;
