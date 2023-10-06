import Form from '@components/user/CreateInquiry';
import { ROUTE_USER } from '@constants/routes';
import { H5 } from '@style/DefaultStyled';
import { useTranslation } from 'react-i18next';
import BackButton from '@components/common/BackButton';
import * as S from './style';

const InquiryCreate = () => {
  const { t } = useTranslation();
  return (
    <S.Container>
      <BackButton link={ROUTE_USER.USER_INQUIRY} label={t('user.inquiry')} />
      <H5>{t('user.createInquiry')}</H5>
      <S.Description>{t('user.inquiryDesc')}</S.Description>
      <Form />
    </S.Container>
  );
};

export default InquiryCreate;
