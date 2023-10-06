import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { ResponseModel } from 'interface';
import { OrderSaleType } from 'interface/user';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  open: boolean;
  onHideSendPin: (isReload?: boolean) => void;
  item: OrderSaleType;
};

const ModalSendPin = ({ open, onHideSendPin, item }: Props) => {
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values: { [key: string]: string }) => {
    setLoading(true);
    try {
      await userService.sendPinCode({
        pinNumbers: Object.values(values),
        ticketId: Number(item.ticketNumber),
      });
      message.success(t('user.pinCodeSuccess', { id: item.ticketNumber }));
      onHideSendPin(true);
    } catch (err) {
      const error = err as ResponseModel<string>;
      message.error(t(error.errorCode as string));
      onHideSendPin();
    }

    setLoading(false);
  };

  return (
    <Modal hiddenIcon={false} isOpen={open} onCancel={onHideSendPin}>
      <S.ModalBody>
        <S.Wrapper>
          <div className="content-modal ">
            <H5>{t('user.sendPinToBuyer')}</H5>
          </div>

          <Form layout="vertical" onFinish={onSubmit} form={form}>
            {/* Render list input by seatQuantity */}
            {Array(item?.event?.ticket?.seatQuantity)
              .fill(1)
              .map((_, i: number) => (
                <Form.Item
                  className="input-pin"
                  key={`qty_${String(i)}`}
                  label={t('user.pinCode', { number: i + 1 })}
                  style={{ marginBottom: 34 }}
                  name={`code_${i}`}
                  rules={[
                    {
                      required: true,
                      message: t('user.pinCodeRequired'),
                    },
                  ]}
                >
                  <Input
                    placeholder={t('user.pinCodePlaceholder', {
                      number: i + 1,
                    })}
                  />
                </Form.Item>
              ))}
            <Button
              loading={loading}
              htmlType="submit"
              size="large"
              bgcolor={theme.colors.solidBrightGreenNetrual}
              color={theme.colors.emphasisDarkColorHight}
              className="save-btn"
            >
              {t('user.save')}
            </Button>
          </Form>
        </S.Wrapper>
      </S.ModalBody>
    </Modal>
  );
};

export default ModalSendPin;
