import Button from '@components/common/Button';
import CountdownTimer from '@components/common/CountdownTimer';
import DatePickerCustom from '@components/common/Datepicker';
import FormSearchAddress from '@components/common/FormSearchAddress';
import Input from '@components/common/Input';
import Modal from '@components/common/ModalConfirm';
import PhoneNumber from '@components/common/PhoneNumber';
import TermAndCondition from '@components/signUp/TermAndCondition';
import { REGEX } from '@constants/codeConstants';
import { ROUTES } from '@constants/routes';
import authService from '@services/authService';
import { H5 } from '@style/DefaultStyled';
import { dateTimeFormat } from '@utils/format';
import { Form, message } from 'antd';
import dayjs from 'dayjs';
import { ArrowDown2, Slash } from 'iconsax-react';
import { AuthSignUp } from 'interface';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import * as S from './style';

interface FormValue extends AuthSignUp {
  term: boolean;
  confirmPassword: string;
}

const SignUpWithEmail = () => {
  const theme = useTheme() as DefaultTheme;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const emailRef = useRef<string>();
  const [disableSubmit, setDisableSubmit] = useState(true);
  // const emailValue = Form.useWatch('email', form);
  // const otpValue = Form.useWatch('otp', form);
  const values = Form.useWatch([], form);

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [countdown, setCountdown] = useState<boolean>(false);
  const [checkOtp, setCheckOtp] = useState<boolean>(false);
  // const [activeBtnOtp, setActiveBtnOtp] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  /**
   * the event used to close modal
   * @returns {void}
   */
  const handleCloseModal = (): void => {
    setOpenModal(false);
    form.resetFields();
  };
  /**
   * the event used to open modal
   * @returns {void}
   */
  const handleOpenModal = (): void => {
    setOpenModal(true);
  };

  useEffect(() => {
    form.validateFields({ validateOnly: true }).then(
      () => {
        setDisableSubmit(true);
      },
      () => {
        setDisableSubmit(false);
      }
    );
  }, [values]);
  /**
   * event when clicking submit form
   * @param values value of form
   * @returns {Promise<void>}
   */
  const onFinish = async (formValues: FormValue): Promise<void> => {
    const zoneCodeValue = form.getFieldValue('zoneCode');
    const { confirmPassword, term, ...restValues } = formValues;

    const authSignUpParams: AuthSignUp = {
      ...restValues,
      dob: dateTimeFormat(restValues.dob),
      zoneCode: zoneCodeValue,
    };

    try {
      await authService.signUp(authSignUpParams);
      handleOpenModal();
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
  };

  const handleHiddenCountdown = () => {
    setCountdown(false);
  };
  const handleShowCountdown = () => {
    setCountdown(true);
  };

  const handleSentOtp = async () => {
    setLoading(true);
    try {
      const requestParams = { email: values?.email };
      await authService.sentOtp(requestParams);
      handleShowCountdown();
      // setActiveBtnOtp(true);
      emailRef.current = values?.email;
    } catch (error: any) {
      message.error(t(`HTTP_STATUS.${error.errorCode}`));
    }
    setLoading(false);
  };

  const handleVerifyOTP = async () => {
    try {
      const requestParams = { email: values?.email, otp: values?.otp };
      await authService.verifyOtp(requestParams);
      setCheckOtp(true);
      handleHiddenCountdown();
    } catch (error: any) {
      setCheckOtp(false);
    }
  };

  useEffect(() => {
    if (values?.otp) {
      handleVerifyOTP();
    } else {
      setCheckOtp(false);
    }
  }, [values?.otp]);

  const checkedBtnOtp = useMemo(() => {
    // check email invalid
    if (!values?.email?.match(REGEX.EMAIL)) {
      return true;
    }

    if (values?.email && !countdown) {
      return false;
    }
    if (countdown && values?.email && values?.email === emailRef.current) {
      return true;
    }
    return false;
  }, [values?.email, countdown, emailRef.current]);

  const disabledDate = (current: any) => {
    const minAgeDate = dayjs().subtract(99, 'years');
    const maxAgeDate = dayjs().subtract(14, 'years');

    return current && (current > maxAgeDate || current < minAgeDate);
  };

  // Quy tắc kiểm tra
  const validateBirthDate = (
    _: any,
    value: string | number | Date | dayjs.Dayjs | null | undefined,
    callback: (arg0?: string | undefined) => void
  ) => {
    if (!value) {
      callback(t('auth.dobRequired'));
      return;
    }

    const selectedDate = dayjs(value);
    const currentDate = dayjs();

    const age = currentDate.diff(selectedDate, 'year');

    if (age >= 14 && age <= 99) {
      callback();
    } else if (age < 14) {
      callback(t('auth.dobRequired14'));
    } else {
      callback(t('auth.dobRequired99'));
    }
  };

  return (
    <S.Container>
      <Modal
        isOpen={openModal}
        onCancel={() => {
          handleCloseModal();
          navigate({
            pathname: ROUTES.LOGIN,
          });
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
              navigate({
                pathname: ROUTES.LOGIN,
              });
            }}
          >
            {t('auth.buttonLogin')}
          </Button>
        </>
      </Modal>

      <Form
        className="sign-up-form"
        form={form}
        name="register"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        onFinish={onFinish}
        layout="vertical"
        autoComplete="off"
      >
        <S.LogoWrapper>
          <H5>{t('auth.sighUpAccount')}</H5>
        </S.LogoWrapper>

        <S.Label>
          <span className="label">{t('auth.name')}</span>
        </S.Label>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: t('auth.namePlaceholder'),
            },
          ]}
        >
          <Input
            autoFocus
            type="input"
            placeholder={t('auth.namePlaceholder')}
          />
        </Form.Item>

        <S.Label>
          <span className="label">{t('auth.dob')}</span>
        </S.Label>
        <DatePickerCustom
          placeholder="YYYY-MM-DD"
          name="dob"
          // disabledDate={disabledDate}
          rules={[
            // {
            //   required: true,
            //   message: t('auth.dobRequired'),
            // },
            {
              validator: validateBirthDate,
            },
          ]}
        />

        <S.Label>
          <span className="label">{t('user.phoneNumber')}</span>
        </S.Label>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: t('auth.phoneNumberRequired'),
            },
          ]}
        >
          <PhoneNumber
            onChange={() => {}}
            placeholder={t('user.phoneNumberPlaceholder')}
          />
        </Form.Item>

        <S.Label>
          <span className="label">{t('auth.emailLabel')}</span>
        </S.Label>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'flex-start',
            gap: 8,
            width: '100%',
            marginBottom: 14,
          }}
        >
          <Form.Item
            name="email"
            rules={[
              {
                type: 'email',
                message: t('auth.emailInvalid'),
              },
              {
                required: true,
                message: t('auth.emailRequired'),
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
                  // setActiveBtnOtp(false);
                }
              }}
            />
          </Form.Item>
          <span>
            <Button
              // maxwidth="84"
              color={theme.colors.black}
              bgcolor={theme.colors.colorHigh}
              disabled={checkedBtnOtp}
              onClick={handleSentOtp}
              loading={loading}
            >
              {/* {activeBtnOtp ? t('auth.resend') : t('auth.sendOTP')} */}
              {values?.email && values?.email === emailRef.current
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
                  {values?.otp && (
                    <>
                      {checkOtp ? (
                        <ArrowDown2 size="20" className="success" />
                      ) : (
                        <Slash size="20" className="error" />
                      )}
                    </>
                  )}

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

        <S.Label>
          <span className="label">{t('auth.passwordLabel')}</span>
          <span className="description">
            {/* Password is between 8-20 characters, including both letters,
            <br />
            number and symbols */}
            {t('auth.passwordDesc')}
          </span>
        </S.Label>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: t('auth.passwordRequired'),
            },
            {
              pattern: new RegExp(REGEX.PASSWORD),
              message: t('auth.passwordInvalid'),
            },
          ]}
        >
          <Input
            autoComplete="new-password"
            allowClear
            type="password"
            placeholder={t('auth.passwordRule')}
          />
        </Form.Item>

        <S.Label>
          <span className="label">{t('auth.confirmPasswordLabel')}</span>
        </S.Label>
        <Form.Item
          name="confirmPassword"
          required
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (
                  !(value === '' || value === undefined) &&
                  getFieldValue('password') === value
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

        <Form.Item wrapperCol={{ span: 24 }} style={{ marginTop: 40 }}>
          <Button
            htmlType="submit"
            size="large"
            disabled={!disableSubmit}
            color={theme.colors.black}
            bgcolor={theme.colors.primary500}
            hoverColor={theme.colors.emphasisDarkColor}
            hoverbgcolor={theme.colors.primary550}
          >
            {t('auth.signUp')}
          </Button>
        </Form.Item>
      </Form>
    </S.Container>
  );
};

export default SignUpWithEmail;
