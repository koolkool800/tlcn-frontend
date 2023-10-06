import Input from '@components/common/Input';
import RadioGroup from '@components/common/RadioGroup';
import { CASH_RECEIPT_TYPE } from '@constants/codeConstants';
import useDimensions from '@hooks/useDimensions';
import { formatPhoneNumber } from '@utils/formatNumberWithCommas';
import { Form, RadioChangeEvent } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import BusinessCertificatesInput from '../BusinessCertificatesInput';
import * as S from './styles';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
};

function SelectPaymentAccount() {
  const { t } = useTranslation();
  const { isMobile } = useDimensions();
  const [receiptType, setReceiptType] = useState(CASH_RECEIPT_TYPE.PERSONAL);

  /**
   * the event onChange radiogroup
   * @param e RadioChangeEvent
   * @returns {void}
   */
  const handleChange = (e: RadioChangeEvent) => {
    const valueReceipt = e.target.value;
    setReceiptType(valueReceipt);
  };

  return (
    <S.ContentWrap>
      <div className="title-select-payment">
        {t('buyTicket.selectPaymentAccount')}
      </div>
      <div className="payment-accounts-wrap">
        <Form.Item name="cashReceiptType" style={{ marginBottom: 0 }}>
          <RadioGroup
            direction={isMobile ? 'vertical' : 'horizontal'}
            value={receiptType}
            options={[
              {
                label: t('buyTicket.phoneNumber'),
                value: CASH_RECEIPT_TYPE.PERSONAL,
              },
              {
                label: t('buyTicket.proofOfBusiness'),
                value: CASH_RECEIPT_TYPE.BUSINESS,
              },
              {
                label: t('buyTicket.doNotApply'),
                value: CASH_RECEIPT_TYPE.NULL,
              },
            ]}
            onChange={handleChange}
          />
        </Form.Item>
      </div>

      {CASH_RECEIPT_TYPE.PERSONAL === receiptType && (
        <Form.Item
          name="cashReceipt"
          style={{ marginBottom: 0 }}
          rules={[
            {
              validator(_, value) {
                if (!value) {
                  return Promise.reject(
                    new Error(t('buyTicket.pleaseInputPhoneNumber'))
                  );
                }

                const phoneNumber = value.replace(/\D/g, '');
                if (!/^\d{10}$/.test(phoneNumber)) {
                  return Promise.reject(
                    new Error(t('buyTicket.phoneNumberInvalid'))
                  );
                }

                return Promise.resolve();
              },
            },
          ]}
          getValueFromEvent={(event) => formatPhoneNumber(event.target.value)}
        >
          <Input
            allowClear
            type="input"
            placeholder="XXX XXX XXXX"
            maxLength={10}
          />
        </Form.Item>
      )}
      {CASH_RECEIPT_TYPE.BUSINESS === receiptType && (
        <Form.Item
          name="cashReceipt"
          style={{ marginBottom: 0 }}
          rules={[
            {
              required: true,
              message: t('buyTicket.pleaseInputYourCashReceipt'),
            },
          ]}
        >
          <BusinessCertificatesInput />
        </Form.Item>
      )}
    </S.ContentWrap>
  );
}

export default SelectPaymentAccount;
