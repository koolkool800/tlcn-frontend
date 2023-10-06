import Button from '@components/common/Button';
import FormSearchAddress from '@components/common/FormSearchAddress';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import TermAndCondition from '@components/signUp/TermAndCondition';
import { ROUTES } from '@constants/routes';
import useAuth from '@hooks/useAuth';
import authService from '@services/authService';
import { App, Form } from 'antd';
import { AuthSignUp } from 'interface';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

interface FormValue extends AuthSignUp {
  term: boolean;
}

const SignUpWithSNS = () => {
  const { t } = useTranslation();
  const theme = useTheme() as DefaultTheme;
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const formValues = Form.useWatch([], form);
  const { message } = App.useApp();
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisableSubmit(true);
      },
      () => {
        setDisableSubmit(false);
      }
    );
  }, [formValues]);

  const [openModal, setOpenModal] = useState(false);
  const auth = useAuth();
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

  /**
   * event when clicking submit form
   * @param values value of form
   * @returns {Promise<void>}
   */
  const onFinish = async (values: FormValue): Promise<void> => {
    try {
      const zoneCodeValue = form.getFieldValue('zoneCode');

      const { term, ...restValues } = values;
      const authSignUpParams: AuthSignUp = {
        ...restValues,
        zoneCode: zoneCodeValue,
        state: auth.state,
      };
      const response = await authService.signUp(authSignUpParams);

      if (response.result) {
        handleOpenModal();
      }
    } catch (error: any) {
      message.info(t(`HTTP_STATUS.${error.errorCode}`));
      navigate(
        {
          pathname: ROUTES.SIGN_UP,
        },
        { replace: true }
      );
    }
  };
  return (
    <S.Container>
      <Form
        className="sign-up-form"
        form={form}
        name="sign-up-sns"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ name: auth.name, email: auth.email }}
        onFinish={onFinish}
        layout="vertical"
      >
        <S.LogoWrapper>
          <h3>{t('auth.sighUpAccount')}</h3>
        </S.LogoWrapper>

        <Form.Item
          label={t('auth.name')}
          name="name"
          required
          rules={[
            {
              required: true,
              message: t('auth.nameRequired'),
            },
          ]}
        >
          <Input
            disabled={Boolean(auth.name)}
            type="input"
            placeholder={t('auth.namePlaceholder')}
          />
        </Form.Item>
        <Form.Item label={t('auth.emailLabel')} name="email" required>
          <Input
            disabled
            type="input"
            placeholder={t('auth.emailPlaceholder')}
          />
        </Form.Item>

        <FormSearchAddress />

        <Form.Item
          name="term"
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error(t('auth.conditionRequired')));
              },
            }),
          ]}
        >
          <TermAndCondition />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            disabled={!disableSubmit}
            bgcolor={theme.colors.primary500}
          >
            {t('auth.buttonSignUp')}
          </Button>
        </Form.Item>

        <Modal
          isOpen={openModal}
          onCancel={() => {
            handleCloseModal();
          }}
        >
          <>
            <div className="content-modal ">
              <h5>{t('auth.signUpSuccess')}</h5>
              <p>{t('auth.signUpSuccessDesc')}</p>
            </div>

            <Button
              size="large"
              color={theme.colors.black}
              bgcolor={theme.colors.primary500}
              onClick={() => {
                handleCloseModal();
                navigate(
                  {
                    pathname: ROUTES.LOGIN,
                  },
                  { replace: true }
                );
              }}
            >
              {t('auth.buttonLogin')}
            </Button>
          </>
        </Modal>
      </Form>
    </S.Container>
  );
};

export default SignUpWithSNS;
