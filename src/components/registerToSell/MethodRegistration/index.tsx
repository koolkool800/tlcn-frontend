import Checkbox from '@components/common/Checkbox';
import { CheckboxGroup } from '@components/common/Checkbox/style';
import { TransactionMethod } from '@constants/ticket';
import { Form, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { checkEventDate } from '@utils/helper';
import RadioItem from '../RadioItem';

const { Title } = Typography;

function MethodRegistration() {
  const { t } = useTranslation();
  const form = Form.useFormInstance();
  const performanceDate = Form.useWatch('performanceDate', form);
  return (
    <>
      <div className="container">
        <div className="container-title">
          <Title level={5}>{t('onsiteTicket.transactionMethod')}</Title>
          <div className="description">
            <span className="header">
              {t('onsiteTicket.selectTransaction')}
            </span>
            <span> ({t('onsiteTicket.require')})</span>
          </div>
        </div>
        <div className="container-item-list">
          <Form.Item
            name="deliveryMethod"
            rules={[
              {
                required: true,
                message: t('common.required', {
                  field: t('onsiteTicket.transactionMethod'),
                }),
              },
            ]}
          >
            <CheckboxGroup
              style={{
                backgroundColor: 'unset',
              }}
            >
              <Checkbox value={TransactionMethod.PIN_TRANSACTION}>
                <RadioItem
                  type="pinTransaction"
                  content={
                    <div className="content">
                      <div>
                        &#x2022; {t('onsiteTicket.pinTransactionDesc1')}
                      </div>
                      <div>
                        &#x2022;
                        {t('onsiteTicket.pinTransactionDesc2')}
                      </div>
                      <div>
                        &#x2022; {t('onsiteTicket.pinTransactionDesc3')}
                      </div>
                    </div>
                  }
                />
              </Checkbox>
              {!checkEventDate(performanceDate) && (
                <Checkbox value={TransactionMethod.SELLER_SHIPMENT}>
                  <RadioItem
                    type="sellerShipment"
                    content={
                      <div className="content">
                        <div>
                          &#x2022; {t('onsiteTicket.sellerShipmentDesc1')}
                        </div>
                        <div>
                          &#x2022; {t('onsiteTicket.sellerShipmentDesc2')}
                        </div>
                      </div>
                    }
                  />
                </Checkbox>
              )}
            </CheckboxGroup>
          </Form.Item>
        </div>
      </div>
    </>
  );
}

export default MethodRegistration;
