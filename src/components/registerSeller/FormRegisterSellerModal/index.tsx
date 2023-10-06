import Button from '@components/common/Button';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import { H5 } from '@style/DefaultStyled';
import theme from '@style/themes/default';
import { Form, UploadFile } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import UploadRegisterSeller from '../UploadRegisterSeller';
import * as S from './style';

export interface FormRegisterSellerValue {
  email: string;
  certificateFile: UploadFile[];
  bankbookFile: UploadFile[];
}
interface RegisterSellerFormProps {
  open: boolean;
  onCancel: () => void;
  onSubmit: (values: FormRegisterSellerValue) => void;
}

const FormRegisterSellerModal: React.FC<RegisterSellerFormProps> = ({
  open,
  onCancel,
  onSubmit,
}) => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const handleOk = () => {
    form
      .validateFields()
      .then((values: any) => {
        onSubmit(values);
      })
      .catch((info: any) => {
        console.log('Validate Failed:', info);
      });
  };
  return (
    <Modal
      title={<H5>Register as 법인/개인사업자</H5>}
      isOpen={open}
      hiddenIcon={false}
      onCancel={onCancel}
    >
      <S.Wrapper>
        <Form
          form={form}
          layout="vertical"
          name="FormRegisterSellerModal"
          style={{ width: '100%' }}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid e-mail!',
              },
              {
                required: true,
                message: 'Please input your e-mail!',
              },
            ]}
            style={{ marginBottom: 24 }}
          >
            <Input allowClear type="input" placeholder="Enter your email" />
          </Form.Item>
          <UploadRegisterSeller
            name="certificateFile"
            label="Business registration certificate"
            placeholder="Upload certificate"
            rules={[
              {
                required: true,
                message:
                  'Please upload your business registration certificate!',
              },
            ]}
          />

          <UploadRegisterSeller
            name="bankbookFile"
            label=" Copy of bankbook"
            placeholder="Upload bankbook"
            rules={[
              {
                required: true,
                message: 'Please upload your bankbook!',
              },
            ]}
          />

          <div className="btn">
            <Button
              size="large"
              htmlType="submit"
              color={theme?.colors?.black}
              bgcolor={theme?.colors?.primary500}
              onClick={handleOk}
            >
              Register
            </Button>
          </div>
        </Form>
      </S.Wrapper>
    </Modal>
  );
};

export default FormRegisterSellerModal;
