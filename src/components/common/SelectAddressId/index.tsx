import { useAppSelector } from '@hooks/useAppSelector';
import { RootState } from '@redux/store';
import userService from '@services/userService';
import { ButtonTag } from '@style/DefaultStyled';
import { Form, Radio } from 'antd';
import { ResponseListModel } from 'interface';
import { AddressType } from 'interface/user';
import { useEffect, useState } from 'react';
import Button from '../Button';
import FormAddressListModal from '../FormAddressListModal';
import RadioButton from '../RadioButton';
import * as S from './style';

const SelectAddressId = () => {
  const form = Form.useFormInstance();

  const selectAddress = Form.useWatch('selectAddress');
  const addressId = Form.useWatch('addressId', form);

  const [address, setAddress] = useState<AddressType[]>([]);
  const [addressList, setAddressList] = useState<AddressType[]>([]);

  const [showMore, setShowMore] = useState(false);

  /**
   * used to get address list
   * @returns {Promise<void>}
   */
  const loadAddress = async () => {
    try {
      const res: ResponseListModel<AddressType> =
        await userService.getAddress();
      const addressTransform = res.data.data.slice(0, 2);
      setAddressList(res.data?.data || []);
      setAddress(addressTransform || []);
      form.setFieldValue('addressId', addressTransform?.[0]?.id);
    } catch (err) {
      /* empty */
    }
  };
  useEffect(() => {
    loadAddress();
  }, []);

  useEffect(() => {
    if (!selectAddress && !addressId) {
      form.setFieldValue('addressId', address?.[0]?.id);
    }
  }, [selectAddress]);

  /**
   * used to open modal address list
   * @returns {void}
   */
  const handleOpenShowMore = (): void => {
    setShowMore(true);
  };
  /**
   * used to close modal address list
   * @returns {void}
   */
  const handleCloseShowMore = (): void => {
    setShowMore(false);
  };

  /**
   * event when click button see more
   * @param values value selected
   * @returns {void}
   */
  const handleConfirm = (values: number | undefined): void => {
    const index: number = address.findIndex((a) => a.id === values);
    const addressSelected: AddressType | undefined = addressList.find(
      (add) => add.id === values
    );
    if (index === -1 && addressSelected) {
      address.splice(1, 1, addressSelected);
      setAddress((pre) => [...pre]);
    }
    form.setFieldValue('addressId', values);
    handleCloseShowMore();
  };

  return (
    <S.Layout>
      <FormAddressListModal
        initialValue={addressId}
        showMore={showMore}
        addressList={addressList}
        onCancel={handleCloseShowMore}
        onFinish={handleConfirm}
      />

      <Form.Item name="addressId" style={{ marginBottom: 0 }}>
        <Radio.Group>
          <S.Wrap>
            {address.map((item: AddressType) => (
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
      </Form.Item>
      {addressList.length > 2 && (
        <div className="btn-showMore">
          <span>
            <Button onClick={handleOpenShowMore}>더보기</Button>
          </span>
        </div>
      )}
    </S.Layout>
  );
};

export default SelectAddressId;
