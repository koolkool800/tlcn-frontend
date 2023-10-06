import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { Form, message } from 'antd';
import { ResponseModel } from 'interface';
import { OrderSaleType, SendTicketType } from 'interface/user';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  open: boolean;
  onHideDeliveryInfo: (isReload?: boolean) => void;
  item: OrderSaleType;
};

const ModalDeliveryInfo = ({ open, onHideDeliveryInfo, item }: Props) => {
  const { t } = useTranslation();
  const theme = useTheme() as DefaultTheme;
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: Omit<SendTicketType, 'ticketId'>) => {
    setLoading(true);
    try {
      const res: any = await userService.sentTicket({
        ticketId: Number(item.ticketNumber),
        deliveryCode: values?.deliveryCode || '',
        unitName: values?.unitName,
      });
      if (res?.result) {
        message.success(t('user.sendTicketSuccessful'));
        onHideDeliveryInfo(true);
      }
    } catch (err) {
      const error = err as ResponseModel<string>;
      message.error(t(error.errorCode as string));
    }

    setLoading(false);
  };

  return (
    <Modal hiddenIcon={false} isOpen={open} onCancel={onHideDeliveryInfo}>
      <S.ModalBody>
        <S.Wrapper>
          <div className="content-modal ">
            <H5>{t('user.enterDeliveryInfo')}</H5>
          </div>
          <S.FormWrapper>
            <Form layout="vertical" form={form} onFinish={onFinish}>
              <Form.Item
                label={t('user.deliveryUnit')}
                name="unitName"
                rules={[
                  {
                    required: true,
                    message: t('user.deliveryUnitMessage'),
                  },
                ]}
              >
                <Input placeholder="Enter name of delivery unit" />
              </Form.Item>
              <Form.Item
                label="Delivery code"
                name="deliveryCode"
                rules={[
                  {
                    required: true,
                    message: t('user.deliveryCodeMessage'),
                  },
                ]}
              >
                <Input placeholder="Enter delivery code" />
              </Form.Item>
              <Button
                htmlType="submit"
                loading={loading}
                size="large"
                bgcolor={theme.colors.solidBrightGreenNetrual}
                color={theme.colors.emphasisDarkColorHight}
              >
                {t('user.sendTicket')}
              </Button>
            </Form>
          </S.FormWrapper>
        </S.Wrapper>
      </S.ModalBody>
    </Modal>
  );
};

export default ModalDeliveryInfo;
