import BackButton from '@components/common/BackButton';
import { REGEX } from '@constants/codeConstants';
import authService from '@services/authService';
import { Form, message } from 'antd';
import {
  BaseResponseErrorType,
  BaseResponseType,
  ChangePasswordType,
} from 'interface';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useTheme } from 'styled-components';
import { H5, H6 } from '../../../../style/DefaultStyled';
import Button from '../../../common/Button';
import Input from '../../../common/Input';
import Modal from '../../../common/ModalConfirm';
import * as S from './style';

const ChangePassword = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const theme: any = useTheme();
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    setOpenModal(false);
  };
  /**
   * the event used to open modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };
  const onFinish = async (
    values: ChangePasswordType & { confirmPassword: string }
  ) => {
    setLoading(true);
    try {
      const res: BaseResponseType<boolean> = await authService.changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      if (res.data.result) {
        handleOpenModal();
        form.setFieldsValue({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        });
      }
    } catch (e) {
      message.error(t('user.changePasswordFail'));
    }
    setLoading(false);
  };

  return (
    <>
      <BackButton link={location.pathname} label="My page" />
      <S.Container>
        <Form
          form={form}
          name="my-information"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600, minWidth: 384 }}
          onFinish={onFinish}
          layout="vertical"
        >
          <H5 style={{ marginBottom: 24 }}>{t('auth.changePassword')}</H5>
          <Form.Item
            label={t('auth.labelCurrentPassword')}
            name="currentPassword"
            rules={[
              {
                required: true,
                pattern: new RegExp(REGEX.PASSWORD),
                message: t('auth.passwordInvalid'),
              },
            ]}
          >
            <Input
              autoFocus
              allowClear
              type="password"
              placeholder={t('auth.placeholderCurrentPassword')}
            />
          </Form.Item>
          <Form.Item
            label={t('auth.passwordLabel')}
            name="newPassword"
            rules={[
              {
                required: true,
                pattern: new RegExp(REGEX.PASSWORD),
                message: t('auth.passwordInvalid'),
              },
            ]}
          >
            <Input
              allowClear
              type="password"
              placeholder={t('auth.passwordPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('auth.confirmNewPasswordLabel')}
            name="confirmPassword"
            rules={[
              ({ getFieldValue }) => {
                return {
                  validator(_, value) {
                    if (
                      !(value === '' || value === undefined) &&
                      getFieldValue('newPassword') === value
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t('auth.confirmPasswordInvalid'))
                    );
                  },
                };
              },
            ]}
          >
            <Input
              allowClear
              type="password"
              placeholder={t('auth.confirmNewPasswordPlaceholder')}
            />
          </Form.Item>
          <Form.Item style={{ marginTop: 40 }}>
            <Button
              htmlType="submit"
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
              loading={loading}
            >
              {t('auth.buttonSave')}
            </Button>
          </Form.Item>
        </Form>

        <Modal isOpen={openModal} onCancel={handleCloseModal}>
          <>
            <div className="content-modal ">
              <H5>{t('auth.changePasswordSuccess')}</H5>
              <H6>{t('auth.changePasswordSuccessful')}</H6>
            </div>

            <Button
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
              onClick={handleCloseModal}
            >
              {t('auth.buttonDone')}
            </Button>
          </>
        </Modal>
      </S.Container>
    </>
  );
};

export default ChangePassword;
