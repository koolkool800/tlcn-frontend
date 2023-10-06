import Button from '@components/common/Button';
import CountdownTimer from '@components/common/CountdownTimer';
import Input from '@components/common/Input';
import { REGEX } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import authService from '@services/authService';
import { Form, message } from 'antd';
import { ResetPasswordType, ResponseModel } from 'interface';
import { useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

type FormData = ResetPasswordType & {
  confirmPassword: string | undefined;
};
const ForgotPassword = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const emailRef = useRef<string>();
  const formData = Form.useWatch<FormData>([], form) || {};
  const theme = useTheme() as DefaultTheme;
  const { email } = formData;
  const activeSubmit = Object.keys(formData).every((field: string) => {
    const key = field as keyof typeof formData;
    return formData[key];
  });
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState<boolean>(false);
  // const [checkOtp, setCheckOtp] = useState<boolean>(false);

  const handleHiddenCountdown = () => {
    setCountdown(false);
  };

  const handleShowCountdown = () => {
    setCountdown(true);
  };

  const onFinish = async (values: FormData) => {
    setLoading(true);
    try {
      const { confirmPassword, ...restValues } = values;
      await authService.resetPassword(restValues);
      message.success(t('auth.changePasswordSuccess'));
      navigate(ROUTES.LOGIN);
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(`HTTP_STATUS.${error.errorCode as string}`));
    }

    setLoading(false);
  };

  const handleForgotPassword = async () => {
    setLoading(true);
    try {
      const response = await authService.forgotPassword({
        email,
      });
      message.success(t(`HTTP_STATUS.${response.message}`));
      emailRef.current = formData?.email;
      handleShowCountdown();
    } catch (e) {
      const error = e as ResponseModel<string>;
      message.error(t(`HTTP_STATUS.${error.errorCode as string}`));
    }
    setLoading(false);
  };

  const checkedBtnOtp = useMemo(() => {
    // check email invalid
    if (!formData?.email?.match(REGEX.EMAIL)) {
      return true;
    }

    if (formData?.email && !countdown) {
      return false;
    }
    if (countdown && formData?.email && formData?.email === emailRef.current) {
      return true;
    }
    return false;
  }, [formData?.email, countdown, emailRef.current]);

  return (
    <S.Container>
      <Form
        className="forgot-form"
        name="forgot-password"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        form={form}
        onFinish={onFinish}
        layout="vertical"
      >
        <S.LogoWrapper>
          <h3>{t('auth.forgotPasswordTitle')}</h3>
        </S.LogoWrapper>

        <S.Label>
          <span className="label">{t('auth.emailLabel')}</span>
        </S.Label>
        <div className="email-form-item">
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: t('auth.emailRequired'),
              },
              {
                required: true,
                message: t('auth.emailPlaceholder'),
              },
            ]}
            style={{ marginBottom: 0, flex: 1 }}
          >
            <Input
              allowClear
              type="input"
              placeholder={t('auth.emailPlaceholder')}
              onChange={(e) => {
                if (!e.target.value) {
                  setCountdown(false);
                }
              }}
            />
          </Form.Item>
          <span>
            <Button
              color={theme.colors.black}
              bgcolor={theme.colors.colorHigh}
              disabled={checkedBtnOtp}
              onClick={handleForgotPassword}
              loading={loading}
            >
              {formData?.email && formData?.email === emailRef.current
                ? t('auth.resend')
                : t('auth.sendOTP')}
            </Button>
          </span>
        </div>

        <Form.Item
          name="otp"
          rules={[
            {
              required: true,
              message: t('auth.otpPlaceholder'),
            },
          ]}
        >
          <Input
            allowClear
            type="input"
            placeholder={t('auth.otpCodePlaceholder')}
            suffix={
              <>
                <div className="otp-time">
                  {/* {formData?.otp && (
                    <>
                      {checkOtp ? (
                        <ArrowDown2 size="20" className="success" />
                      ) : (
                        <ArrowUp2 size="20" className="error" />
                      )}
                    </>
                  )} */}

                  {countdown && (
                    <CountdownTimer
                      timer={300}
                      onDone={handleHiddenCountdown}
                    />
                  )}
                </div>
              </>
            }
          />
        </Form.Item>

        <S.Password>
          <span className="label">{t('auth.passwordLabel')}</span>
          <span className="description">{t('auth.passwordDesc')}</span>
        </S.Password>
        <Form.Item
          name="newPassword"
          required
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
          label={t('auth.confirmPasswordLabel')}
          name="confirmPassword"
          required
          rules={[
            ({ getFieldValue }) => ({
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
            }),
          ]}
        >
          <Input
            allowClear
            type="password"
            placeholder={t('auth.confirmPasswordPlaceholder')}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginBottom: 20 }}>
          <Button
            htmlType="submit"
            size="large"
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            loading={loading}
            disabled={!activeSubmit}
            hoverColor={theme.colors.emphasisDarkColor}
          >
            {t('auth.changePassword')}
          </Button>
        </Form.Item>
      </Form>
    </S.Container>
  );
};

export default ForgotPassword;
