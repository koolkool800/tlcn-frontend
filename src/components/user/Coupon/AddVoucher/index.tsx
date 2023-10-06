import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import userService from '@services/userService';
import { H5 } from '@style/DefaultStyled';
import { Form } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type Props = {
  open: boolean;
  setOpen: (isReload: boolean) => void;
};

const AddVoucher = ({ open, setOpen }: Props) => {
  const theme = useTheme() as DefaultTheme;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (values: { code: string }) => {
    setLoading(true);
    try {
      const res = await userService.getCollectVoucher(values.code);
      if (res?.result) {
        setSuccess(true);
        setOpen(true);
      }
    } catch (err) {
      form.setFields([
        {
          name: 'code',
          errors: [t('user.couponCodeNotExist')],
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      <Modal isOpen={open} onCancel={() => setOpen(false)} hiddenIcon={success}>
        {success && (
          <S.Container>
            <div className="wrapper">
              <H5>{t('user.getCouponSuccess')}</H5>{' '}
              <Button
                loading={loading}
                color={theme.colors.black}
                bgcolor={theme.colors.primary500}
                onClick={() => {
                  form.setFieldValue('code', '');
                  setOpen(false);
                  setSuccess(false);
                }}
              >
                {t('user.done')}
              </Button>
            </div>
          </S.Container>
        )}
        {!success && (
          <S.Container>
            <div className="wrapper">
              <div className="content-modal ">
                <H5>{t('user.getCoupon')}</H5>
              </div>
              <Form form={form} layout="vertical" onFinish={onSubmit}>
                <Form.Item
                  label={t('user.couponCode')}
                  required
                  name="code"
                  style={{ marginBottom: 32 }}
                  rules={[
                    {
                      required: true,
                      message: t('user.couponCodeRequired'),
                    },
                  ]}
                >
                  <Input placeholder={t('user.placeholderCouponCode')} />
                </Form.Item>

                <Button
                  loading={loading}
                  color={theme.colors.black}
                  bgcolor={theme.colors.primary500}
                  htmlType="submit"
                >
                  {t('user.save')}
                </Button>
              </Form>
            </div>
          </S.Container>
        )}
      </Modal>
    </>
  );
};

export default AddVoucher;
