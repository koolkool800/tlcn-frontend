import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import RadioButton from '@components/common/RadioButton';
import { ButtonTag } from '@style/DefaultStyled';
import { Form, Radio } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';
import userService from '@services/userService';
import * as S from './styles';

type AddressAvailableType = {
  name: string;
  id: number;
  phone: string;
  address: string;
  isDefault: boolean;
};

const SellerShipment = () => {
  const form = Form.useFormInstance();
  const [address, setAddress] = useState<AddressAvailableType[]>([]);
  const [showMore, setShowMore] = useState(false);
  const [addressOutside, setAddressOutside] = useState<AddressAvailableType[]>(
    []
  );

  const loadAddressAvailable = async () => {
    const res = await userService.getAddress();
    setAddress(res.data.data);
  };
  /** handle load address available */
  useEffect(() => {
    loadAddressAvailable();
  }, []);

  useLayoutEffect(() => {
    const addr = [...address].splice(0, 2);
    setAddressOutside(addr);
  }, [address]);

  /** * Open modal show more */
  const handleShowMore = () => {
    const add = form.getFieldValue('available_address');
    form.setFieldValue('available_address_list', add);

    setShowMore(true);
  };

  const handleCloseShowMore = () => {
    setShowMore(false);
  };

  /** * Handle setting a new address value when the confirm button is clicked. */
  const handleConfirm = () => {
    const addressChoose: number = form.getFieldValue('available_address_list');
    form.setFieldValue('available_address', addressChoose);
    const index: number = address.findIndex((a) => a.id === addressChoose);

    if (index > -1) {
      const newAvailableAddress =
        Number(index) === address.length - 1
          ? [...address].splice(index - 1, 2)
          : [...address].splice(index, 2);

      setAddressOutside(newAvailableAddress);
    }

    handleCloseShowMore();
  };

  return (
    <S.Container>
      <Modal
        isOpen={showMore}
        onCancel={handleCloseShowMore}
        hiddenIcon={false}
        title={<S.Title>Select Delivery Area</S.Title>}
      >
        <S.WrapperAddress>
          <div className="container-body" style={{ textAlign: 'left' }}>
            <div className="container-available">
              <Form.Item name="available_address_list">
                <Radio.Group defaultValue={3}>
                  {address.map((item: AddressAvailableType) => (
                    <div key={item.id} className="address-item">
                      <RadioButton
                        value={item.id}
                        label={
                          <div className="container-address">
                            <div>
                              {item.name} | {item.phone}
                            </div>
                          </div>
                        }
                      />
                      <div className="desc desc-modal">
                        {item.address}
                        <div className="tag">
                          {item.isDefault && <ButtonTag>Default</ButtonTag>}
                        </div>
                      </div>
                    </div>
                  ))}
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </S.WrapperAddress>
        <Button onClick={handleConfirm}>Confirm</Button>
      </Modal>

      <S.Typography>Seller shipment</S.Typography>
      <div className="container-body">
        <Form.Item name="select_address" style={{ marginBottom: 0 }}>
          <Radio.Group defaultValue={1}>
            <RadioButton
              value={1}
              label={
                <div className="container-available">
                  <span>Select available address</span>
                  <Form.Item name="available_address">
                    <Radio.Group defaultValue={3}>
                      {addressOutside.map((item: AddressAvailableType) => (
                        <RadioButton
                          key={item.id}
                          value={item.id}
                          label={
                            <div className="container-address">
                              <div>
                                {item.name} | {item.phone}
                              </div>
                              <div className="desc">{item.address}</div>
                              {item.isDefault && <ButtonTag>Default</ButtonTag>}
                            </div>
                          }
                        />
                      ))}
                    </Radio.Group>
                  </Form.Item>

                  {address.length > 2 && (
                    <Button className="view-more" onClick={handleShowMore}>
                      더보기
                    </Button>
                  )}
                </div>
              }
            />
            <RadioButton
              value={2}
              label={
                <div className="container-shipping">
                  <span>Or enter new shipping information</span>
                  <Form.Item
                    className="container-address"
                    name="searchAddress"
                    label="Address"
                  >
                    <Input
                      placeholder="Search address"
                      onFocus={() => {
                        form.setFieldValue('select_address', 2);
                        form.setFieldValue('available_address', null);
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="address">
                    <Input
                      placeholder="Address"
                      onFocus={() => {
                        form.setFieldValue('select_address', 2);
                        form.setFieldValue('available_address', null);
                      }}
                    />
                  </Form.Item>
                  <Form.Item name="detailedAddress">
                    <Input
                      placeholder="Detailed address"
                      onFocus={() => {
                        form.setFieldValue('select_address', 2);
                        form.setFieldValue('available_address', null);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className="container-sender"
                    name="sender"
                    label="Sender"
                  >
                    <Input
                      placeholder="Enter sender name"
                      onFocus={() => {
                        form.setFieldValue('select_address', 2);
                        form.setFieldValue('available_address', null);
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    className="container-contact"
                    name="contact"
                    label="Contact"
                  >
                    <Input
                      placeholder="Enter phone number"
                      onFocus={() => {
                        form.setFieldValue('select_address', 2);
                        form.setFieldValue('available_address', null);
                      }}
                    />
                  </Form.Item>
                </div>
              }
            />
          </Radio.Group>
        </Form.Item>
      </div>
    </S.Container>
  );
};

export default SellerShipment;
