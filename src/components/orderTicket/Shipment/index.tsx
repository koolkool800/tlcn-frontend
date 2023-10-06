import Checkbox from '@components/common/Checkbox';
import Input from '@components/common/Input';
import RadioButton from '@components/common/RadioButton';
import { Form, Radio, Space } from 'antd';
import { useState } from 'react';
import * as S from './styles';

function Shipment() {
  const form = Form.useFormInstance();
  const [address, setAddress] = useState('');
  return (
    <S.SelectShipmentContainer>
      <div className="available-address-container">
        <Radio.Group value={address}>
          <RadioButton
            value="old-address"
            label={
              <div className="title-select-address">
                Select available address
              </div>
            }
          />
          <div className="addresses-select-container">
            <Form.Item name="address-details">
              <Radio.Group onChange={() => setAddress('old-address')}>
                <div className="select-wrap">
                  <RadioButton
                    value="hiru1"
                    label={
                      <div className="address-item-detail">
                        <div className="name">Hiru Tran | (+82) 879 878 68</div>
                        <div className="address">
                          407, Yeongdong-daero, Gangnam-gu, Seoul, 06182, 4th
                          floor, Cony Buliding
                        </div>
                        <div className="default-tag">Default</div>
                      </div>
                    }
                  />
                  <RadioButton
                    value="hiru2"
                    label={
                      <div className="address-item-detail">
                        <div className="name">Hiru Tran | (+82) 879 878 68</div>
                        <div className="address">
                          407, Yeongdong-daero, Gangnam-gu, Seoul, 06182, 4th
                          floor, Cony Buliding
                        </div>
                      </div>
                    }
                  />
                  <RadioButton
                    value="hiru3"
                    label={
                      <div className="address-item-detail">
                        <div className="name">Hiru Tran | (+82) 879 878 68</div>
                        <div className="address">
                          407, Yeongdong-daero, Gangnam-gu, Seoul, 06182, 4th
                          floor, Cony Buliding
                        </div>
                      </div>
                    }
                  />
                </div>
              </Radio.Group>
            </Form.Item>
          </div>

          <RadioButton
            value="new-address"
            label={
              <div className="title-select-address">
                Or enter new shipping information
              </div>
            }
          />
          <Space
            className="form-container"
            onClick={() => {
              setAddress('new-address');
              form.setFieldValue('address-details', undefined);
            }}
          >
            <Space className="form-shipping">
              <div className="title-form-item recipient">
                <div className="title">Recipient</div>
                <div className="current-user">
                  <Checkbox>Hiru Tran</Checkbox>
                </div>
              </div>
              <div className="form-item-wrap">
                <Form.Item name="recipient">
                  <Input placeholder="Enter Recipient" />
                </Form.Item>
              </div>
            </Space>
            <Space className="form-shipping">
              <div className="title-form-item">Address</div>
              <div className="form-item-wrap">
                <Form.Item name="search-address">
                  <Input placeholder="Search address" />
                </Form.Item>
                <Form.Item name="address">
                  <Input placeholder="Address" />
                </Form.Item>
                <Form.Item name="detail-address">
                  <Input placeholder="Detail address" />
                </Form.Item>
              </div>
            </Space>
            <Space className="form-shipping">
              <div className="title-form-item">Contact</div>
              <div className="form-item-wrap">
                <Form.Item name="contact">
                  <Input placeholder="Enter contact" />
                </Form.Item>
              </div>
            </Space>
          </Space>
        </Radio.Group>
      </div>
    </S.SelectShipmentContainer>
  );
}

export default Shipment;
