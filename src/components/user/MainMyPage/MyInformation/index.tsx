import BackButton from '@components/common/BackButton';
import BankAccountInfo from '@components/common/BankAccountInfo';
import Button from '@components/common/Button';
import DatePickerCustom from '@components/common/Datepicker';
import Input from '@components/common/Input';
import PhoneNumber from '@components/common/PhoneNumber';
import { useAppDispatch } from '@hooks/useAppDispatch';
import useProfile from '@hooks/useProfile';
import { setProfile } from '@redux/reducer/userReducer';
import authService from '@services/authService';
import userService from '@services/userService';
import { H6 } from '@style/DefaultStyled';
import { createAndSubmitFormVerifyNice } from '@utils/helper';
import { Form } from 'antd';
import dayjs from 'dayjs';
import { DataVerifyNice, ResponseModel } from 'interface';
import { ObjectLiteral } from 'interface/general';
import { FormUserType, UserType } from 'interface/user';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CountryData } from 'react-phone-input-2';
import { useLocation } from 'react-router-dom';
import { DefaultTheme, useTheme } from 'styled-components';
import AvatarMyPage from '../AvatarMyPage';
import * as S from './style';

const MyInformation = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const profile = useProfile();
  const location = useLocation();
  const theme = useTheme() as DefaultTheme;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const phoneNumber = Form.useWatch('phone', form);
  /** * effect get profile when load page */

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        ...profile,
        dob: profile?.dob ? dayjs(profile.dob) : null,
      });
    }
  }, [profile]);

  /** *
   * handle update profile
   * @returns {void}
   */
  const onFinish = async (values: FormUserType) => {
    setLoading(true);
    try {
      const updateResponse: ResponseModel<UserType> =
        await userService.updateProfile(values);

      dispatch(setProfile(updateResponse?.data || null));
    } catch (err) {
      /** * error */
    }

    setLoading(false);
  };
  /**
   * function get data to verify Nice API
   * @returns {Promise<any>}
   *
   */
  const getDataVerifyNice = async (): Promise<any> => {
    try {
      const res = await authService.getVerifyDataNice();
      return res.data;
    } catch (e) {
      return e;
    }
  };
  /**
   * function used to request verify Nice API
   * @returns {Promise<void>}
   */
  const handleChangePhoneNumber = async (): Promise<void> => {
    const data: DataVerifyNice = await getDataVerifyNice();
    if (data) {
      const requestData = {
        m: 'service',
        enc_data: data.dataEncrypted,
        integrity_value: data.integrityValue,
        token_version_id: data.tokenVersionId,
      };
      createAndSubmitFormVerifyNice(requestData);
    }
  };

  return (
    <>
      <BackButton link={location.pathname} label={t('user.myPage')} />
      <S.Container>
        <Form
          form={form}
          name="my-information"
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          layout="vertical"
        >
          <AvatarMyPage />
          <S.EditContainer>
            <H6>{t('user.myInfo')}</H6>
          </S.EditContainer>
          <Form.Item name="name" label={t('user.name')} required>
            <Input
              disabled
              value={profile?.name}
              allowClear
              type="input"
              placeholder={t('user.namePlaceholder')}
            />
          </Form.Item>
          <DatePickerCustom
            disabled
            label={t('user.dob')}
            name="dob"
            placeholder=""
          />
          <Form.Item name="phoneCode" noStyle />
          <Form.Item label={t('user.phoneNumber')} required name="phone">
            <S.PhoneNumberItem>
              <PhoneNumber
                disabled
                value={phoneNumber}
                onChange={(
                  phone: string,
                  countryData: CountryData | ObjectLiteral
                ) => {
                  form.setFieldValue('phoneCode', countryData.dialCode);
                  form.setFieldValue('phone', phone);
                }}
              />
              <Button onClick={handleChangePhoneNumber}>
                {t('user.change')}
              </Button>
            </S.PhoneNumberItem>
          </Form.Item>
          <Form.Item label={t('user.email')} required>
            <Input
              disabled
              value={profile?.email}
              allowClear
              type="input"
              placeholder={t('user.emailPlaceholder')}
            />
          </Form.Item>
          <div className="bankAccount">
            <BankAccountInfo
              accountNumber={profile?.bankDefault?.accountNumber}
              bankName={profile?.bankDefault?.bankName}
            />
          </div>
        </Form>
        {/* container verify Nice */}
        <div id="form-container" />
      </S.Container>
    </>
  );
};

export default MyInformation;
