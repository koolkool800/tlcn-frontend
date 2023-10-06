import Button from '@components/common/Button';
import DatePickerCustom from '@components/common/Datepicker';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import PhoneNumber from '@components/common/PhoneNumber';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form } from 'antd';
import { FormUserType, UserType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  initialValues: UserType | null;
  onCancel: () => void;
  onSubmit: (values: FormUserType) => void;
  loading: boolean;
}

const ModalEditInformation = ({
  open,
  initialValues,
  onCancel,
  onSubmit,
  loading,
}: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues?.name,
        email: initialValues?.email,
        phone: initialValues?.phone,
      });
    }
  }, [initialValues]);

  return (
    <Modal isOpen={open} hiddenIcon={false} onCancel={onCancel}>
      <>
        <div className="content-modal ">
          <H5>{t('user.editInfo')}</H5>
        </div>
        <Form
          form={form}
          layout="vertical"
          name="edit-information"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, minWidth: 384 }}
          onFinish={onSubmit}
        >
          <Form.Item label={t('user.name')} name="name" required>
            <Input
              allowClear
              type="input"
              placeholder={t('user.namePlaceholder')}
            />
          </Form.Item>
          <Form.Item label={t('user.email')} name="email" required>
            <Input
              allowClear
              type="input"
              placeholder={t('user.emailPlaceholder')}
            />
          </Form.Item>
          <DatePickerCustom label={t('user.dob')} name="dob" placeholder="" />
          <Form.Item label={t('user.phoneNumber')} name="phone" required>
            <PhoneNumber
              value={`${form.getFieldValue('phoneCode')}${form.getFieldValue(
                'phone'
              )}`}
              onChange={() => {}}
              placeholder={t('user.phoneNumberPlaceholder')}
            />
          </Form.Item>

          <Button
            loading={loading}
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
          >
            {t('user.save')}
          </Button>
        </Form>
      </>
    </Modal>
  );
};

export default ModalEditInformation;
