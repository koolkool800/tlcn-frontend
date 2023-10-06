import { Form } from 'antd';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import { useTranslation } from 'react-i18next';

interface Props {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
}

const ModalAddNewAccount = ({ open, onCancel, onSubmit }: Props) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  return (
    <Modal isOpen={open} hiddenIcon={false} onCancel={onCancel}>
      <>
        <div className="content-modal ">
          <H5>{t('user.addNewAccount')}</H5>
        </div>
        <Form
          form={form}
          layout="vertical"
          name="add-new-account"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, minWidth: 384 }}
          onFinish={onSubmit}
        >
          <Form.Item label={t('user.bankName')} name="bankName" required>
            <Input
              allowClear
              type="input"
              placeholder={t('user.bankNamePlaceholder')}
            />
          </Form.Item>
          <Form.Item label={t('user.bankNumber')} name="bankNumber" required>
            <Input
              allowClear
              type="input"
              placeholder={t('user.bankNumberPlaceholder')}
            />
          </Form.Item>
          <Form.Item label={t('user.name')} name="name" required>
            <Input
              allowClear
              type="input"
              placeholder={t('user.namePlaceholder')}
            />
          </Form.Item>
          <Button
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

export default ModalAddNewAccount;
