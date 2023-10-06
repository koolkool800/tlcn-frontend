import Button from '@components/common/Button';
import FormSearchAddress from '@components/common/FormSearchAddress';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import SwitchCustom from '@components/common/Switch';
import { H5, Typography } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form } from 'antd';
import { AddressType } from 'interface/user';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './style';

interface Props {
  title: string;
  open: boolean;
  initialValues: AddressType | null;
  onCancel: () => void;
  onSubmit: (values: AddressType) => void;
}

const ModalAddAddress = ({
  title,
  open,
  initialValues,
  onCancel,
  onSubmit,
}: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldValue('name', initialValues?.name);
    form.setFieldValue('phone', initialValues?.phone);
    form.setFieldValue('address', initialValues?.address);
    form.setFieldValue('detailAddress', initialValues?.detailAddress);
    form.setFieldValue('isDefault', initialValues?.isDefault);
    form.setFieldValue('zoneCode', initialValues?.zoneCode);

    return () => {
      form.resetFields();
    };
  }, [initialValues]);

  return (
    <Modal isOpen={open} hiddenIcon={false} onCancel={onCancel}>
      <>
        <S.Wrapper>
          <div className="content-modal ">
            <H5>{title}</H5>
          </div>
          <Form
            form={form}
            layout="vertical"
            name="edit-information"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onSubmit}
          >
            <Form.Item name="zoneCode" noStyle />
            <Form.Item
              className="container-name"
              label={t('user.name')}
              name="name"
              required
              rules={[
                {
                  required: true,
                  message: t('user.nameRequired'),
                },
              ]}
            >
              <Input
                disabled
                allowClear
                type="input"
                placeholder={t('user.namePlaceholder')}
              />
            </Form.Item>
            <Form.Item
              className="container-phone-number"
              label={t('user.phoneNumber')}
              name="phone"
              required
              rules={[
                {
                  required: true,
                  message: t('user.phoneRequired'),
                },
              ]}
            >
              <Input
                disabled
                allowClear
                type="input"
                placeholder={t('user.phoneNumberPlaceholder')}
              />
            </Form.Item>
            <FormSearchAddress />
            <S.SwitchWrapper>
              <SwitchCustom
                defaultChecked={!!initialValues?.isDefault}
                label={<Typography>{t('user.setAsDefault')}</Typography>}
              />
            </S.SwitchWrapper>
            <Button
              htmlType="submit"
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
            >
              {t('user.save')}
            </Button>
          </Form>
        </S.Wrapper>
      </>
    </Modal>
  );
};

export default ModalAddAddress;
