import { ButtonTag } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Radio, RadioChangeEvent } from 'antd';
import { AddressType } from 'interface/user';
import { useEffect, useState } from 'react';
import Button from '../Button';
import Modal from '../ModalConfirm';
import RadioButton from '../RadioButton';
import * as S from './style';

interface FormAddressListModalProps {
  initialValue: number | undefined;
  showMore: boolean;
  addressList: AddressType[];
  onCancel: () => void;
  onFinish: (values: number | undefined) => void;
}

const FormAddressListModal: React.FC<FormAddressListModalProps> = ({
  initialValue,
  addressList,
  showMore,
  onCancel,
  onFinish,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

  return (
    <Modal isOpen={showMore} hiddenIcon={false} onCancel={onCancel}>
      <Radio.Group onChange={onChange} value={value}>
        <S.Wrap>
          {addressList.map((item: AddressType) => (
            <RadioButton
              key={item.id}
              value={item.id}
              label={
                <div className="address-item-detail">
                  <div className="name">
                    {item.name} | {item.phone}
                  </div>
                  <div className="address">
                    {item.address}, {item.detailAddress}
                  </div>
                  {item.isDefault && (
                    <div>
                      <ButtonTag>Default</ButtonTag>
                    </div>
                  )}
                </div>
              }
            />
          ))}
        </S.Wrap>
      </Radio.Group>
      <div className="btn-wrap">
        <Button
          htmlType="submit"
          size="large"
          color={theme?.colors?.black}
          bgcolor={theme?.colors?.purple200}
          onClick={() => onFinish(value)}
        >
          Confirm
        </Button>
      </div>
    </Modal>
  );
};

export default FormAddressListModal;
