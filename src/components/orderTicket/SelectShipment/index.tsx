import FormSearchAddress from '@components/common/FormSearchAddress';
import Input from '@components/common/Input';
import RadioButton from '@components/common/RadioButton';
import SelectAddressId from '@components/common/SelectAddressId';
import { Col, Form, Radio, Space } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import SelectNameInput from '../SelectNameInput';
import * as S from './styles';

function SelectShipment() {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const selectAddress = Form.useWatch('selectAddress');
  const addressId = Form.useWatch('addressId');

  const name = Form.useWatch('name');
  const address = Form.useWatch('address');
  const detailAddress = Form.useWatch('detailAddress');
  const phone = Form.useWatch('phone');

  useEffect(() => {
    if (selectAddress) {
      form.setFieldValue('addressId', undefined);
    } else {
      form.setFieldValue('name', undefined);
      form.setFieldValue('address', undefined);
      form.setFieldValue('detailAddress', undefined);
      form.setFieldValue('zoneCode', undefined);
      form.setFieldValue('phone', undefined);
    }
  }, [selectAddress]);

  useEffect(() => {
    if (addressId) {
      form.setFieldValue('selectAddress', 0);
    }
  }, [addressId]);

  useEffect(() => {
    if (name || address || detailAddress || phone) {
      form.setFieldValue('selectAddress', 1);
    }
  }, [address, detailAddress, phone]);

  return (
    <S.RowAnt>
      <Col xs={24} md={16}>
        <Form.Item
          name="selectAddress"
          initialValue={0}
          style={{ width: '100%', marginBottom: 0 }}
        >
          <Radio.Group style={{ width: '100%' }}>
            <RadioButton
              value={0}
              label={
                <div className="title-select-address">
                  {t('buyTicket.selectAvailableAddress')}
                </div>
              }
            />
            <div className="addresses-select-container">
              <SelectAddressId />
            </div>

            <RadioButton
              value={1}
              label={
                <div className="title-select-address">
                  {t('buyTicket.shippingInformation')}
                </div>
              }
            />

            <Space className="form-container">
              <Form.Item name="name">
                <SelectNameInput />
              </Form.Item>

              <Space className="form-shipping">
                <FormSearchAddress
                  requiredLabel={false}
                  rulesAddress={[
                    ({ getFieldValue }: any) => ({
                      validator(_: any, value: any) {
                        const addressValue = getFieldValue('selectAddress');
                        if (addressValue === 1 && !value) {
                          return Promise.reject(
                            new Error(t('buyTicket.pleaseInputYourAddress'))
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                />
              </Space>
              <Space className="form-shipping">
                <div className="title-form-item">{t('buyTicket.contract')}</div>
                <div className="form-item-wrap">
                  <Form.Item name="phone">
                    <Input placeholder={t('buyTicket.enterContact')} />
                  </Form.Item>
                </div>
              </Space>
            </Space>
          </Radio.Group>
        </Form.Item>
      </Col>
    </S.RowAnt>
  );
}

export default SelectShipment;
